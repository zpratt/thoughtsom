(function () {
    'use strict';

    describe("Thought Model", function () {
        var ThoughtModel = require('../../../../src/ui/backend/thought-model'),
            model;

        beforeEach(function () {
            model = new ThoughtModel({_id: 1});
        });
        afterEach(function () {
        });

        it('should should create a new instance of a Backbone.Collection', function () {
            assert.instanceOf(model, Backbone.Model);
        });

        it('should override the idAttribute property', function () {
            assert.equal(model.id, 1);
        });
    });
}());