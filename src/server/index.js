var server = require('./app/server'),
    CONFIG = require('config').server;

server.start(CONFIG.port);