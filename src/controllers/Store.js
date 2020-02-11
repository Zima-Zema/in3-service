'use strict';

const _ = require('lodash');
const Errors = require('../utilities/Errors');

class StoreController {

    constructor(deps) {
        if (
            !_.isPlainObject(deps)
            || _.isNil(deps.dbModel)
        ) {
            throw new Error('StoreController: invalid dependencies');
        }

        this.dbModel = deps.dbModel;
    }

    startSearch(query = {}) {
        const txt = _.toLower(query.search).trim();
        const limit = parseInt(query.limit) || 10;
        const skip = parseInt(query.skip) || 0;
        const sort = query.sort || { _id: -1 };
        query = _.omit(query, ['skip', 'limit', 'sort', 'desc']);

        let searchQuery = {
            "$and": [
                { "$or": [{ "company": { "$regex": txt, "$options": "i" } }, { "product": { "$regex": txt, "$options": "i" } }] },
            ]
        };

        if (_.has(query, 'cpu') && !_.isEmpty(query.cpu)) {
            if (!_.isArray(query.cpu))
                throw new Errors.BadRequestError('cpu must be array');
            const mappedCpu = query.cpu.map(element => new RegExp(element, 'i'));
            searchQuery.$and.push({ cpu: { $in: mappedCpu } })
        }

        if (_.has(query, 'ram') && !_.isEmpty(query.ram)) {
            if (!_.isArray(query.ram))
                throw new Errors.BadRequestError('ram must be array');
            const mappedRam = query.ram.map(element => new RegExp(element, 'i'));
            searchQuery.$and.push({ ram: { $in: mappedRam } })
        }

        if (_.has(query, 'opSys') && !_.isEmpty(query.opSys)) {
            if (!_.isArray(query.opSys))
                throw new Errors.BadRequestError('opSys must be array');
            const mappedopSys = query.opSys.map(element => new RegExp(element, 'i'));
            searchQuery.$and.push({ opSys: { $in: mappedopSys } })
        }

        if (_.has(query, 'inches') && !_.isEmpty(query.inches)) {
            if (!_.isArray(query.inches))
                throw new Errors.BadRequestError('inches must be array');
            const mappedInches = query.inches.map(element => new RegExp(element, 'i'));
            searchQuery.$and.push({ inches: { $in: mappedInches } })
        }

        Object.keys(sort).forEach(key => sort[key] = +sort[key] ? +sort[key] : 1);
        if (_.has(sort, 'name')) {
            sort.toLower = sort.name;
            delete sort.name;
        }

        return this.dbModel.aggregate([{
            $facet: {
                data: [
                    {
                        $match: searchQuery,
                    },
                    { $addFields: { toLower: { $toLower: '$product' } } },
                    { $sort: sort },
                    { $skip: skip },
                    { $limit: limit },
                ],
                count: [{
                    $match: searchQuery,
                }, { $count: 'count' }],
            },
        }])
            .then(response => {
                return {
                    data: response[0].data,
                    count: _.isEmpty(response[0].count) ? 0 : response[0].count[0].count
                };
            });
    }

    findFilters() {
        return this.dbModel.find({}, { cpu: 1, ram: 1, opSys: 1, inches: 1 })
            .then(data => {
                const ramDropDown = _.chain(data)
                    .map(element => element.ram)
                    .uniq()
                    .value();

                const inchesDropDown = _.chain(data)
                    .map(obj => obj.inches)
                    .uniq()
                    .value();

                const opSysDropDown = _.chain(data)
                    .map(obj => obj.opSys)
                    .uniq()
                    .value();


                const cpuDropDown = _.chain(data)
                    .map(obj => {
                        let str = obj.cpu;
                        const arr = str.split(' ');
                        if (arr[0].toLowerCase() === 'intel') {
                            str = arr.slice(0, 3).join(' ');
                        }
                        else if (arr[0].toLowerCase() === 'amd') {
                            str = arr.slice(0, arr.length - 2).join(' ');
                        } else {
                            str = arr.slice(0, arr.length - 1).join(' ');
                        }
                        return str;
                    })
                    .uniq()
                    .value();
                return {
                    data: {
                        ramDropDown,
                        inchesDropDown,
                        opSysDropDown,
                        cpuDropDown
                    }
                }
            })
    }

    findHints(search) {
        if (!search)
            return Promise.resolve({ data: [] });

        const query = { "$or": [{ "company": { "$regex": search, "$options": "i" } }, { "product": { "$regex": search, "$options": "i" } }] }
        
        return this.dbModel.find(query, { company: 1, product: 1 })
            .then(data => {

                const companyRes = _.chain(data)
                    .map(element => element.company)
                    .uniq()
                    .value();
                
                const productRes = _.chain(data)
                    .map(element => element.product)
                    .uniq()
                    .value();

                const res = _.concat(productRes, companyRes);
                const reg = new RegExp(search, 'i');
                const final = _.sortBy(res, one => one.replace(reg, '').length);
                return final;
            })

    }
}

module.exports = StoreController;
