'use strict';

var express = require('express');

var app = express();

exports.start = function (port) {
    app.listen(port);
    app.use(express.logger());
    app.use(express.urlencoded());
    app.use(express.json());

    console.log('Listening on port ' + port);
};

exports.app = app;

app.get('/thought', function (req, res) {
    res.send(200, { foo: 'bar' });
});