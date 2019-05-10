'use strict';

var path = require('path');

var config = {
	port: 8083,
	dbUrl: 'mongodb://localhost:27017',
	dbName: 'rsvp',
	adminPass: 'secret',
	deadLine: new Date(2019, 08, 01),
};

module.exports = config;
