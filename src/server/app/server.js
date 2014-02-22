'use strict';

var express = require('express'),
    thoughtRoute = require('./controllers/thought-route');

var app = express();

exports.start = function (port) {
    app.listen(port);
    app.use(express.logger());
    app.use(express.urlencoded());
    app.use(express.json());

    console.log('Listening on port ' + port);
};

exports.app = app;

app.get('/thought/:id', thoughtRoute.getById);
app.post('/thought', [express.json(), express.urlencoded()], thoughtRoute.create);