var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('hero');
});

module.exports = router;
