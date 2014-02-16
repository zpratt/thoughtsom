/* jshint expr: true */
/* jshint -W079 */

describe('/thought endpoint test suite', function () {
    'use strict';

    var assert = require('chai').assert,
        sinon = require('sinon'),
        DEFAULTS = require('config').Default,
        TESTPREFIX = process.env.HOME + DEFAULTS.testRoot,
        SRCPREFIX = process.env.HOME + DEFAULTS.projRoot,
        proxyquire = require('proxyquire'),
        mongooseStub = require(TESTPREFIX + '/helpers/stubs/mongooseStub').mongoose,
        Repository = require(SRCPREFIX + '/server/repositories/thoughts'),
        thoughtRoute = proxyquire(SRCPREFIX + '/server/app/controllers/thought-route', {
            'mongoose': mongooseStub
        }),
        shouldFindMatch;

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

    beforeEach(function () {
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
    });
    afterEach(function () {
        mongooseStub.Types.ObjectId.restore();
        Repository.prototype.findById.restore();
    });
});
