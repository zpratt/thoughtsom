module.exports = (function () {
    'use strict';
    return require('./parent-config')('/development/node/thoughtsom', process.env.HOME);
}());
