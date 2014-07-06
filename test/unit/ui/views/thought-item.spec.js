(function () {
    'use strict';

    describe('Thought Item View', function () {
        var ThoughtItemView = require('../../../../src/ui/views/thought-item'),

            Backbone = require('backbone'),
            $ = require('jquery'),
            faker = require('faker'),

            StubModel,
            itemView,
            model,

            sandbox;

        beforeEach(function () {
            var $viewEl = $('<div/>');

            StubModel = Backbone.Model.extend({
                defaults: {
                    url: 'someurl'
                }
            });
            model = new StubModel();

            itemView = new ThoughtItemView({model: model, el: $viewEl.get(0)});

            $('body').append($viewEl);

            sandbox = sinon.sandbox.create();

            sandbox.stub(Backbone.Model.prototype, 'destroy');
        });

        afterEach(function () {
            $('body').empty();

            sandbox.restore();
        });

        it('should be an instance of a Backbone view', function () {
            assert.instanceOf(itemView, Backbone.View);
        });

        it('should listen for clicks on the delete button', function () {
            var clickEvent = $.Event('click');

            $('.delete').trigger(clickEvent);

            sinon.assert.calledOnce(Backbone.Model.prototype.destroy);
            assert.isTrue(clickEvent.isDefaultPrevented());
        });

        it('should re-render when the url of the model changes', function () {
            var expectedUrl = faker.Internet.ip(),
                actualUrl;

            model.set('url', expectedUrl);
            actualUrl = $('a').attr('href');

            assert.equal(actualUrl, expectedUrl);
        });
    });

    }());
