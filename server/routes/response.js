const router = require('express').Router();
const config = require('config');
const crypto = require('crypto');
const adminPass = config.get('adminPass');

const mongo = require('../lib/mongoUtil');
const db = mongo.getDb();
const col = db.collection('response');

function checkAdmin(req, res, next) {
	if (res.locals.admin) {
		return next();
	}

	res.status(401).json({ msg: 'Must be admin.' });
}

router.use(async (req, res, next) => {
	let code = req.header('x-code');
	if (!code) {
		return res.status(401).json({ msg: 'No code given.' });
	}

	code = code.toLowerCase(); // we make the string lower case because capitals are not clear in the font
	res.locals.code = code;

	if (code === adminPass.toLowerCase()) {
		res.locals.admin = true;
		return next();
	} else {
		var resp = await col.findOne({ code: code });
		if (resp) {
			res.locals.response = resp;
			return next();
		}
	}

	return res.status(401).json({ msg: 'Invalid code.' });
});

router.post('/retrieve', (req, res) => {
	if (res.locals.admin) {
		res.send({
			admin: true,
			code: res.locals.code,
			responses: {},
		});
	} else {
		res.send(res.locals.response);
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

router.get('/all', checkAdmin, async (req, res) => {
	let data = await col.find().toArray();
	console.log(data);
	res.send(data);
});

router.post('/create', checkAdmin, async (req, res) => {
	let data = req.body;

	data.created = new Date();

	do {
		//create a new code for our data
		data.code = crypto.randomBytes(4).toString('hex');
	} while (await col.findOne({ code: data.code })); // repeat if the code happens to be in the database

	//insert in db
	let ret = await col.insertOne(data);
	res.send(ret.ops[0]);
});

module.exports = router;
