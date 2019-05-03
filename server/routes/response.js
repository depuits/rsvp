const router = require('express').Router();
const config = require('config');
const adminPass = config.get('adminPass');

router.post('/retrieve', (req, res) => {
	let code = req.body.code.toLowerCase(); // we make the string lower case because capitals are not clear in the font

	//TODO real code checking and return of data
	if (code === adminPass) {
		res.send({
			admin: true,
			code: code,
		});
	} else {
		if (code === 'BBB') {
			res.send({
				admin: false,
				code: code,
			});
		} else {
			res.status(401).body('Incorrect code.');
		}
	}
});

router.post('/update', (req, res) => {
	let data = req.body;
	let code = data.code;

	if (code !== 'xxx') {
		//check if code is valid
	}

	// update data from db
	var resp = {
		code: 'xxx',
		response: {},
		info: {
			names: [ 'friend', 'partner' ],
			plusOne: false
		}
	};

	res.send(resp);
});

module.exports = router;
