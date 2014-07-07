module.exports = function (config) {
    'use strict';

    var _ = require('lodash'),
        files = require('config'),
        prodFiles = files.ui_prod,
        testFiles = files.ui_test_unit;

    function preprocessor() {
        var files = {};
        _.each(testFiles, function (file) {
            files[file] = ['browserify'];
        });
        _.each(prodFiles, function (file) {
            files[file] = ['coverage'];
        });

        return files;
    }

    config.set({
        basePath: '.',
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],
        exclude: [],
        preprocessors: preprocessor(),
        browserify: {
            debug: true,
            transform: ['hbsfy']
        },
        files: _.map(testFiles, function (file) {
            return {pattern: file, watch: true}
        }),
        reporters: ['progress'],
        port: 9998,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-chai',
            'karma-coverage',
            'karma-mocha',
            'karma-bro',
            'karma-phantomjs-launcher',
            'karma-sinon'
        ],
        captureTimeout: 6000
    });
};
