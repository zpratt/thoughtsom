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
                function () {
                    res.send(404);
                }
            );
        },

        create: function (req, res) {
            var savePromise;
            if (req.body) {
                savePromise = thoughtRepo.save(req.body);
                savePromise.then(function (thought) {
                        res.status(201);
                        res.json(
                            [
                                {
                                    href: '/thought/' + thought._id,
                                    rel: 'self',
                                    method: 'GET'
                                }
                            ]
                        );
                });
            } else {
                res.status(400);
            }
        },

        update: function (req, res) {
            res.send(200);
        }
    };
}());