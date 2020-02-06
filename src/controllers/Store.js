'use strict';

const _ = require('lodash');
const Errors = require('../utilities/Errors');

class StoreController {

    constructor(deps) {
        if(
            !_.isPlainObject(deps)
            || _.isNil(deps.dbModel)
        ) {
            throw new Error('StoreController: invalid dependencies');
        }

        this.dbModel = deps.dbModel;
    }


}

module.exports = StoreController;
