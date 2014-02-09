(function () {
    'use strict';
    var Repository = require('../../repositories/thoughts'),
        thoughtRepo = new Repository();

    module.exports = {
        getById: function (req, res) {
            var objectId = req.params.id,
                result;

            /* temporary until I add a known object ID to the
             * thought-api scenario
             */
            if(!objectId) {
                res.json({foo:'bar'});
                return null;
            }

            result = thoughtRepo.findById(objectId);
            if (result) {
                res.json(JSON.stringify(result));
            } else {
                res.send(404)
            }
        }
    };
}());