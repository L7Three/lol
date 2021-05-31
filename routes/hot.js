var express = require('express');
var router = express.Router();
var mysql = require("mysql");
const Score = require('./bean/texts');

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user",
  timezone:"SYSTEM"
});


router.get('/', function(req, res, next) {
  res.render('hot');
});


router.post('/add', (req, res) => {
    let score = new Score(req.body.title, req.body.name, req.body.content)
    connection.query("insert into article(title,name,content) value(?,?,?)", [score.title, score.name, score.content], (err, result, fields) => {
      res.redirect('/news')
    })
  });


module.exports = router;
