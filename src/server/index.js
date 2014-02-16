(function () {
    var CONFIG = require('config'),
        server = require(process.env.HOME + CONFIG.Default.serverRoot + '/app/server');

    server.start(CONFIG.server.port);
}());
