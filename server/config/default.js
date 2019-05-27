'use strict';

var path = require('path');

var config = {
	port: 8083,
	dbUrl: 'mongodb://localhost:27017',
	dbName: 'rsvp',
	adminPass: 'secret',
	eventDate: new Date(2019, 7, 23),
	deadLine: new Date(2019, 7, 1),
	defaultQuestions: [
		'question.music',
		'question.food',
		'question.remarks',
	],
};

module.exports = config;
