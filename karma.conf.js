module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'bower_components/lodash/dist/lodash.underscore.js',
            'bower_components/jquery/jquery.js',
            'test/unit/ui/**/*.spec.js'
        ],
        exclude: [],
        reporters: ['progress'],
        port: 9999,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: false,
        browsers: ['PhantomJS'],
        captureTimeout: 6000,
        singleRun: true
    });
};
