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
		'question_from',
		'question_music',
		'question_food',
		'question_remarks',
	],
};

module.exports = config;
