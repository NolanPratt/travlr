var express = require('express');
var router = express.Router();
const controller = require('../controllers/travel');

/* GET Travel Page */
router.get('/', controller.travel); // Returns /travel url route

module.exports = router;