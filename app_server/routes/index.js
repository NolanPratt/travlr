var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET Homepage */
router.get('/', ctrlMain.index);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
