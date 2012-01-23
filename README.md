[![Build Status](https://secure.travis-ci.org/anderslarsson/log4js-mongodb.png)](http://travis-ci.org/anderslarsson/log4js-mongodb)

# log4js-mongodb

NOTE: Under development.

## installation

npm install log4js-mongodb 

## usage

	var log4js = require('log4js'), 
		log4jsMongo = require('log4js-mongodb')
	
	log4js.addAppender(log4jsMongo.appender())
	
	log4js.getLogger().info('Ready to log!')

