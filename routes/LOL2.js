const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var comment = require("./bean/comment");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user",
  timezone:"SYSTEM"
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
      connection.query("select * from comment ORDER BY id DESC", function (err, results, fields) {
        res.render('details', {
          data: result,
          datas: results
        })
      })
      // res.render("details", { data: result, })
  })
})

// router.get('/', function (req, res) {
//   connection.query("select * from comment ORDER BY id DESC", function (err, results, fields) {
//     res.render('comment', {
//       data: results
//     })
//   })
// });

router.post('/details/:id/add', (req, res) => {
  let co = new comment(req.body.name, req.body.comment)
  connection.query("insert into comment(name,comment) value(?,?)", [co.name, co.comment], (err, result, fields) => {
    res.redirect('/details/:id')
  })
});


module.exports = router;
