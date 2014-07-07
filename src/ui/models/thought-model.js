module.exports = (function () {
    'use strict';

    var Backbone = require('backbone'),
        _ = require('lodash');

    return Backbone.Model.extend({
        defaults: {
            'title': '',
            'body': '',
            'url': '/thought'
        },
        idAttribute: '_id',

        initialize: function (attributes) {
            if (_.has(attributes, '_id')) {
                this.set('url', this.defaults.url + '/' + attributes._id);
            }
        }
    });
}());