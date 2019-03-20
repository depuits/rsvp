const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');

const config = require('config');
const port = config.get('port');

const mongo = require('./lib/mongoUtil');

const app = express();

mongo.connect().then(() => {
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(cors());

	app.use('/api', require('./routes')); // api endpoints
	app.use(express.static('public')); // client and other static resources
	app.use(history());

	app.listen(port);

	console.log('Running at port ' + port);
});
