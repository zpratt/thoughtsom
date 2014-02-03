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
        sinon.stub(ThoughtModel, 'findById', function (id) {
            return {
                exec: function (callback) {
                    var promise = new mongoose.Promise();
                    callback(null, {id: id});
                    promise.resolve();
                    return  promise;
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

    it('should return a single thought given an id', function () {
        var spy = sinon.spy();
        var id = '1';
        var thought = repo.findById(id, spy);

        sinon.assert.calledOnce(ThoughtModel.findById);

        console.log('returned thought is: ' + JSON.stringify(thought));

        assert.isDefined(thought);
        assert.equal(thought.id, id);
    });
});
