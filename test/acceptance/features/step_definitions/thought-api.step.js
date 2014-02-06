'use strict';

(function () {

    var CONFIG = require('config').Default,
        request = require('supertest'),
        server = require(process.env.HOME + CONFIG.projRoot + '/server/app/server').app,
        endpoint = request(server);

    module.exports = function () {
        this.World = require('../support/world').World;

        this.Before(function (callback) {
            this.connectToDB(callback);
            this.createThought(callback);
        });
        this.After(function (callback) {
            this.clearDB(callback);
            this.disconnectDB(callback);
        });

        this.Given(/^No thoughts exist$/, function (callback) {
            callback();
        });
        this.When(/^A POST to \/thought is performed$/, function (callback) {
            callback.pending();
        });
        this.Then(/^A thought is persisted$/, function (callback) {
            callback.pending();
        });

        this.Given(/^A thought exists in the database$/, function(callback) {
            callback();
        });
        this.When(/^A GET is \/thought\/:id is performed$/, function(callback) {
            endpoint.get('/thought').expect(200, callback);
        });
        this.Then(/^A thought is returned$/, function(callback) {
            callback.pending();
        });

    };
}());