(function () {
    'use strict';

    describe('Thought List View', function () {
        var ThoughtListView = require('../../../../src/ui/views/thought-list'),

            Backbone = require('backbone'),
            $ = require('jquery'),
            _ = require('lodash'),
            faker = require('faker'),

            StubCollection,
            StubItemView,

            listView,
            collection,
            models,

            sandbox;


        function resolveCollection() {
            collection.loaded.resolve();
        }

        function createNewModel() {
            var newModel = _.clone(models[0]);
            newModel.title = faker.Lorem.words();

            return newModel;
        }

        beforeEach(function () {
            var $viewEl = $('<ul/>');
            models = [
                {title: faker.Lorem.words(), body: faker.Lorem.words()},
                {title: faker.Lorem.words(), body: faker.Lorem.words()}
            ];

            StubCollection = Backbone.Collection.extend({
                initialize: function () {
                    this.loaded = $.Deferred();
                }
            });
            StubItemView = Backbone.View.extend({
                render: function () {
                    this.$el.append('<div/>');
                }
            });

            collection = new StubCollection(models);

            listView = new ThoughtListView({ItemView: StubItemView, el:$viewEl.get(0), collection: collection});

            $('body').append($viewEl);

            sandbox = sinon.sandbox.create();

//            sandbox.stub(Backbone.Model.prototype, 'destroy');
        });

        afterEach(function () {
            $('body').empty();

            sandbox.restore();
        });

        it('should be an instance of a Backbone view', function () {
            assert.instanceOf(listView, Backbone.View);
        });
        it('should define a cache of child views upon initialization', function () {
            assert.equal(listView.childViews.length, 0);
        });

        it('should render all items in the collection when it is finished loading', function () {
            assert.equal($('li').length, 0);

            resolveCollection();

            assert.equal($('li').length, models.length);
            assert.equal(listView.childViews.length, models.length);

            _.each(listView.childViews, function (view) {
                assert.instanceOf(view, StubItemView);
            });
        });


        it('should re-render when a new model is added to the view\'s collection', function () {
            resolveCollection();
            var beforeAddListItemLength = $('li').length;

            collection.add(createNewModel());

            assert.equal($('li').length, beforeAddListItemLength + 1);
        });

    });

}());
