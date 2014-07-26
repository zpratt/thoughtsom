(function () {
    'use strict';

    describe('Thought Collection', function () {
        var sinon = require('sinon'),

            $ = require('jquery'),
            Backbone = require('backbone'),
            ThoughtCollection = require('../../../../src/ui/collections/thought-collection'),
            ThoughtModel = require('../../../../src/ui/models/thought-model'),

            ConcreteCollection = ThoughtCollection.extend({
                parse: function (res) {
                    res.thisworks = 'see';

                    return res;
                }
            }),
            collection,

            jqXHR,

            sandbox;


        beforeEach(function () {
            sandbox = sinon.sandbox.create();

            jqXHR = $.Deferred();

            collection = new ConcreteCollection();

            sandbox.stub($, 'ajax', function (options) {
                if (options.success) {
                    options.success({"some": "data"});
                }

                return jqXHR;
            });
        });

        afterEach(function () {
            sandbox.restore();
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

            assert.strictEqual(collection.loaded, jqXHR);
            assert.strictEqual(promise, jqXHR);

            assert.equal(collection.length, 1);
            assert.equal(collection.models[0].attributes.thisworks, 'see');
        });
    });
}());
