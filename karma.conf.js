module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['mocha', 'commonjs', 'chai', 'sinon'],
        files: [
            {pattern: 'bower_components/lodash/dist/lodash.underscore.js'},
            {pattern: 'bower_components/angular/angular.js'},
            {pattern: 'bower_components/angular-mocks/angular-mocks.js'},

            {pattern: 'src/ui/app.js'},
            {pattern: 'src/ui/controllers/*.js'},

            {pattern: 'test/unit/ui/controllers/*_test.spec.js'}
        ],
        exclude: [],
        preprocessors: {
            'src/ui/app.js': ['commonjs'],
            'src/ui/controllers/thought-controller.js': ['commonjs'],
            'test/unit/ui/controllers/*_test.spec.js': ['commonjs']
        },

        reporters: ['dots'],
        port: 9999,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
//        browsers: ['Chrome'],
        plugins: [
            'karma-chai',
            'karma-mocha',
            'karma-commonjs',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-sinon'
        ],
        captureTimeout: 6000,
        singleRun: true
    });
};
