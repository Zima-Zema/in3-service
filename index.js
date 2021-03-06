'use strict';

const Express = require('./server');
const Bootstrapper = require('./src/Bootstrapper');
const config = require('./config');
const app = Express.createExpressApp();
Bootstrapper.bootstrap(app, config);
Express.setHome(app);
Express.startApp(app, config);
