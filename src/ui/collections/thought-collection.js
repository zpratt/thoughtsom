module.exports = (function () {
    'use strict';

    var Backbone = require('backbone'),

        ThoughtModel = require('../models/thought-model');

    return Backbone.Collection.extend({
        url: '/thought',
        model: ThoughtModel
    });
}());