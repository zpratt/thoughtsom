module.exports = function (config) {
    'use strict';

    var _ = require('lodash'),
        files = require('config'),
        prodFiles = files.ui_prod,
        testFiles = files.ui_test_bdd;

    function preprocessor() {
        var files = {};
        _.each(_.union(prodFiles, testFiles.spec, testFiles.step), function (file) {
            files[file] = 'browserify';
        });

        return files;
    }

    config.set({
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],

        preprocessors: preprocessor(),

        browserify: {
            debug: true,
            files: _.union(prodFiles, testFiles.spec),
            transform: ['hbsfy']
        },

        files: _.union(
//            _.map(prodFiles, function (file) {
//                return {pattern: file, watch: true, included: false}
//            }),
            _.map(testFiles.step, function (file) {
                return {pattern: file, watch: true}
            }),
            _.map(testFiles.feature, function (file) {
                return {pattern: file, included: false, watch: true}
            })
        ),

        reporters: ['progress'],
        port: 9999,
        colors: true,
        reportSlowerThan: 50,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-sinon',
            'karma-browserifast',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher'
        ],
        captureTimeout: 6000
    });
};