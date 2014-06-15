(function() {
    'use strict';

    var mongoose = require('mongoose'),
        Thought = require('../models/thought'),
        _ = require('lodash');

    function Repository() {
        mongoose.connect('mongodb://localhost:27017/thoughts');

        this.model = Thought;
    }

    function handleError(errType) {
        return function(err, model) {
            var message;

            if(err) {
                message = 'Error performing ' + errType + 'on model: ' + model.title;
                return message;
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
            return query.exec(function () {
                return;
            });
        },
        findAll: function () {
            var query;

            query = this.model.find({});

            return query.exec(function () {
                return;
            });
        },
        save: function (thought) {
            return this.model.create(thought, handleError('save'));
        },
        update: function (thought) {
            var query,
                objectId = stringToObjectId(thought._id);

            query = this.model.findOneAndUpdate({_id: objectId}, _.omit(thought, '_id'));

            return query.exec(function () {
                return;
            });
        }
    });

    module.exports = Repository;
}());