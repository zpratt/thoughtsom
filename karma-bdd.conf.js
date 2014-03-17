module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],
        files: [
            {pattern: 'bower_components/jquery/dist/jquery.min.js'},
            {pattern: 'bower_components/lodash/dist/lodash.underscore.min.js'},
            {pattern: 'bower_components/backbone/backbone.js'},

            {pattern: 'src/ui/backend/*.js', included: false},

            {pattern: 'test/acceptance/ui/features/thought-ui.feature', included: false},
        ],
        exclude: [],

        preprocessors: {
            '/**/*.browserify': 'browserify'
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
        logLevel: config.LOG_INFO,
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

