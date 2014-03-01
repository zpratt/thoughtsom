/* jshint expr: true */
/* jshint -W079 */

(function () {
    'use strict';

    var assert = require('chai').assert,
        sinon = require('sinon'),
        DEFAULTS = require('config').Default,
        _ = require('lodash'),
        mongoose = require('mongoose'),
        ThoughtModel = require(DEFAULTS.serverRoot + '/models/thought'),
        ThoughtsRepo = require(DEFAULTS.serverRoot + '/repositories/thoughts');

    describe("ThoughtRepository test suite", function () {
        var repo,
            createCallback,
            promiseFake;

        beforeEach(function () {
            sinon.stub(mongoose, 'connect');
            sinon.stub(mongoose.Types, 'ObjectId', function (val) {
                return val;
            });
            sinon.stub(ThoughtModel, 'create', function (obj, callback) {
                createCallback = callback;
            });
            promiseFake = {
                exec: function () {
                    return {
                        then: function () {
                            return;
                        }
                    };
                }
            };
            sinon.stub(ThoughtModel, 'findById', function () {
                return promiseFake;
            });
            sinon.stub(ThoughtModel, 'findOneAndUpdate', function () {
                return promiseFake;
            });

            repo = new ThoughtsRepo();
        });

        afterEach(function () {
            mongoose.connect.restore();
            mongoose.Types.ObjectId.restore();
            ThoughtModel.create.restore();
            ThoughtModel.findById.restore();
            ThoughtModel.findOneAndUpdate.restore();
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

            sinon.assert.calledOnce(ThoughtModel.create);
        });

        it('should return a promise when findById is called with an objectId', function () {
            var id = new mongoose.Types.ObjectId(),
                resultPromise = repo.findById(id);

            sinon.assert.calledOnce(ThoughtModel.findById);

            assert.isFunction(resultPromise.then);
        });

        it('should update an existing thought', function () {
            var updatedModel = {
                    _id: 'some id',
                    title: 'some updated title'
                },
                query;

            query = repo.update(updatedModel);

            sinon.assert.calledOnce(ThoughtModel.findOneAndUpdate);
            sinon.assert.calledWith(ThoughtModel.findOneAndUpdate, {_id: updatedModel._id}, _.omit(updatedModel, '_id'));
            assert.isFunction(query.then);
        });
    });
}());
