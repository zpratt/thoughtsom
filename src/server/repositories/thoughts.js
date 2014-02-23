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

    _.extend(Repository.prototype, {
        getModel: function () {
            return this.model;
        },

        findById: function (id) {
            var result = null,
                query;

            query = this.model.findById(id);
            return query.exec(function (err, thought) {
                if (err) {
                    console.log('error in findById');
                }
                result = thought;
            });
        },
        save: function (thought) {
            return this.model.create(thought, handleError('save'));
        }
    });

    module.exports = Repository;
}());