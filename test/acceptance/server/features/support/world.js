/* jshint -W014 */

(function () {
    'use strict';
    var DB_CONFIG = require('config').database,
        DEFAULTS = require('config').Default,
        mongoose = require('mongoose'),
        connection,
        ThoughtModel = require(process.env.HOME + DEFAULTS.projRoot + '/server/models/thought');

    var World = function World() {
        this.connectToDB = function (done) {
            if(!mongoose.connection.db) {
                connection = mongoose.connect(
                    'mongodb://'
                        + DB_CONFIG.host
                        + ':'
                        + DB_CONFIG.port
                        +  '/'
                        + DB_CONFIG.name,
                    done
                );
            }
            done();
        };

        this.disconnectDB = function (done) {
            if(mongoose.connection.db) {
                mongoose.connection.close(done);
            }
            done();
        };

        this.createThought = function (done) {
            var model;

            model = new ThoughtModel({
                title: 'This is an article',
                body: 'This is an article body. Imagine you are reading well written prose.'
            });

            model.save(function (err, model) {
                if (err) {
                    console.log('error saving model: ' + JSON.stringify(model));
                }
                done();
            });

        };

        this.clearDB = function clearDB(done) {
            ThoughtModel.collection.remove(function (err) {
                if(err) {
                    console.log('Error occurred removing: ' + err);
                }
                done();
            });
        };
    };

    module.exports.World = World;
}());
