/* jshint -W098 */

module.exports = (function () {
    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('lodash'),

        ThoughtListView = require('./views/thought-list');
//        thoughtItemTemplate = require('./templates/thoughtItem.hbs');

    Backbone.$ = $;

    var ThoughtModel = Backbone.Model.extend({
            defaults: {
                'title': '',
                'body': '',
                'url': '/thought'
            },
            idAttribute: '_id',

            initialize: function (attributes) {
                this.set('url', this.defaults.url + '/' + attributes._id);
            }
        }),
        ThoughtCollection = Backbone.Collection.extend({
            url: '/thought',
            model: ThoughtModel
        }),
//        ThoughtListView = Backbone.View.extend({
//            initialize: function () {
//                this.childViews = [];
//                this.collection.on('add', _.bind(function (model) {
//                    var $childEl = $('<li />'),
//                        itemView = new ThoughtItemView({
//                            el: $childEl.get(0),
//                            model: model
//                        });
//
//                    this.childViews.push(itemView);
//
//                    this.$el.append(itemView.$el);
//                }, this));
//            },
//
//            render: function () {
//                _.each(this.childViews, _.bind(function (item) {
//                    this.$el.append(item.$el);
//                }, this));
//            }
//        }),
//        ThoughtItemView = Backbone.View.extend({
//            events: {
//                'click .delete': 'handleDelete'
//            },
//
//            initialize: function () {
//                this.render();
//
//                this.listenTo(this.model, 'change:url', this.render);
//            },
//
//            template: function (data) {
//                return thoughtItemTemplate(data);
//            },
//
//            render: function () {
//                var title = this.model.get('title'),
//                    body = this.model.get('body');
//
//                this.$el.html(this.template(this.model.attributes));
//            },
//
//            handleDelete: function (event) {
//                event.preventDefault();
//                this.model.destroy();
//            }
//        }),
        collection = new ThoughtCollection(),
        view = new ThoughtListView({
            el: $('main ul').get(0),
            collection: collection
        });

    collection.fetch().done(function () {
        view.render();
    });

    $('[data-create-thought] button[type="submit"]').on('click', function (event) {
        var formData = $(this).parents('form').serializeArray(),
            model = new ThoughtModel();

        event.preventDefault();

        _.each(formData, function (item) {
            model.set(item.name, item.value);
        });

        collection.add(model);
        model.save().then(_.bind(function (results) {
            if (results.length > 0) {
                model.set('url', results[0].href);
            }
        }, model));
    });

}());


