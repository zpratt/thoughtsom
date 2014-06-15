[![Build Status](http://img.shields.io/travis/zpratt/thoughtsom/master.svg?style=flat)](https://travis-ci.org/zpratt/thoughtsom)
[![Code Climate](http://img.shields.io/codeclimate/github/zpratt/thoughtsom.svg?style=flat)](https://codeclimate.com/github/zpratt/thoughtsom)
[![Dependency Status](http://img.shields.io/gemnasium/zpratt/thoughtsom.svg?style=flat)](https://gemnasium.com/zpratt/thoughtsom)
## Release History
* Updates
  * 03/21/14
    * After a fair amount of experimenting, I have decided to use Angular for the UI
    * Sticking with commonjs-style modules for the UI
  * 03/18/14
    * Updated UI modules to use CommonJS module format
    * Added Yadda configuration and feature to begin UI integration testing
    * Initial integration tests configuration in place
    * Using sinon fakeServer to stub endpoint interactions
  * 02/22/14
    * Added example UI test to ensure that karma, require, chai, and initial runtime deps are working together.
    * Added a new POST route to /thought to create new thoughts. This includes a new scenario and associated tests.
  * 02/15/14
    * Updated to utilize proxyquire in unit tests to allow for injecting stubs into the require namespace.
    * Added the casual test data generator to avoid depending data values in tests and to provide dummy data for mongodb inserts.

## License
Copyright (c) 2014 zach pratt  
Licensed under the MIT license.
