const router = require('express').Router();

router.get('/', function(req, res, next) {
	res.send(
		[
			{
				image: '',
				name: 'history.birth',
				desc: '',
				date: new Date(1991, 11, 25),
			},
		]
	);
});

module.exports = router;
