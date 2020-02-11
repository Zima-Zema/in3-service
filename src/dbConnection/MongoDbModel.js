'use strict';

const mongoose = require('mongoose');
const _ = require('lodash');
const INITIAL_RECONNECT_INTERVAL = 10;
const baseSchema = {
    is_active: {
        type: Boolean,
        default: true,
    },
    created_by: String,
    updated_by: String,
};

class MongoDBModel {

    constructor(config) {
        this._checkDependencies(config);
        this.reconnectInterval = INITIAL_RECONNECT_INTERVAL;
        this.connect(config);
        this.schema = _.cloneDeep(config.schema);
        this.schema.add(baseSchema);
        this.schema.set('timestamps', { createdAt: 'created_at', updatedAt: 'updated_at' });
        this._applyReadHooks(config);
        MongoDBModel.modelInstance = mongoose.models[config.modelName] 
            || mongoose.model(config.modelName, this.schema);
        return MongoDBModel.modelInstance;
    }


    connect(config) {
        const db = config.db;
        let url;
        if(!_.isPlainObject(db)) {
            url = db;
        } else {
            url = `mongodb://${db.server}:${db.port}/${db.name}`;
        }
        mongoose.connection.on('close', () => {  
            console.log('MongoDB Close:', `Connection close, retrying`);
        }); 
        mongoose.connection.on('connected', () => {  
            console.log('MongoDB Success:', 'Connected Successfully');
        }); 
        mongoose.connection.on('disconnected', () => {  
            console.log('MongoDB Disconnected:', `Disconnected! at ${new Date()}`);
        }); 
        mongoose.connection.on('error', () => {
            console.log('MongoDB Failure:', `Failed to connect, retrying`);
            return this._getConnection(url);
        });
        return this._getConnection(url);
    }
    _getConnection(url) {
        if(mongoose.connection.readyState === 0) {
            return mongoose.connect(url, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                autoReconnect: true,
                reconnectTries: Number.MAX_SAFE_INTEGER,
                reconnectInterval: 5000,
            });
        }
    }


    _checkDependencies(deps) {
        let error;
        if(!_.isPlainObject(deps)) {
            error = 'dependencies must be an object';
        }

        if(_.isNil(deps.schema)) {
            error = 'schema is missing';
        }

        if(!_.isString(deps.modelName)) {
            error = `modelName must be a string, received ->> ${deps.modelName} <<`;
        }

        if(_.isNil(deps.db)) {
            error = 'db configuration is missing';
        }

        if(!_.isNil(error)) {
            throw new Error(`MongoDb Repository: invalid dependencies: ${error}`);
        }
    }
    _applyReadHooks() {
        this.schema.pre('find', function() {
            this.where({ is_active: true });
        });

        this.schema.pre('findOneAndUpdate', function() {
            this.options = { new: true };
        });
        this.schema.pre('findOne', function() {
            this.where({ is_active: true });
        });
    }
}

module.exports = MongoDBModel;
