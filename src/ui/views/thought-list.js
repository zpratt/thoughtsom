module.exports = (function () {
    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('lodash'),

        ThoughtItemView = require('./thought-item');

    Backbone.$ = $;

    return Backbone.View.extend({
        initialize: function () {
            this.childViews = [];
            this.collection.on('add', _.bind(function (model) {
                var $childEl = $('<li />'),
                    itemView = new ThoughtItemView({
                        el: $childEl.get(0),
                        model: model
                    });

                this.childViews.push(itemView);

                this.$el.append(itemView.$el);
            }, this));
        },

        render: function () {
            _.each(this.childViews, _.bind(function (item) {
                this.$el.append(item.$el);
            }, this));
        }
    });
}());