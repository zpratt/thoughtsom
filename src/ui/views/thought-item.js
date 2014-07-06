module.exports = (function () {
    'use strict';

    var Backbone = require('backbone'),

        thoughtItemTemplate = require('../templates/thought-item.hbs');

    return Backbone.View.extend({
        events: {
            'click .delete': 'handleDelete'
        },

        initialize: function () {
            this.render();
//
            this.listenTo(this.model, 'change:url', this.render);
        },

        template: function (data) {
            return thoughtItemTemplate(data);
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
        },

        handleDelete: function (event) {
            event.preventDefault();
            this.model.destroy();
        }
    });
}());