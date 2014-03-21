(function () {
    'use strict';

    describe('Thought Controller', function () {
        var appMock,
            injector,
            httpBackend,
            scope,
            ThoughtController = require('../../../../src/ui/controllers/thought-controller');

        beforeEach(function () {
            appMock = angular.module("appMock", []);

            appMock.config(function ($provide) {
                $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
            });

            injector = angular.injector(['ng', 'appMock']);
            httpBackend = injector.get('$httpBackend');
            scope = injector.get('$rootScope').$new();
        });

        it('should fetch the list of thoughts upon instantiation', function () {
            var responseBody = [
                    {_id: 'some id', title: 'some title', body: 'some body'}
                ],
                controller;

            httpBackend.expectGET('/thought').respond(JSON.stringify(responseBody));
            controller = controllerFactory();
            assert.isUndefined(scope.thoughts);

            httpBackend.flush();
            assert.deepEqual(scope.thoughts, responseBody);
        });

        function controllerFactory() {
            return injector.get('$controller')(ThoughtController, {$scope: scope});
        }
    });
}());
