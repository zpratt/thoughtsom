/* jshint -W014 */
'use strict';

(function () {
    var DB_CONFIG = require('config').database,
        DEFAULTS = require('config').Default,
        mongoose = require('mongoose'),
        connection,
        ThoughtModel = require(process.env.HOME + DEFAULTS.projRoot + '/server/models/thought');

    var World = function World(callback) {
        this.connectToDB = function (callback) {
            if(!mongoose.connection.db) {
                connection = mongoose.connect(
                    'mongodb://'
                        + DB_CONFIG.host
                        + ':'
                        + DB_CONFIG.port
                        +  '/'
                        + DB_CONFIG.name,
                    callback
                );
            }
            callback();
        };

        this.disconnectDB = function (callback) {
            if(mongoose.connection.db) {
                mongoose.connection.close(callback);
            }
            callback();
        };

        this.createThought = function (callback) {
            var model;

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
            ThoughtModel.collection.remove(function (err) {
                if(err) {
                    console.log('Error occurred removing: ' + err);
                }
                callback();
            });
        };

        callback();
    };

    module.exports.World = World;
}());
