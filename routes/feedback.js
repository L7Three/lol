var express = require('express');
var router = express.Router();
var mysql = require("mysql");
const feedback = require('./bean/feedback');

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user"
});


router.get('/', function(req, res, next) {
  res.render('feedback');
});


router.post('/add', (req, res) => {
  let appeal = new feedback(req.body.content, req.body.name)
  connection.query("insert into feedback (content,name) value(?,?)", [appeal.content, appeal.name], (err, result, fields) => {
    res.redirect('/')
  })
});


module.exports = router;