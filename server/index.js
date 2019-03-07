const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const config = require('config');
const port = config.get('port');

const mongo = require('./lib/mongoUtil');

const app = express();

mongo.connect().then(() => {
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(cors());

	app.use('/api', require('./routes'));

	app.listen(port);

	console.log('Running at port ' + port);
});
