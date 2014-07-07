module.exports = (function () {
    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),

        ThoughtModel = require('../models/thought-model');

    return Backbone.Collection.extend({
        url: '/thought',
        model: ThoughtModel,

        initialize: function () {
            this.loaded = $.Deferred().promise();
        },

        fetch: function () {
            this.loaded = Backbone.Collection.prototype.fetch.apply(this, arguments);

            return this.loaded;
        }
    });
}());