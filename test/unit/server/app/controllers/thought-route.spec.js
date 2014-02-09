/* jshint expr: true */
/* jshint -W079 */

describe('/thought endpoint test suite', function () {
    'use strict';

    var assert = require('chai').assert,
        mongoose = require('mongoose'),
        sinon = require('sinon'),
        Repository = require('../../../../../src/server/repositories/thoughts'),
        thoughtRepo,
        thoughtRoute = require('../../../../../src/server/app/controllers/thought-route'),
        existingId = 'some id';

    beforeEach(function () {
        sinon.stub(mongoose, 'connect');
        sinon.stub(Repository.prototype, 'findById', function (id) {
            if(id === existingId) {
                return {
                    id: existingId
                };
            }
            return null;
        });

        thoughtRepo = new Repository();
    });
    afterEach(function () {
        mongoose.connect.restore();
        Repository.prototype.findById.restore();
    });

    it('should return a single thought given an id', function () {
        var req = {
                params: {
                    id: existingId
                }
            },
            res = {
                json: sinon.spy()
            },
            result;

        thoughtRoute.getById(req, res);
        result = res.json.getCall(0).args[0];

        sinon.assert.calledOnce(thoughtRepo.findById);
        sinon.assert.calledWith(thoughtRepo.findById, existingId);
        thoughtRepo.findById.calledBefore(res.json);

        sinon.assert.calledOnce(res.json);
        assert.equal(existingId, JSON.parse(result).id);
    });

    it('should respond with a status code of 404 when a thought is not found', function () {
        var req = {
                params: {
                    id: 'not found'
                }
            },
            res = {
                send: sinon.spy()
            },
            expectedStatusCode = 404;

        thoughtRoute.getById(req, res);

        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.send, expectedStatusCode);
    });
});
