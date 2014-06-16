module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],
        files: [
            {pattern: 'test/acceptance/ui/features/thought-ui.feature', included: false},
            {pattern: 'test/acceptance/ui/*.spec.js'}
        ],
        exclude: [],

        preprocessors: {
            'src/ui/app.js': 'browserify',
            'src/ui/collections/*.js': 'browserify',
            'src/ui/models/*.js': 'browserify',
            'src/ui/views/*.js': 'browserify',
            'test/acceptance/ui/*.spec.js': 'browserify',
            'test/acceptance/ui/features/step_definitions/*.step.js': 'browserify'
        },
        browserify: {
            debug: true,
            files: [
                'src/ui/app.js',
                'src/ui/collections/*.js',
                'src/ui/models/*.js',
                'src/ui/views/*.js',
                'test/acceptance/ui/*.spec.js',
                'test/acceptance/ui/features/step_definitions/*.step.js'
            ],
            transform: ['hbsfy']
        },

        reporters: ['mocha', 'progress'],
        port: 9999,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-mocha-reporter',
            'karma-sinon',
            'karma-browserifast'
        ],
        captureTimeout: 6000,
        singleRun: true
    });
};