/* jshint -W030 */

module.exports = (function () {
    'use strict';
    var ThoughtCollection = require('../../../../../src/ui/backend/thought-collection'),
        English = require('yadda').localisation.English,
        Dictionary = require('yadda').Dictionary,
        dictionary = new Dictionary()
        .define('title', /([^"]*)/)
        .define('body', /([^"]*)/)
        .define('number', /(\d+)/);

    return English.library(dictionary)

        .given('a user', function (next) {
            var collection = new ThoughtCollection();
            expect(collection).to.be.instanceof(Backbone.Collection);
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
