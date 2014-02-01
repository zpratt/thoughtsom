'use strict';

(function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        thoughtSchema;

    thoughtSchema = new Schema({
        title: String,
        body: String,
        created_ts: {type: Date, default: Date.now }
    });

    exports.thought_schema = thoughtSchema;
}());