/* jshint -W030 */

/**
 * TODO: The BDD tests will need to load the template and interact with it.
 * I may want to consider doing something similiar to what is decribed in the example
 * on the following page: http://docs.angularjs.org/api/ng/function/angular.injector
 */

module.exports = (function () {
    'use strict';
    var English = require('yadda').localisation.English,
        Dictionary = require('yadda').Dictionary,
        dictionary = new Dictionary()
            .define('title', /([^"]*)/)
            .define('body', /([^"]*)/)
            .define('number', /(\d+)/),

        server,
        $injector,
        controller;

    beforeEach(function () {
        $injector = angular.injector(['ng', 'thoughtsomApp']);
        controller = $injector.get('$controller');
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
            next();
        })
        .then('a list of thoughts is returned', function (next) {
            next();
        });
}());