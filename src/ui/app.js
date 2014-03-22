/* jshint -W098 */

module.exports = (function () {
    'use strict';

    var ThoughtController = require('./controllers/thought-controller'),
        thoughtsomApp = angular.module('thoughtsomApp', []);

    thoughtsomApp.controller('ThoughtController', ThoughtController);
}());


