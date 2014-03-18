/* jshint -W030 */

module.exports = (function () {
    'use strict';
    var ThoughtCollection = require('../../../../../src/ui/backend/thought-collection'),

        English = require('yadda').localisation.English,
        Dictionary = require('yadda').Dictionary,
        dictionary = new Dictionary()
        .define('title', /([^"]*)/)
        .define('body', /([^"]*)/)
        .define('number', /(\d+)/),

        server,
        response,
        collection;

    beforeEach(function () {
        server = sinon.fakeServer.create();
        server.respondWith('GET', '/thought',
            [200, { 'Content-Type': 'application/json' },
                '[{ "_id": 1, "title": "This Is A Title", "body": "This is the body!" }]']);

    });
    afterEach(function () {
        server.restore();
    });

    return English.library(dictionary)

        .given('a user', function (next) {
            collection = new ThoughtCollection();
            expect(collection).to.be.instanceof(Backbone.Collection);

            next();
        })

        .when('a GET request on /thought is performed', function (next) {
            collection.fetch({
                    success: function (res) {
                        response = res;
                        next();
                    },
                    failure: function () {
                        next();
                    }
                });

            server.respond();
        })

        .then('a list of thoughts is returned', function (next) {
            var model;

            expect(response).to.have.length.above(0);

            model = response.models[0];
            expect(model.attributes).to.contain.keys('_id', 'title', 'body');

            next();
        });
}());
