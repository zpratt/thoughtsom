module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],
        files: [
            'bower_components/jquery/jquery.js',
            {pattern: 'bower_components/lodash/dist/lodash.underscore.min.js', included: false},
            {pattern: 'bower_components/backbone/backbone.js', included: false},

            {pattern: 'src/ui/backend/*.js', included: false},

            {pattern: 'test/acceptance/ui/features/thought-ui.feature', included: false},

            'test/acceptance/ui/thought.spec.js'
//            'test/unit/ui/require-test-config.js'
        ],
        exclude: [],

        preprocessors: {
            'test/acceptance/ui/*.spec.js': 'browserify',
            'test/acceptance/ui/features/step_definitions/*.step.js': 'browserify'
        },
        browserify: {
            debug: true,
            files: [
                'test/acceptance/ui/*.spec.js',
                'test/acceptance/ui/features/step_definitions/*.step.js'
            ]
        },

        reporters: ['progress'],
        port: 9999,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: false,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-sinon',
            'karma-browserifast'
        ],
        captureTimeout: 6000,
        singleRun: true
    });
}

