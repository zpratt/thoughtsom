module.export = (function () {
    'use strict';
    var $ = require('jquery');

    $.ajaxSetup({async: false});

    var Yadda = require('yadda'),
        English = Yadda.localisation.English,
        FeatureParser = Yadda.parsers.FeatureParser,
        parser = new FeatureParser(English),
        steps = require('./features/step_definitions/thought-ui.step'),
        yadda = new Yadda.Yadda(steps),
        loaderFeature = $.get('base/test/acceptance/ui/features/thought-ui.feature').responseText,
        feature = parser.parse(loaderFeature);

    Yadda.plugins.mocha.AsyncScenarioLevelPlugin.init();

    scenarios(feature.scenarios, function (scenario, done) {
        yadda.yadda(scenario.steps, done);
    });
    $.ajaxSetup({async: true});
}());
