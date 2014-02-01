/* jshint expr: true */

describe("A test suite", function () {
    beforeEach(function () {
        this.server = sinon.fakeServer.create();
    });
    afterEach(function () {
        this.server.restore();
    });

    it('should fail', function () {
        this.server.respondWith("GET", "/some/article/comments.json",
            [200, { "Content-Type": "application/json" },
                '[{ "id": 12, "comment": "Hey there" }]']);

        $.getJSON('/some/article/comments.json', function (data) {
            dump(JSON.stringify(data));
        });
        this.server.respond();
    });
});
