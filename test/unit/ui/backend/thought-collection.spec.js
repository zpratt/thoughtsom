/* jshint expr: true */
(function () {
    'use strict';

    describe("Thought Collection", function () {
        var ThoughtCollection = require('../../../../src/ui/backend/thought-collection'),
            ThoughtModel = require('../../../../src/ui/backend/thought-model'),
            collection;

        beforeEach(function () {
            collection = new ThoughtCollection();
        });
        afterEach(function () {
        });

        it('should should create a new instance of a Backbone.Collection', function () {
            assert.instanceOf(collection, Backbone.Collection);
        });

        it('should define a url property', function () {
            assert.equal(collection.url, '/thought');
        });

        it('should define a model property', function () {
            var Model = collection.model,
                instance = new Model();

            assert.instanceOf(instance, ThoughtModel);
        });
    });
}());
