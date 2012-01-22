var log4js = require('log4js'), 
	log4jsMongo = require('../lib/mongoAppender'),
	assert = require('assert'),
	should = require('should')
	
describe('log4js-mongodb tests', function() {
	var logger = null, 
		mongoAppender = null
	
	before(function(done) {
		log4js.clearAppenders()
		mongoAppender = log4jsMongo.appender()
		log4js.addAppender(mongoAppender, 'testing')
		logger = log4js.getLogger('testing')
		log4jsMongo.clearLog()

		done()
	})
	
	describe('When logging test', function() {
		it('the test log message should be found in the log database in the logmessages collection', function(done) {
			logger.info('test')
			log4jsMongo.getLogMessages(function(err, messages) {
				should.not.exist(err)
				should.exist(messages)
				messages.length.should.eql(1)
				done();
			})
		})
	})
	
})