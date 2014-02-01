'use strict';

var request = require('supertest');
var server = require('../../../../src/server/app/server').app;
var endpoint = request(server);

module.exports = function () {
    this.Given(/^No thoughts exist$/, function (callback) {
        callback();
    });

    this.When(/^A POST to \/thought is performed$/, function (callback) {
        endpoint.get('/thought').expect(200, callback);
    });

    this.Then(/^A thought is persisted$/, function (callback) {
        callback.pending();
    });
};