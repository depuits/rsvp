const router = require('express').Router();
const config = require('config');
const adminPass = config.get('adminPass');

router.post('/retrieve', (req, res) => {
	let code = req.body.code;

	//TODO real code checking and return of data
	if (code === adminPass) {
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
