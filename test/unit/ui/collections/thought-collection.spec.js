(function () {
    'use strict';

    describe('Thought Collection', function () {
        var sinon = require('sinon'),

            jquery = require('jquery'),
            Backbone = require('backbone'),
            ThoughtCollection = require('../../../../src/ui/collections/thought-collection'),

            collection;

        sinon.stub(jquery, 'ajax');

        beforeEach(function () {
            collection = new ThoughtCollection();
        });

        it('should be an instance of Backbone.Collection', function () {
            assert.instanceOf(collection, Backbone.Collection);
        });
    });
}());
