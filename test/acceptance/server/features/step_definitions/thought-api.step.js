/* jshint -W030 */
module.exports = (function () {
    'use strict';

    var CONFIG = require('config').Default,
        request = require('supertest'),
        expect = require('chai').expect,
        TESTVALS = require('config').TestVals,
        casual = require('casual'),
        server = require(CONFIG.serverRoot + '/app/server').app,
        endpoint = request(server),
        English = require('yadda').localisation.English,
        Dictionary = require('yadda').Dictionary,
        dictionary = new Dictionary()
            .define('http_method', /([^"]*)/)
            .define('route', /([^"]*)/)
            .define('number', /(\d+)/);

    return English.library(dictionary)

        .given('a thought exists in the database', function (next) {
            next();
        })
        .when('a GET on /thought with "$objectId" is performed', function (objectId, next) {
            endpoint
                .get('/thought/' + objectId)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    var id = res.body._id;

                    expect(err).to.not.exist;
                    expect(id).to.equal(TESTVALS.knownObjectId);

                    next();
                });
        })
        .then('a thought is returned', function (next) {
            next();
        })

        .given('a user', function (next) {
            next();
        })
        .when('a POST request on /thought is performed', function (next) {
            endpoint
                .post('/thought')
                .send({
                    title: casual.title,
                    body: casual.text
                })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    expect(err).to.not.exist;
                    expect(res.status).to.equal(201);
                    next();
                });
        })
        .then('a thought is persisted', function (next) {
            next();
        })
        .then('The ObjectId is returned', function (next) {
            next();
        })

        .when('a PUT on /thought with "$objectId" is performed', function (objectId, next) {
            endpoint
                .put('/thought/' + objectId)
                .send({
                    title: casual.title,
                    body: casual.text
                })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    expect(err).to.not.exist;
                    expect(res.status).to.equal(200);
                    next();
                });
        })
        .then('a thought is updated', function (next) {
            next();
        });

}());