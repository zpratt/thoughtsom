(function () {
    'use strict';
    var Repository = require('../../repositories/thoughts'),
        thoughtRepo = new Repository(),
        mongoose = require('mongoose');

    module.exports = {
        getById: function (req, res) {
            var reqId = req.params.id,
                objectId,
                queryPromise;

            objectId = mongoose.Types.ObjectId(reqId);

            queryPromise = thoughtRepo.findById(objectId);

            queryPromise.then(
                function (item) {
                    res.json(JSON.stringify(item));
                },
                function (err) {
                    res.send(404);
                }
            );
        }
    };
}());