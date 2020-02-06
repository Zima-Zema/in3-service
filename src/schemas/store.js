'use strict';

const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    company: { type: String },
    product: { type: String },
    type: { type: String },
    inches: { type: String },
    resolution: { type: String },
    cpu: { type: String },
    ram: { type: String },
    memory: { type: String }, 
    graphics: { type: String },
    opSys: { type: String },
    weight: { type: String },
    price: { type: String }
});

module.exports = StoreSchema;
