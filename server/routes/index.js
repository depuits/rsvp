const router = require('express').Router();

// mount our routes onto the API router
router.use('/shedule', require('./shedule'));
router.use('/history', require('./history'));
//router.use('/admin', ensureAuthenticated, require('./admin'));

router.post('/auth', (req, res) => {
	let code = req.body.code;

	//TODO real code checking and return of data
	if (code === 'AAA') {
		res.send({
			admin: true,
			code: code,
		});
	} else if (code === 'BBB') {
		res.send({
			admin: false,
			code: code,
		});
	} else {
		res.status(401).body('Incorrect code.');
	}
});

module.exports = router;
