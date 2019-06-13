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

const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');

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

router.post('/print', checkAdmin, async function (req, res, next) {
	let guests = [];
	for(let c of req.body) {
		let g = await col.findOne({ 'info.code': c });
		if (g) {
			guests.push(g);
		}
	}

	const baseSvg = await fs.readFileAsync(path.join(__dirname, '../data/codeTemplate.svg'), 'UTF8');

	// create pdf doc and add first page
	let doc = new PDFDocument({ autoFirstPage: false });

	const fontName = 'FunnyDuck';
	const fontPath = path.join(__dirname, '../data/fonts/FunnyDuck.ttf')
	doc.registerFont(fontName, fontPath);

	let pageWidth = 595;
	let pageHeight = 842;

	let cardWidth = 240;
	let cardHeight = 156;

	doc.addPage({ compress: true, size: [pageWidth, pageHeight] });

	let cols = Math.floor(pageWidth / cardWidth);
	let rows = Math.floor (pageHeight / cardHeight);

	let marginX = (pageWidth - (cols * cardWidth)) / 2;
	let marginY = (pageHeight - (rows * cardHeight)) / 2;

	let currentCol = 0;
	let currentRow = 0;

	for (let g of guests) {
		let svg = baseSvg;
		// replace {code}
		svg = svg.replace('{code}', g.info.code.toUpperCase());

		// replace {names}
		let names = [];
		for (let n of g.info.names) {
			let nameParts = n.split(' ');
			let fn = (nameParts.length > 0) ? nameParts[0] : n;
			names.push(fn);
		}
		svg = svg.replace('{names}', names.join(', '));

		//determine svg position
		let x = cardWidth * currentCol + marginX;
		let y = cardHeight * currentRow + marginY;
		
		// render svg to pdf
		SVGtoPDF(doc, svg, x, y, {
			width: cardWidth,
			height: cardHeight,
			assumePt: true,
			preserveAspectRatio: 'xMidYMid slice',
			fontCallback: () => fontName,
		});

		//increase left to right then up down
		++currentCol;
		if (currentCol >= cols) {
			//if the columns loop then go to the next row and first column
			currentCol = 0;
			++currentRow;

			if (currentRow >= rows) {
				//if the columns loop then go back to the start and add a new page
				currentRow = 0;
				doc.addPage({ compress: true, size: [pageWidth, pageHeight] });
			}
		}
	}

	// return the pdf to the client
	res.setHeader('Content-type', 'application/pdf')
	doc.pipe(res);

	// enable this part to save the pdf on the server
	//stream = fs.createWriteStream('file.pdf');
	//doc.pipe(stream);

	doc.end();
});

module.exports = router;
