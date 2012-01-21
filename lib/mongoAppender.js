var layouts = require('log4js').layouts,
	mongoose = require('mongoose'), 
	Schema = mongoose.Schema, 
	util = require('util')
	
require('datejs')

mongoose.connect('mongodb://localhost/log');	

var LogMessageSchema = new Schema({
	time: Date, 
	msg: String, 
	category: String, 
	level: String
})

var LogMessage = mongoose.model('LogMessage', LogMessageSchema);

function log(event) {
	new LogMessage({ 
		time: event.startTime, 
		msg: event.data, 
		category: event.categoryName, 
		level: event.level
	}).save(function(err) {
		
	})
}

exports.getLogMessages = function(cb) {
	LogMessage
		.find({})
		.desc('time')
		.run(cb)
}

exports.clearLog = function() {
	LogMessage.collection.drop()
}

function mongoAppender (layout) {
    layout = layout || layouts.colouredLayout;
    return function(loggingEvent) {
		loggingEvent.data = formatLogData(loggingEvent.data)
		log(loggingEvent)
    };
}

function configure(config) {
    var layout;
    if (config.layout) {
		layout = layouts.layout(config.layout.type, config.layout);
    }
    return consoleAppender(layout);
}

exports.name = "mongoAppender";
exports.appender = mongoAppender;
exports.configure = configure;

function formatLogData(logData) {
    var output = ""
    , data = Array.isArray(logData) ? logData.slice() : Array.prototype.slice.call(arguments)
    , format = data.shift(), 
	replacementRegExp = /%[sdj]/g 

    if (typeof format === "string") {
        output = format.replace(replacementRegExp, function(match) {
            switch (match) {
            case "%s": return new String(data.shift());
            case "%d": return new Number(data.shift());
            case "%j": return JSON.stringify(data.shift());
            default:
                return match;
            };
        });
    } else {
        //put it back, it's not a format string
        data.unshift(format);
    }

    data.forEach(function (item) {
        if (output) {
            output += ' ';
        }
        if (item && item.stack) {
            output += item.stack;
        } else {
            output += util.inspect(item);
        }
    });

    return output;
}