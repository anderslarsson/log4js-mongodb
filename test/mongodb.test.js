var log4js = require('log4js'), 
	mongoAppender = require('../lib/mongoAppender'),
	assert = require('assert'),
	should = require('should')
	
describe('Mongodb domain test', function() {
	var logger = null;
	
	before(function(done) {
		log4js.clearAppenders()
		log4js.addAppender(mongoAppender.appender())
		logger = log4js.getLogger()

		done()
	})
	
	describe('When logging test', function() {
		it('the test log message should be found in the log database in the logmessages collection', function(done) {
			logger.info('test')
			done();
		})
	})
	
})