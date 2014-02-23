module.exports = function (mainDir, cwd) {
    'use strict';

    if (!cwd) {
        cwd = '';
    }

    return {
        Default: {
            projRoot: cwd + mainDir + '/src',
            serverRoot: cwd + mainDir + '/src/server',
            testRoot: cwd + mainDir + '/test'
        },
        TestVals: {
            knownObjectId: "52ffef5e3242c4a82909c53f"
        },
        database: {
            host: "localhost",
            port: 27017,
            name: "thoughts"
        },
        server: {
            port: 8080
        }
    };
};
