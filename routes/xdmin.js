var express = require('express');
var router = express.Router();

var mysql = require("mysql");

const Score = require('./bean/texts');


let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user"
});


router.get('/add', function(req, res, next) {
  res.render('insert');
});

// router.get('/', function(req, res, next) {
//   res.render('xdmin');
// });

router.get('/', function (req, res) {
  connection.query("select * from article ", function (err, results, fields) {
    res.render('xdmin', {
      data: results
    });

  })
});

router.post('/add', (req, res) => {

  let score = new Score(req.body.title, req.body.name, req.body.content)
  connection.query("insert into article(title,name,content) value(?,?,?)", [score.title, score.name, score.content], (err, result, fields) => {
    res.redirect('/xdmin')
  })

})

module.exports = router;
