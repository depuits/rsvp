const router = require('express').Router();
const mongo = require('../lib/mongoUtil');
const ObjectId = require('mongodb').ObjectID;
const db = mongo.getDb();
const col = db.collection('shedule');

router.get('/', async function(req, res, next) {
	let data = await col.find().toArray();
	/*{
		date: new Date(2019, 8, 23),
		events: [
			{
				name: 'events.law',
				icon: '',
				start: new Date(2019, 8, 23, 15, 15),
				end: new Date(2019, 8, 23, 15, 30),
				location: 'address comes here',
				mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d627.0449197124369!2d3.7043862009425705!3d51.04977001097552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3716f0844a715%3A0xe5065b582571067!2zNTHCsDAyJzU4LjQiTiAzwrA0MicxOC4xIkU!5e0!3m2!1sen!2sbe!4v1548686687811',
			},
			{
				name: 'events.church',
				icon: '',
				start: new Date(2019, 8, 23, 15, 45),
				end: new Date(2019, 8, 23, 16, 30),
				location: 'address comes here',
				mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d627.0449197124369!2d3.7043862009425705!3d51.04977001097552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3716f0844a715%3A0xe5065b582571067!2zNTHCsDAyJzU4LjQiTiAzwrA0MicxOC4xIkU!5e0!3m2!1sen!2sbe!4v1548686687811',
			},
			{
				name: 'events.reception',
				icon: '',
				start: new Date(2019, 8, 23, 15, 45),
				end: new Date(2019, 8, 23, 16, 30),
				location: 'address comes here',
				mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d627.0449197124369!2d3.7043862009425705!3d51.04977001097552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3716f0844a715%3A0xe5065b582571067!2zNTHCsDAyJzU4LjQiTiAzwrA0MicxOC4xIkU!5e0!3m2!1sen!2sbe!4v1548686687811',
			},
			{
				name: 'events.diner',
				icon: '',
				start: new Date(2019, 8, 23, 15, 45),
				end: new Date(2019, 8, 23, 16, 30),
				location: 'address comes here',
				mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d627.0449197124369!2d3.7043862009425705!3d51.04977001097552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3716f0844a715%3A0xe5065b582571067!2zNTHCsDAyJzU4LjQiTiAzwrA0MicxOC4xIkU!5e0!3m2!1sen!2sbe!4v1548686687811',
			},
			{
				name: 'events.party',
				icon: '',
				start: new Date(2019, 8, 23, 15, 45),
				end: new Date(2019, 8, 23, 16, 30),
				location: 'address comes here',
				mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d627.0449197124369!2d3.7043862009425705!3d51.04977001097552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3716f0844a715%3A0xe5065b582571067!2zNTHCsDAyJzU4LjQiTiAzwrA0MicxOC4xIkU!5e0!3m2!1sen!2sbe!4v1548686687811',
			},
		],
	}*/

	res.send(data);
});

router.get('/date', async function(req, res, next) {
	res.send(new Date(2019, 8, 23));
});

router.post('/', async function (req, res, next) {
	//trust client to insert correct data
	let ret = await col.insertOne(req.body);
	res.send(ret.ops[0]);
});

router.put('/:id', async function (req, res, next) {
	if (req.body._id && req.body._id != req.params.id) {
		res.status(400);
		res.send('body and url id mismatch');
		return;
	}

	delete req.body._id;
	//trust client to insert correct data
	let ret = await col.findOneAndUpdate({ _id: ObjectId(req.params.id) }, { $set: req.body });
	res.send(ret.value);
});

router.delete('/:id', async function (req, res, next) {
	await col.deleteOne({ _id: ObjectId(req.params.id) });
	res.status(204);
	res.send();
});

module.exports = router;
