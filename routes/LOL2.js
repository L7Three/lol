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
  console.log(req.session.user);
  if(req.session.user){
    connection.query("select * from article ORDER BY id DESC", function (err, results, fields) {
      res.render('LOL3', {
        data: results,
        n : req.session.user
      })
    })
  }else{
    connection.query("select * from article ORDER BY id DESC", function (err, results, fields) {
      res.render('LOL2', {
        data: results
      })
    })
  }
});

router.get("/ind",function(req,res){
  connection.query("select * from article ORDER BY id DESC", function (err, results, fields) {
    res.render('LOL2', {
      data: results
    })
  })
})

router.get('/details/:id', (req, res) => {
  let sqlStr = `SELECT * FROM article WHERE ID ="${req.params.id}" `
    connection.query(sqlStr, (err, result) => {
      if (err) throw err;
      console.log(result);
      connection.query(`select * from newscomment  where content_id ="${req.params.id}" ORDER BY id DESC`, function (err, results, fields) {
        if(err) throw err;
        console.log(results);
        res.render('details', {
          data: result,
          datas: results,
          id:req.params.id
        })
      })
  })
})

router.post('/details/:id/add', (req, res) => {
  let id = req.body.id
  let co = new comment(req.body.name, req.body.comment)
  connection.query("insert into newscomment(name,comment,content_id) value(?,?,?)", [req.session.user, co.comment,id], (err, result, fields) => {
    res.redirect('/details/'+id)
  })
});

module.exports = router;
