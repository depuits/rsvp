const router = require('express').Router();
const config = require('config');
const eventDate = config.get('eventDate');
const path = require('path');

router.get('/', async function(req, res, next) {
	const events = require('../data/events.json');

	let shedule = {
		date: eventDate,
		events: events,
	}

	res.send(shedule);
});

router.get('/date', async function(req, res, next) {
	res.send(eventDate);
});

module.exports = router;
