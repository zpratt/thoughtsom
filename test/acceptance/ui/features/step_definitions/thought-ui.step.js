/* jshint -W030 */

module.exports = (function () {
    'use strict';
    var English = require('yadda').localisation.English,
        Dictionary = require('yadda').Dictionary,
        dictionary = new Dictionary()
            .define('title', /([^"]*)/)
            .define('body', /([^"]*)/)
            .define('number', /(\d+)/),

        expect = require('chai').expect,

        ThoughtCollection = require('../../../../../src/ui/collections/thought-collection'),
        collection,

        server;

    beforeEach(function () {
    });

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
            next();
        })
        .when('a GET request on /thought is performed', function (next) {
            collection = new ThoughtCollection();
            collection.fetch().then(function () {
                next();
            });
            server.respond();
        })
        .then('a list of thoughts is returned', function (next) {
            expect(collection.models.length).to.equal(1);
            next();
        });
}());