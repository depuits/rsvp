const router = require('express').Router();
const rateLimit = require("express-rate-limit");

const responseLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // half hour window
    max: 20, // start blocking after 20 requests
});

// mount our routes onto the API router
router.use('/shedule', require('./shedule'));
router.use('/history', require('./history'));
router.use('/response', responseLimiter, require('./response'));

module.exports = router;
