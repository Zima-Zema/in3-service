'use strict';

module.exports = {
    port: process.env.IN3_SERVICE_PORT || 5300,
    name: 'in3service',
    db: process.env.IN3_SERVICE_MONGO_URL || 'mongodb://mongo:27017/in3-service',
    endpoint: 'in3service',
};
