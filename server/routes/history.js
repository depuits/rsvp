const router = require('express').Router();
const path = require('path');

router.get('/', function(req, res, next) {
	res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, '../data/history.json'));
});

module.exports = router;
