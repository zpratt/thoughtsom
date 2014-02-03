'use strict';

(function () {
    var Repository = require('../../repositories/thoughts'),
        thoughtRepo = new Repository();

    module.exports = {
        getById: function (id) {
            return thoughtRepo.findById(id);
        }
    };
}());