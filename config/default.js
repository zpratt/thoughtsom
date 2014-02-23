module.exports = (function () {
    var mainDir = '/development/node/thoughtsom',
        cwd = process.env.BUILD_DIR;

    if (!cwd) {
        cwd = '';
    }

    return {
        Default: {
            projRoot: mainDir + '/src',
            serverRoot: mainDir + '/src/server',
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
}());
