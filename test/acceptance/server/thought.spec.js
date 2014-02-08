(function () {
    'use strict';

    var Yadda = require('yadda'),
        CONFIG = require('config').Default,
        World = require('./features/support/world').World,
        theWorld = new World();

    Yadda.plugins.mocha();

    before(theWorld.connectToDB);
    beforeEach(theWorld.createThought);

    afterEach(theWorld.clearDB);
    after(theWorld.disconnectDB);

    feature(
        process.env.HOME +
            CONFIG.testRoot +
            '/acceptance/server/features/thought-api.feature',
        function(feature) {

            var library = require(
                process.env.HOME +
                    CONFIG.testRoot +
                    '/acceptance/server/features/step_definitions/thought-api.step.js'
            );
            var yadda = new Yadda.Yadda(library);

            scenarios(feature.scenarios, function (scenario, done) {
                yadda.yadda(scenario.steps, done);
            });
    });
}());