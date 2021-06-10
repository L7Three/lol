var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var moment = require('moment');
const feedback = require('./bean/feedback');

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user",
  timezone:"SYSTEM"
});


router.get('/', function(req, res, next) {
  res.render('feedback');
});


router.post('/add', (req, res) => {
  var current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  let name = req.session.user
  let appeal = new feedback(req.body.content,req.body.img,req.body.contact)
  connection.query("insert into feedback(content,img,name,contact,time) value(?,?,?,?,?)", [appeal.content,appeal.img,name,appeal.contact,current_time], (err, result, fields) => {
    res.redirect('/')
  })
});


module.exports = router;