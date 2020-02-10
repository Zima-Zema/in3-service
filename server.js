'use strict';

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
class ExpressUtility {

    static createExpressApp() {
        const app = express();
        app.disable('x-powered-by');
        ExpressUtility.setBodyParser(app);
        ExpressUtility.setCORS(app);
        ExpressUtility.setHome(app);
        return app;
    }

    static setBodyParser(app) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
    }

    static setCORS(app) {
        app.use(cors());
    }

    static setHome(app) {
        app.use(express.static(path.join(__dirname, 'dist/in3-computer-store')))
        app.get("*", function (req, res, next) {
            console.log("enter here")
            res.sendFile(path.join(__dirname, 'dist/in3-computer-store/index.html'));
        });
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
