(function () {
    'use strict';

    describe('Thought Collection', function () {
        var sinon = require('sinon'),

            jquery = require('jquery'),
            Backbone = require('backbone'),
            ThoughtCollection = require('../../../../src/ui/collections/thought-collection'),
            ThoughtModel = require('../../../../src/ui/models/thought-model'),

            collection,

            jqXHRfake = {
                then: function () { return; },
                state: function () { return 'resolved'; }
            };

        sinon.stub(jquery, 'ajax').returns(jqXHRfake);

        beforeEach(function () {
            collection = new ThoughtCollection();
        });

        it('should be an instance of Backbone.Collection', function () {
            assert.instanceOf(collection, Backbone.Collection);
        });

        it('should bind to the /thought endpoint', function () {
            assert.equal(collection.url, '/thought');
        });

        it('should contain ThoughtModel instances', function () {
            var actualModel;
            collection.add({title: 'some title', body: 'some body'});

            actualModel = collection.models[0];

            assert.instanceOf(actualModel, ThoughtModel);
        });

        it('should expose an promise to determine when the collection is finished loading', function () {
            assert.equal('pending', collection.loaded.state());

            var promise = collection.fetch();

            assert.strictEqual(collection.loaded, jqXHRfake);
            assert.strictEqual(promise, jqXHRfake);
        });
    });
}());
