'use strict';

const DBFactory = require('./dbConnection').Factory;
const Controllers = require('./controllers');
const Schemas = require('./schemas');
const Routes = require('./routes');
const csv = require("csvtojson");
const _ = require('lodash');
class Bootstrapper {

    static bootstrap(app, config) {
        //#region init dbModel
        const storeDbModel = this.createDbModel(config);
        //#endregion

        //#region init controllers
        const storeController = this.createStoreController({
            storeDbModel,
        });
        //#endregion

        //#region init routes
        Routes.store(app, storeController, config);
        //#endregion
        this.syncDataBaseByDataSet(storeDbModel);
    }

    static createStoreController(dependances) {
        return new Controllers.Store({
            dbModel: dependances.storeDbModel,
        });
    }

    static createDbModel(config) {
        const respositoryDeps = {
            schema: Schemas.StoreSchema,
            db: config.db,
            modelName: 'store',
        };

        return DBFactory.create(respositoryDeps);
    }

    static syncDataBaseByDataSet(storeDbModel) {
        // 
        return storeDbModel.find({})
            .then(data => {
                if (_.isEmpty(data)) {
                    console.log('DataBase is Empty init Importing');
                    return csv().fromFile(__dirname + '/utilities/resources/dataset.csv');
                }
                console.log('DataBase is not Empty ignore Importing');
                return;
            })
            .then(importedData => {
                if (_.isEmpty(importedData))
                    return;
                const toBeInserted = importedData.map(element => {
                    return {
                        company: element.Company,
                        product: element.Product,
                        type: element.Type,
                        inches: element.Inches,
                        resolution: element.Resolution,
                        cpu: element.CPU,
                        ram: element.RAM,
                        memory: element.Memory,
                        graphics: element.Graphics,
                        opSys: element.OpSys,
                        weight: element.Weight,
                        price: element.Price
                    };
                });
                return storeDbModel.insertMany(toBeInserted);
            })
            .then(() => csv().destroy())
            .catch(console.log);
    }

}

module.exports = Bootstrapper;
