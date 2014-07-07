module.exports = (function () {
    /*jshint validthis:true */

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('lodash');

    Backbone.$ = $;

    function createChildView(ItemView, model) {
        var $li = $('<li/>');

        return new ItemView({el: $li.get(0), model: model});
    }

    function appendItem(model, ItemView) {
        var childView = createChildView(ItemView, model);
        this.childViews.push(childView);

        this.$el.append(childView.$el);
    }

    return Backbone.View.extend({
        initialize: function (options) {
            var itemView = options.ItemView;
            this.childViews = [];

            this.collection.loaded.then(_.bind(function () {
                this.render(itemView);
            }, this));

            this.collection.on('add', _.bind(function (model) {
                appendItem.call(this, model, itemView);
            }, this));
        },

        render: function (ItemView) {
            this.collection.each(_.bind(function (model) {
                appendItem.call(this, model, ItemView);
            }, this));
        }
    });
}());