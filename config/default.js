module.exports = (function () {
    'use strict';
    return require('./parent-config')('/Developer/thoughtsom/', process.env.HOME);
}());
