(function () {
    'use strict';

    var Repository = require('../../repositories/thoughts'),
        thoughtRepo = new Repository(),
        _ = require('lodash');

    module.exports = {
        getById: function (req, res) {
            var reqId = req.params.id,
                queryPromise;

            queryPromise = thoughtRepo.findById(reqId);

            queryPromise.then(
                function (item) {
                    res.json(item);
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
            var queryPromise,
                thought = {
                    _id: req.params.id
                };

            queryPromise = thoughtRepo.update(_.merge(thought, req.body));

            queryPromise.then(
                function (thought) {
                    res.json(thought);
                }
            );
        }
    };
}());