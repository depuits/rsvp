const router = require('express').Router();

router.get('/', function(req, res, next) {
	res.send(
		[
			{
				class: 'him',
				image: '',
				name: 'history.birth',
				desc: '',
				date: new Date(1991, 11, 25),
			},
			{
				class: 'her',
				image: '',
				name: 'history.birth',
				desc: '',
				date: new Date(1996, 10, 14),
			},
		]
	);
});

module.exports = router;
