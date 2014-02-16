/* jshint expr: true */
/* jshint -W079 */

'use strict';

var assert = require('chai').assert,
    sinon = require('sinon'),
    mongoose = require('mongoose'),
    ThoughtModel = require('../../../../src/server/models/thought'),
    ThoughtsRepo = require('../../../../src/server/repositories/thoughts');

describe("ThoughtRepository test suite", function () {
    var repo,
        createCallback;

    beforeEach(function () {
        sinon.stub(mongoose, 'connect');
        sinon.stub(ThoughtModel, 'create', function (obj, callback) {
            createCallback = callback;
        });
        sinon.stub(ThoughtModel, 'findById', function () {
            return {
                exec: function () {
                    return {
                        then: function () { return; }
                    };
                }
            };
        });

        repo = new ThoughtsRepo();
    });

    afterEach(function () {
        mongoose.connect.restore();
        ThoughtModel.create.restore();
        ThoughtModel.findById.restore();
        repo = null;
        createCallback = null;
    });

    it('test that getModel returns a new mongoose model named thoughts', function () {
        var model = repo.getModel();
        assert.equal('thoughts', model.modelName);
        assert.isObject(model.schema);
    });

    it('test that we can call save to persist a new model instance', function () {
        sinon.assert.notCalled(ThoughtModel.create);

        repo.save({junk: 'it is'});

        createCallback();

        sinon.assert.calledOnce(ThoughtModel.create);
    });

    it('should return a promise when findById is called with an objectId', function () {
        var spy = sinon.spy(),
            id = new mongoose.Types.ObjectId(),
            resultPromise = repo.findById(id, spy);

        sinon.assert.calledOnce(ThoughtModel.findById);

        assert.isFunction(resultPromise.then);
    });
});
