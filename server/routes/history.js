const router = require('express').Router();

router.get('/', function(req, res, next) {
	res.header("Content-Type",'application/json');
    res.sendFile('../data/history.json');
});

module.exports = router;
