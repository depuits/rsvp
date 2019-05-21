const router = require('express').Router();
const config = require('config');
const crypto = require('crypto');
const adminPass = config.get('adminPass');
const deadLine = config.get('deadLine');
const defaultQuestions = config.get('defaultQuestions');

const mongo = require('../lib/mongoUtil');
const ObjectId = require('mongodb').ObjectID;
const db = mongo.getDb();
const col = db.collection('guest');


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
		var guest = await col.findOne({ 'info.code': code });
		if (guest) {
			guest.deadLine = deadLine;
			guest.defaultQuestions = defaultQuestions;
			res.locals.guest = guest;
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
		});
	} else {
		res.send(res.locals.guest);
	}
});

router.post('/update', async (req, res) => {
	if(deadLine < new Date()) {
		res.status(410).json({ msg: 'Past deadline.' });
	}

	let info = res.locals.guest.info;
	let data = req.body;

	if (data.coming === 'yes') {
		if (data.comingNames && data.comingNames.length === 0) {
			data.comingNames = info.names;
		}

		if (!info.partner) {
			data.partnerName = ''; // reset partner if it was not allowed
		}
	} else {
		data.comingNames = [];
	}

	// update data from db
	//trust client to insert correct data
	let resp = await col.findOneAndUpdate({ _id: ObjectId(res.locals.guest._id) }, { $set: { response: data } }, { returnOriginal: true });
	await col.findOneAndUpdate({ _id: ObjectId(res.locals.guest._id) }, { $set: { lastUpdate: new Date() } });
	if (!resp.value.response) {
		// if the response was not previously set then set the created date
		await col.findOneAndUpdate({ _id: ObjectId(res.locals.guest._id) }, { $set: { responded: new Date() } });
	}

	res.status(204);
	res.send();
});

router.get('/all', checkAdmin, async (req, res) => {
	let guests = await col.find().toArray();
	res.send(guests);
});

router.post('/create', checkAdmin, async (req, res) => {
	let guest = {
		created: new Date(),
		info: {
			names: [],			// names of the invited perons
			partner: false,		// can the person bring a partner
			questions: [], 		// extra questions a person should answer
		},
	};

	do {
		//create a new code for our guest
		guest.info.code = crypto.randomBytes(4).toString('hex');
	} while (await col.findOne({ 'info.code': guest.info.code })); // repeat if the code happens to be in the database

	//insert in db
	let ret = await col.insertOne(guest);
	res.send(ret.ops[0]);
});

router.put('/:id', checkAdmin, async function (req, res, next) {
	if (req.body._id && req.body._id != req.params.id) {
		res.status(400);
		res.send('body and url id mismatch');
		return;
	}

	delete req.body._id;
	//trust client to insert correct data
	let ret = await col.findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: { info: req.body } }, { returnOriginal: false });
	res.send(ret.value);
});

router.delete('/:id', checkAdmin, async function (req, res, next) {
	await col.deleteOne({ _id: ObjectId(req.params.id) });
	res.status(204);
	res.send();
});

module.exports = router;
