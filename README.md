[![Build Status](https://travis-ci.org/zpratt/thoughtsom.png?branch=master)](https://travis-ci.org/zpratt/thoughtsom)
[![Code Climate](https://codeclimate.com/github/zpratt/thoughtsom.png)](https://codeclimate.com/github/zpratt/thoughtsom)
[![Dependency Status](https://david-dm.org/zpratt/thoughtsom.svg?theme=shields.io)](https://david-dm.org/zpratt/thoughtsom)
## Release History
* Updates
  * 03/18/14
    * Updated UI modules to use CommonJS module format
    * Added Yadda configuration and feature to begin UI integration testing
    * Initial integration tests will test views to Backbone as the integration boundary
    * Using sinon fakeServer to stub endpoint interactions
    * I plan to use ReactJS to implement the view layer
  * 02/22/14
    * Added example UI test to ensure that karma, require, chai, and initial runtime deps are working together.
    * Added a new POST route to /thought to create new thoughts. This includes a new scenario and associated tests.
  * 02/15/14
    * Updated to utilize proxyquire in unit tests to allow for injecting stubs into the require namespace.
    * Added the casual test data generator to avoid depending data values in tests and to provide dummy data for mongodb inserts.

## License
Copyright (c) 2014 zach pratt  
Licensed under the MIT license.
