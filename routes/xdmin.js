const e = require('express');
var express = require('express');
var router = express.Router();
var name = require("./xdminlogo");
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



router.get('/', function (req, res) {
  console.log(name.nam);
  if(name.nam){
    connection.query("select * from article ORDER BY id DESC", function (err, results, fields) {
      res.render('xdmin1', {
        data: results,
        n: name.nam
      })
    })
  }else{
    connection.query("select * from article ORDER BY id DESC", function (err, results, fields) {
      res.render('xdmin', {
        data: results
      })
    })
  }
});


router.get('/add', function(req, res, next) {
  res.render('insert');
});

router.post('/add', (req, res) => {
  console.log(11);
  console.log("成为"+name.nam);
  let names = name.nam
  let score = new Score(req.body.title,req.body.content,req.body.img)
  connection.query("insert into article(title,name,content,img) value(?,?,?,?)", [score.title,names, score.content,score.img], (err, result, fields) => {
    res.redirect('/xdmin')
  })
});

router.post('/find',function(req,res){
  let message = req.body.queryinput
  connection.query(`select * from article where title like '%${message}%'`,function(err,results) {
    console.log(results);
    res.render("xdmin",{data:results})
  })
})

router.delete('/del/:id',(req,res) =>{
  let sql = `delete from article where id = ${req.params.id} `
  connection.query(sql,(err,results)=>{
    res.send('success')
  })
})

router.get('/update/:id', (req, res) => {
  let sqlStr = `SELECT * FROM article WHERE ID ="${req.params.id}" `
    connection.query(sqlStr, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.render("update", { data: result })
  })
})

router.post('/update/:id', (req, res) => {
  let user = {
      'title': req.body.title,
      'name': req.body.name,
      'content': req.body.content,
      'img':req.body.img
  }
  let sqlStr = `delete from article where id = ${req.params.id}`
  connection.query(sqlStr, (err, result) => {
    if(err) throw err;
      let sqlStr1 = `INSERT INTO article(id,title,name,content,img) VALUES('${req.params.id}','${user.title}','${user.name}','${user.content}','${user.img}')`
      connection.query(sqlStr1, (err, result) => {
        if(err) throw err;
          res.redirect('/xdmin')
      })
  })
})

module.exports = router;