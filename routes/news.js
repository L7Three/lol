const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user",
  timezone:"SYSTEM"
});

router.get('/', function (req, res) {
  connection.query("select * from news ORDER BY id DESC", function (err, results, fields) {
    res.render('news', {
      data: results
    })
  })
});





module.exports = router;
