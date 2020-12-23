'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Errors = require('../utilities/Errors');
module.exports = (app, controller, config) => {
    if (!_.isString(config.endpoint)) {
        throw new Error('StoreRoutes: missing endpoint');
    }

    const endpoint = `/api/${config.endpoint}`;

    const wrapResponse = (promise, res) =>
        promise.then(data => res.json(data))
            .catch(err => {
                console.log('wrapResponse: ', err);
                if (err.message.indexOf('duplicate key error') > -1) {
                    err = new Errors.DuplicateError;
                }
                if (err.message.indexOf('not found') > -1) {
                    err = new Errors.NotFoundError;
                }

                if (err.name === 'ValidationError') {
                    // eslint-disable-next-line max-len
                    err = new Errors.BadRequestError(err.errors[Object.keys(err.errors)[0]].message);
                }

                if (err.name === 'CastError') {
                    // eslint-disable-next-line max-len
                    err = new Errors.BadRequestError('Invalid Resource Id');
                }

                if (!(err instanceof Errors.BaseError)) {
                    err = new Errors.InternalServerError(err.message);
                }

                return res.status(err.statusCode).json({
                    message: err.errorMessage,
                    code: err.errorCode,
                });
            });
    app.get(`${endpoint}/store/search`, (req, res) => wrapResponse(controller.startSearch(req.query), res));
    app.get(`${endpoint}/store/filters`, (req, res) => wrapResponse(controller.findFilters(), res));
    app.get(`${endpoint}/store/hints`, (req, res) => wrapResponse(controller.findHints(req.query.search), res));
    app.get(`${endpoint}/store/helth/check`, (req, res) => res.json({ readyState: mongoose.connection.readyState }));

};
