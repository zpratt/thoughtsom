module.exports = (function () {
    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({
        defaults: {
            'title': '',
            'body': '',
            'url': '/thought'
        },
        idAttribute: '_id',

        initialize: function (attributes) {
            this.set('url', this.defaults.url + '/' + attributes._id);
        }
    });
}());