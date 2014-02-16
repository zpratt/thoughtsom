/* jshint -W014 */

(function () {
    'use strict';
    var DB_CONFIG = require('config').database,
        DEFAULTS = require('config').Default,
        TESTVALS = require('config').TestVals,
        mongoose = require('mongoose'),
        casual = require('casual'),
        connection,
        primaryKeyCache = [],
        ThoughtModel = require(process.env.HOME + DEFAULTS.projRoot + '/server/models/thought');

    var World = function World() {
        var context = this;

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
            var model,
                objectId = context.stringToObjectId(TESTVALS.knownObjectId);

            primaryKeyCache.push(objectId);

            model = new ThoughtModel({
                _id: objectId,
                title: casual.title,
                body: casual.text
            });

            model.save(function (err, model) {
                if (err) {
                    console.log('error saving model: ' + JSON.stringify(model));
                }
                done();
            });

        };

        this.getThoughtId = function () {
            var index = casual.integer(0, primaryKeyCache.length - 1);

            return primaryKeyCache[index];
        };

        this.stringToObjectId = function(str) {
            return mongoose.Types.ObjectId(str);
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
