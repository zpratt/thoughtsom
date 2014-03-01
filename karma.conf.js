module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha', 'requirejs', 'chai', 'sinon'],
        files: [
            'bower_components/jquery/jquery.js',
            {pattern: 'bower_components/lodash/dist/lodash.underscore.min.js', included: false},
            {pattern: 'bower_components/backbone/backbone.js', included: false},

            {pattern: 'src/ui/**/*.js', included: false},

            {pattern: 'test/unit/ui/**/*.spec.js', included: false},
            {pattern: 'test/unit/ui/require-test-config.js', included: true}
        ],
        exclude: [],

        reporters: ['dots'],
        port: 9999,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: false,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-requirejs',
            'karma-sinon'
        ],
        captureTimeout: 6000,
        singleRun: true
    });
};
