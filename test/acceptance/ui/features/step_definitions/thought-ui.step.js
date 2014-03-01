/* jshint -W030 */

module.exports = (function () {
    'use strict';
    var English = require('yadda').localisation.English;
    var Dictionary = require('yadda').Dictionary;

    var dictionary = new Dictionary()
        .define('title', /([^"]*)/)
        .define('body', /([^"]*)/)
        .define('number', /(\d+)/);

    return English.library(dictionary)

        .given('a user', function (next) {
            next();
        })

        .when('a POST request on /thought is performed', function (next) {
            next();
        })

        .then('a thought is persisted', function (next) {
            expect(true).to.be.true;
            next();
        });
}());
