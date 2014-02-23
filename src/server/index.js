(function () {
    var CONFIG = require('config'),
        server = require(CONFIG.Default.serverRoot + '/app/server');

    server.start(CONFIG.server.port);
}());
