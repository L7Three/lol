const { render } = require('ejs');
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
  connection.query("select * from article ORDER BY id DESC", function (err, results, fields) {
    res.render('LOL2', {
      data: results
    })
  })
});


router.get('/details/:id', (req, res) => {
  let sqlStr = `SELECT * FROM article WHERE ID ="${req.params.id}" `
    connection.query(sqlStr, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.render("details", { data: result })
  })
})


module.exports = router;
