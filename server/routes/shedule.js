const router = require('express').Router();

router.get('/', async function(req, res, next) {
	res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, 'data/events.json'));
});

router.get('/date', async function(req, res, next) {
	res.send(new Date(2019, 8, 23));
});

module.exports = router;
