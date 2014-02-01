'use strict';

(function() {
    var mongoose = require('mongoose'),
        thoughtSchema = require('../schemas/thought-schema').thought_schema,
        Thought = mongoose.model('thoughts', thoughtSchema);

    module.exports = Thought;
}());