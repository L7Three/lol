var express = require('express');
var router = express.Router();

var mysql = require("mysql");

const Score = require('./bean/texts');


let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user"
});


router.get('/add', function(req, res, next) {
  res.render('insert');
});

router.get('/', function (req, res) {
  connection.query("select * from article ORDER BY id DESC", function (err, results, fields) {
    res.render('xdmin', {
      data: results
    })
  })
});

router.post('/add', (req, res) => {

  let score = new Score(req.body.title, req.body.name, req.body.content)
  connection.query("insert into article(title,name,content) value(?,?,?)", [score.title, score.name, score.content], (err, result, fields) => {
    res.redirect('/xdmin')
  })
});

router.post('/find/:message',function(req,res){
  let message = req.params.message
  connection.query(`select * from article where title like '%${message}%'`,function(err,results) {
    console.log(results);
    res.send(results);
  })
})

router.delete('/del/:id',(req,res) =>{
  let sql = `delete from article where id = ${req.params.id} `
  connection.query(sql,(err,results)=>{
    res.send('success')
  })
})

module.exports = router;
