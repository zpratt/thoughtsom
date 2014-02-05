'use strict';

(function () {
    var Repository = require('../../repositories/thoughts'),
        thoughtRepo = new Repository();

    module.exports = {
        getById: function (req, res) {
            var objectId = req.params.id;
            if (objectId) {
                return thoughtRepo.findById(objectId);
            }
            return null;
        }
    };
}());