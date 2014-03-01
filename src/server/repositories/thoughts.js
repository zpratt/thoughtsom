'use strict';

(function() {
    var mongoose = require('mongoose'),
        Thought = require('../models/thought'),
        _ = require('lodash');

    function Repository() {
        mongoose.connect('mongodb://localhost:27017/thoughts');

        this.model = Thought;
    }

    function handleError(errType) {
        return function(err, model) {
            if(err) {
                console.log('Error performing ' + errType + 'on model: ' + model.title);
            }
        };
    }

    function stringToObjectId(id) {
        return mongoose.Types.ObjectId(id);
    }

    _.extend(Repository.prototype, {
        getModel: function () {
            return this.model;
        },
        findById: function (id) {
            var query,
                objectId = stringToObjectId(id);

            query = this.model.findById(objectId);
            return query.exec(function (err) {
                if (err) {
                    console.log('error in findById');
                }
            });
        },
        save: function (thought) {
            return this.model.create(thought, handleError('save'));
        },
        update: function (thought) {
            var query,
                objectId = stringToObjectId(thought._id);

            query = this.model.findOneAndUpdate({_id: objectId}, _.omit(thought, '_id'));

            return query.exec(function (err) {
                if (err) {
                    console.log('error in update');
                    console.log(err);
                }
            });
        }
    });

    module.exports = Repository;
}());