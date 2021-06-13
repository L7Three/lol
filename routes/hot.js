var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var moment = require('moment');
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
  var current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  let name = req.session.user;
  let score = new Score(req.body.title,req.body.content,req.body.img)
    if(req.session.user == undefined){
      res.send("1")
    }else{
      connection.query("insert into article(title,name,content,img,time) value(?,?,?,?,?)", [score.title,name, score.content,score.img,current_time], (err, result, fields) => {
        res.send("2")
      })
    }
  });
  
module.exports = router;
