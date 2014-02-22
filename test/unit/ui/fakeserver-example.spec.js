/* jshint expr: true */
define(['backbone'], function (Backbone) {
    describe("A test suite", function () {
        var ThoughtCollection,
            collection;

        beforeEach(function () {
            this.server = sinon.fakeServer.create();
            ThoughtCollection = Backbone.Collection.extend({
                url: '/thought/1234',
                parse: function (response) {
                    return response;
                }
            });
            collection = new ThoughtCollection();
        });
        afterEach(function () {
            this.server.restore();
        });

        it('is testing a call to the sinon fakeserver', function () {
            this.server.respondWith('GET', '/thought/1234',
                [200, { 'Content-Type': 'application/json' },
                    '[{ "_id": 1, "title": "This Is A Title", "body": "This is the body!" }]']);

            collection.fetch({
                success: function (res) {
                    console.log(res.models.get(0));
                }
            });
            this.server.respond();
        });
    });
});
