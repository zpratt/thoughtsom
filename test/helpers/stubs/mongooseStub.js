module.exports = (function () {
    'use strict';

    var casual = require('casual');

    return {
        mongoose: {
            connect: function () { return; },
            model: {
                findById: function (id) { return id; }
            },
            Types: {
                ObjectId: function ObjectId() {
                    return casual.word;
                }
            }
        }
    };
}());