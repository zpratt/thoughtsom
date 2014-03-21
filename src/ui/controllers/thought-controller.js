module.exports = (function () {
    'use strict';

    return function ($scope, $http) {
        $http.get('/thought').success(function (res) {
            $scope.thoughts = angular.fromJson(res);
        });
    };
}());