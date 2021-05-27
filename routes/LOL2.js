const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var User = require("./bean/user");


let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user"
});

router.get('/', function (req, res) {
  connection.query("select * from article ORDER BY id DESC", function (err, results, fields) {
    res.render('LOL2', {
      data: results
    })
  })
});




module.exports = router;
