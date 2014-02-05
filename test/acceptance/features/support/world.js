'use strict';

(function () {
    var mongoose = require('mongoose'),
        ThoughtModel = require('../../../../src/server/models/thought');

    var World = function World(callback) {
        this.createThought = function (callback) {
            var model;
            mongoose.connect('mongodb://localhost:27017/thoughts',
                function (err) {
                    if (err) {
//                        console.log('error connecting to mongo to save');
                    }
                }
            );

            model = new ThoughtModel({
                title: 'This is an article',
                body: 'This is an article body. Imagine you are reading well written prose.'
            });

            model.save(function (err, model) {
                if (err) {
                    console.log('error saving model: ' + JSON.stringify(model));
                }
                callback();
            });
        };

        this.clearDB = function clearDB(callback) {
            mongoose.connect('mongodb://localhost:27017/thoughts',
                function (err) {
                    if (err) {
//                        console.log('error connecting to mongo to remove');
                    }
                }
            );
            ThoughtModel.collection.remove(function (err) {
                if(err) {
//                    console.log('Error occurred removing: ' + err);
                }
                callback();
            });
        };

        callback();
    };

    module.exports.World = World;
}());
