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
        $ = require('jquery'),

        skeletonTestTemplate = require('../../support/templates/create-thought.hbs'),
        dummyThoughts = [
            { "_id": 1, "title": "This Is A Title", "body": "This is the body!" },
            { "_id": 2, "title": "This Is Another Title", "body": "This is some body text!" }
        ],

        app = require('../../../../../src/ui/app'),

        server;

    beforeEach(function () {
        server = sinon.fakeServer.create();
        server.respondWith('GET', '/thought',
            [
                200,
                { 'Content-Type': 'application/json' },
                JSON.stringify(dummyThoughts)
            ]
        );
    });

    beforeEach(function (done) {
        $('body').html(skeletonTestTemplate());
        app();

        done();
    });

    afterEach(function () {
        server.restore();
        $('body').empty();
    });

    return English.library(dictionary)
        .given('a user with existing saved thoughts', function (next) {
            next();
        })
        .when('a user lists their thoughts', function (next) {
            server.respond();
            next();
        })
        .then('a list of thoughts is returned', function (next) {
            expect($('.thoughts ul li').length).to.equal(dummyThoughts.length);
            next();
        });
}());