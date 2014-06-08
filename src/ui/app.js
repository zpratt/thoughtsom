/* jshint -W098 */

module.exports = (function () {
    'use strict';

    var $ = require('jquery'),
        _ = require('lodash'),

        ThoughtCollection = require('./collections/thought-collection'),
        ThoughtListView = require('./views/thought-list');

    var collection = new ThoughtCollection(),
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


