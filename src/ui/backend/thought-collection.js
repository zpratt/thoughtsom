module.exports = (function () {
    'use strict';

    var ThoughtModel = require('./thought-model');

    return Backbone.Collection.extend({
        model: ThoughtModel,
        url: '/thought'
    });
}());