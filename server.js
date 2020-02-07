'use strict';

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

class ExpressUtility {

    static setBodyParser(app) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    }

    static setCORS(app) {
        app.use(cors());
    }
    
    static createExpressApp() {
        const app = express();
        app.disable('x-powered-by');
        ExpressUtility.setBodyParser(app);
        ExpressUtility.setCORS(app);
        return app;
    }

    static startApp(app, config) {
        return new Promise(resolve => {
            app.listen(config.port, () => {
                console.log('Api started:', `${_.capitalize(config.name)} on port ${config.port}`);
                resolve();
            });
        });
    }

}

module.exports = ExpressUtility;
