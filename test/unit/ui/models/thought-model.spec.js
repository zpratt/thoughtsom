(function () {
    'use strict';

    var Backbone = require('backbone'),
        ThoughtModel = require('../../../../src/ui/models/thought-model'),

        model,
        anyId;

    beforeEach(function () {
        anyId = 12345;
        model = new ThoughtModel({_id: anyId});
    });

    describe('Thought Model', function () {
        it('should be an instance ', function () {
            assert.instanceOf(model, Backbone.Model);
        });

        it('should have default values for attributes', function () {
            assert.equal(ThoughtModel.prototype.defaults.title, '');
            assert.equal(ThoughtModel.prototype.defaults.body, '');
            assert.equal(ThoughtModel.prototype.defaults.url, '/thought');
        });

        it('should map the _id attribute to the id attribute of the model', function () {
            assert.equal(model.id, anyId);
        });

        it('should update the url when it is instantiated with a _id value', function () {
            var expectedUrl = '/thought/' + anyId;

            assert.equal(model.get('url'), expectedUrl);
        });

        it('should not update the url if it is instantiated without an _id value', function () {
            var someModel = new ThoughtModel();

            assert.equal(someModel.get('url'), '/thought');
        });
    });
}());