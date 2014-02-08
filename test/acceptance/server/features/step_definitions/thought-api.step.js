module.exports = (function () {
    'use strict';

    var CONFIG = require('config').Default,
        request = require('supertest'),
        server = require(process.env.HOME + CONFIG.projRoot + '/server/app/server').app,
        endpoint = request(server),
        English = require('yadda').localisation.English,
        Dictionary = require('yadda').Dictionary,
        dictionary = new Dictionary()
            .define('http_method', /([^"]*)/)
            .define('route', /([^"]*)/)
            .define('number', /(\d+)/);

    return English.library(dictionary)

        .given('A thought exists in the database', function (next) {
            next();
        })
        .when('A "$http_method" on "$route" is performed', function (http_method, route, next) {
            endpoint[http_method.toLowerCase()](route).expect(200, next);
        })
        .then('A thought is returned', function (next) {
            next();
        });
}());