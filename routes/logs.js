var express = require('express');
var router = express.Router();
var mysql = require("mysql");


let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user"
});

router.get('/', function (req, res) {
  connection.query("select * from log ORDER BY id DESC", function (err, results, fields) {
    if(err) throw err;
    console.log(results);
    res.render('logs', {
      data: results
    })
  })
});
