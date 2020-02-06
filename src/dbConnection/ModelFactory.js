'use strict';

const MongoDBModel = require('./MongoDbModel');
class ModelFactory {

    /**
     * @param {Object} config config object contains schema, modelName and db url
     * @param {Object} config.schema Model schema object to be created
     * @param {String} config.modelName Model name as in database to be created
     * @param {String} config.db database url to be connected
     */
    static create(config) {
        return new MongoDBModel(config);
    }

}
module.exports = ModelFactory;
