/* jshint expr: true */
(function () {
    'use strict';

    define(['backbone', '/base/src/ui/backend/thought-collection.js'], function (Backbone, ThoughtCollection) {
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
    });
}());
