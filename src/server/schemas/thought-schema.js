(function() {
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        thoughtSchema;

    thoughtSchema = new Schema({
        title: String,
        body: String,
        created_ts: {type: Date, default: Date.now }
    });

    module.exports.thought_schema = thoughtSchema;
}());