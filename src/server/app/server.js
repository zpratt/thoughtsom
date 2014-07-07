(function () {
    'use strict';

    var express = require('express'),
        thoughtRoute = require('./controllers/thought-route'),
        CONFIG = require('config'),
        publicDir = CONFIG.Default.serverRoot + '/../../public/';

    var app = express();

    module.exports.start = function (port) {
        app.listen(port);
        app.use(express.static(publicDir));
        app.use(express.logger());
        app.use(express.urlencoded());
        app.use(express.json());
    };

    module.exports.app = app;

    app.get('/thought/:id', thoughtRoute.getById);
    app.get('/thought', thoughtRoute.getAll);
    app.post('/thought', [express.json(), express.urlencoded()], thoughtRoute.create);
    app.put('/thought/:id', [express.json(), express.urlencoded()], thoughtRoute.update);
}());
