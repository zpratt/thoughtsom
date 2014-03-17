/* jshint expr: true */
(function () {
    'use strict';
    var ThoughtCollection = require('../../../../src/ui/backend/thought-collection');

    describe("Thought Collection", function () {

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
