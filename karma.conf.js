module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha', 'commonjs', 'chai', 'sinon'],
        files: [
            {pattern: 'bower_components/lodash/dist/lodash.underscore.js'},
            {pattern: 'bower_components/jquery/dist/jquery.min.js'},
            {pattern: 'bower_components/backbone/backbone.js'},

            {pattern: 'src/ui/backend/*.js'},
            {pattern: 'test/unit/ui/backend/*.spec.js'}
        ],
        exclude: [],
        preprocessors: {
            'src/ui/backend/*.js': ['commonjs'],
            'test/unit/ui/backend/*.spec.js': ['commonjs']
        },

        reporters: ['dots'],
        port: 9999,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-commonjs',
            'karma-phantomjs-launcher',
            'karma-sinon'
        ],
        captureTimeout: 6000,
        singleRun: true
    });
};
