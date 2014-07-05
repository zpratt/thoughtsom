module.exports = function (mainDir, cwd) {
    'use strict';

    if (!cwd) {
        cwd = '';
    }

    return {
        ui_prod: [
            'src/ui/app.js',
            'src/ui/collections/thought-collection.js',
            'src/ui/models/thought-model.js',
            'src/ui/views/thought-list.js',
            'src/ui/views/thought-item.js'
        ],
        ui_test_unit: [
            'test/unit/ui/collections/thought-collection.spec.js',
            'test/unit/ui/models/thought-model.spec.js'
        ],
        ui_test_bdd: {
            spec: [ 'test/acceptance/ui/*.spec.js' ],
            step: [ 'test/acceptance/ui/features/step_definitions/*.step.js' ],
            feature: [ 'test/acceptance/ui/features/thought-ui.feature' ]
        },
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
