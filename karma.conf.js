module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],
        files: [
            {pattern: 'test/unit/ui/collections/*.spec.js'}
        ],
        exclude: [],
        preprocessors: {
            'src/ui/collections/*.js': 'browserify',
            'src/ui/models/*.js': 'browserify',
            'src/ui/views/*.js': 'browserify',
            'test/unit/ui/**/*.spec.js': 'browserify'
        },
        browserify: {
            debug: true,
            files: [
                'src/ui/app.js',
                'src/ui/collections/*.js',
                'src/ui/models/*.js',
                'src/ui/views/*.js',
                'test/unit/ui/**/*.spec.js'
            ],
            transform: ['hbsfy']
        },
        reporters: ['mocha', 'progress'],
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
            'karma-mocha-reporter',
            'karma-sinon'
        ],
        captureTimeout: 6000
    });
};
