module.exports = (function () {
    'use strict';

    return Backbone.Collection.extend({
        url: '/thought'
    });
}());