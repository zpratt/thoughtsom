module.exports = function (config) {
    'use strict';

    var _ = require('lodash'),
        files = require('config'),
        prodFiles = files.ui_prod,
        testFiles = files.ui_test_unit;

    function preprocessor() {
        var files = {};
        _.each(_.union(prodFiles, testFiles), function (file) {
            files[file] = 'browserify';
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
            files: _.union(prodFiles, testFiles),
            transform: ['hbsfy']
        },
        files: [testFiles[0]],
        reporters: ['progress'],
        port: 9998,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-browserifast',
            'karma-phantomjs-launcher',
            'karma-sinon'
        ],
        captureTimeout: 6000
    });
};
