const router = require('express').Router();

// mount our routes onto the API router
router.use('/shedule', require('./shedule'));
router.use('/history', require('./history'));
router.use('/response', require('./response'));

module.exports = router;
