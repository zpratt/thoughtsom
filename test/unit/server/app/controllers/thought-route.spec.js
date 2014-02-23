/* jshint expr: true */
/* jshint -W079 */

describe('/thought endpoint test suite', function () {
    'use strict';

    var assert = require('chai').assert,
        sinon = require('sinon'),
        DEFAULTS = require('config').Default,
        casual = require('casual'),
        proxyquire = require('proxyquire'),
        mongooseStub = require(DEFAULTS.testRoot + '/helpers/stubs/mongooseStub').mongoose,
        Repository = require(DEFAULTS.serverRoot + '/repositories/thoughts'),
        thoughtRoute = proxyquire(DEFAULTS.serverRoot + '/app/controllers/thought-route', {
            'mongoose': mongooseStub
        }),
        shouldFindMatch,
        saveCallback;

    function before () {
        sinon.spy(mongooseStub.Types, 'ObjectId');
        sinon.stub(Repository.prototype, 'findById', function (id) {
            return {
                then: function (successCb, failureCb) {
                    if (shouldFindMatch) {
                        successCb({ _id: id });
                    } else {
                        failureCb('record not found');
                    }
                }
            };
        });
        sinon.stub(Repository.prototype, 'save').returns(
            {
                then: function (callback) {
                    saveCallback = callback;
                }
            }
        );
    }

    function after () {
        mongooseStub.Types.ObjectId.restore();
        Repository.prototype.findById.restore();
        Repository.prototype.save.restore();
    }

    it('should return a single thought given an id', function () {
        var existingId = 'some id',
            req = {
                params: {
                    id: existingId
                }
            },
            res = {
                json: sinon.spy(),
                send: sinon.stub()
            },
            objectId,
            result;

        shouldFindMatch = true;

        thoughtRoute.getById(req, res);

        result = res.json.getCall(0).args[0];
        objectId = mongooseStub.Types.ObjectId.getCall(0).returnValue;

        sinon.assert.calledOnce(mongooseStub.Types.ObjectId);
        sinon.assert.calledWith(mongooseStub.Types.ObjectId, existingId);

        sinon.assert.calledOnce(Repository.prototype.findById);
        sinon.assert.calledWith(Repository.prototype.findById, objectId);
        Repository.prototype.findById.calledBefore(res.json);

        sinon.assert.calledOnce(res.json);
        assert.isDefined(JSON.parse(result)._id);
    });

    it('should respond with a status code of 404 when a thought is not found', function () {
        var req = {
                params: {
                    id: 'not found'
                }
            },
            res = {
                send: sinon.stub()
            },
            expectedStatusCode = 404;

        shouldFindMatch = false;

        thoughtRoute.getById(req, res);

        sinon.assert.calledOnce(res.send);
        sinon.assert.calledWith(res.send, expectedStatusCode);
    });

    it('should create a new thought', function () {
        var thought = {
                title: casual.title,
                body: casual.text
            },
            req = {
                body: thought
            },
            res = {
                json: sinon.stub(),
                status: sinon.stub()
            },
            jsonArgs;

        thoughtRoute.create(req, res);

        sinon.assert.calledOnce(Repository.prototype.save);
        sinon.assert.calledWith(Repository.prototype.save, thought);

        saveCallback(thought);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 201);
        sinon.assert.calledOnce(res.json);
        jsonArgs = res.json.getCall(0).args[0];
        assert.isDefined(jsonArgs[0].href);
    });

    it('should set and error status code when attempting to create an invalid thought', function () {
        var req = {
            },
            res = {
                status: sinon.stub()
            };

        thoughtRoute.create(req, res);

        sinon.assert.notCalled(Repository.prototype.save);
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 400);
    });

    beforeEach(before);
    afterEach(after);
});
