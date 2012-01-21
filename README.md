# log4js-mongodb

NOTE: Under construction. Not ready!

## installation

npm install log4js-mongodb 

## usage

	var log4js = require('log4js'), 
		log4js-mongodb = require('log4js-mongodb')
	
	log4js.addAppender(log4js-mongodb.appender())
	
	log4js.getLogger().info('Ready to log!')

