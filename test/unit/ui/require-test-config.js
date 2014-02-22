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
            '/base/test/unit/ui/fakeserver-example.spec.js'
        ],
        callback: window.__karma__.start
    });
}());