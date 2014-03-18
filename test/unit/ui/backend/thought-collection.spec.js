/* jshint expr: true */
(function () {
    'use strict';

    describe("Thought Collection", function () {
        var ThoughtCollection = require('../../../../src/ui/backend/thought-collection');

        beforeEach(function () {
        });
        afterEach(function () {
        });

        it('should should create a new instance of a Backbone.Collection', function () {
            var collection = new ThoughtCollection();

            assert.instanceOf(collection, Backbone.Collection);
        });
    });
}());
