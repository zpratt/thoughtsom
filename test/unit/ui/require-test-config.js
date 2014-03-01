/* global window */
/* global requirejs */
(function () {
    'use strict';
    requirejs.config({
        paths: {
            'underscore': '/base/bower_components/lodash/dist/lodash.underscore.min',
            'backbone': '/base/bower_components/backbone/backbone'
        },
        shim: {
            'underscore': {
                exports: '_'
            },
            'backbone': {
                exports: 'backbone',
                deps: ['underscore', 'jquery']
            }
        },
        deps: [
            '/base/src/ui/backend/thought-collection.js',

            '/base/test/unit/ui/fakeserver-example.spec.js',
            '/base/test/unit/ui/backend/thought-collection.spec.js'
        ],
        callback: window.__karma__.start
    });
}());