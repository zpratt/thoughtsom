[![Build Status](https://travis-ci.org/zpratt/thoughtsom.png?branch=master)](https://travis-ci.org/zpratt/thoughtsom)
[![Code Climate](https://codeclimate.com/github/zpratt/thoughtsom.png)](https://codeclimate.com/github/zpratt/thoughtsom)
[![Coverage Status](https://coveralls.io/repos/zpratt/thoughtsom/badge.png)](https://coveralls.io/r/zpratt/thoughtsom)
## Release History
* Updates
  * 02/22/14
    * Added example UI test to ensure that karma, require, chai, and initial runtime deps are working together.
    * Added a new POST route to /thought to create new thoughts. This includes a new scenario and associated tests.
  * 02/15/14
    * Updated to utilize proxyquire in unit tests to allow for injecting stubs into the require namespace.
    * Added the casual test data generator to avoid depending data values in tests and to provide dummy data for mongodb inserts.

## License
Copyright (c) 2014 zach pratt  
Licensed under the MIT license.
