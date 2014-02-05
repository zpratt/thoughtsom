/* jshint expr: true */
/* jshint -W079 */

var assert = require('chai').assert,
    mongoose = require('mongoose'),
    sinon = require('sinon'),
    Repository = require('../../../../../src/server/repositories/thoughts'),
    thoughtRepo,
    thoughtRoute = require('../../../../../src/server/app/controllers/thought-route');

describe('/thought endpoint test suite', function () {
    beforeEach(function () {
        sinon.stub(mongoose, 'connect');
        sinon.stub(Repository.prototype, 'findById', function (id) {
            return {
                id: id
            };
        });

        thoughtRepo = new Repository();
    });
    afterEach(function () {
        mongoose.connect.restore();
        Repository.prototype.findById.restore();
    });

    it('should return a single thought given an id', function () {
        var id = new mongoose.Types.ObjectId();

        var thought = thoughtRoute.getById(
            {
                params: {
                    id: id
                }
            }, {}
        );

        sinon.assert.calledOnce(thoughtRepo.findById);
        sinon.assert.calledWith(thoughtRepo.findById, id);
        assert.isDefined(thought);
        assert.equal(thought.id, id);
    });

    it('should return null when an id is not passed', function () {
        var thought = thoughtRoute.getById(
            {
                params: {}
            }, {}
        );

        sinon.assert.notCalled(thoughtRepo.findById);
        assert.isNull(thought);
    });
});
