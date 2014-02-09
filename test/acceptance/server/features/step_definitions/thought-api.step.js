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
        .when('A GET on "$route" is performed', function (route, next) {
            endpoint.get(route).expect(200, next);
        })
        .then('A thought is returned', function (next) {
            next();
        });
}());