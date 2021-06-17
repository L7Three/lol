const e = require('express');
var express = require('express');
var router = express.Router();
var name = require("./xdminlogo");
var mysql = require("mysql");
var moment = require('moment');
const article = require('./bean/article');


let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user",
  timezone:"SYSTEM"
});

router.get('/', function(req, res) {
   let sql = 'select * from article ORDER BY id DESC';
         connection.query(sql,(err,result)=>{
           if(err) throw err;
           console.log(result);
            res.render('xdmin',{data: result});
         })
});

//添加
router.get('/add', function(req, res, next) {
  res.render('insert');
});

router.post('/add', (req, res) => {
  var current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  let Article = new article(req.body.title,req.body.name,req.body.content,req.body.img)
  connection.query("insert into article(title,name,content,img,time) value(?,?,?,?,?)", [Article.title,Article.name, Article.content,Article.img,current_time], (err, result, fields) => {
    res.redirect('/xdmin')
  })
  
});

//查询
router.post('/find',function(req,res){
  let message = req.body.queryinput;
  connection.query(`select * from article where title like '%${message}%'`,function(err,results) {
    res.render('xdmin',{
      data: results
    })
})
})


//删除
router.delete('/del/:id',(req,res) =>{
  let sql = `delete from article where id = ${req.params.id} `
  connection.query(sql,(err,results)=>{
    res.send('success')
  })
})

//修改
router.get('/update/:id', (req, res) => {
  let sqlStr = `SELECT * FROM article WHERE ID ="${req.params.id}" `
    connection.query(sqlStr, (err, result) => {
      if (err) throw err;                                                                                                                                               
      res.render("update", { data: result })
  })
})

router.post('/update/:id', (req, res) => {
  var current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  let user = {
      'title': req.body.title,
      'name': req.body.name,
      'content': req.body.content,
      'img':req.body.img
  }
  let sqlStr = `delete from article where id = ${req.params.id}`
  connection.query(sqlStr, (err, result) => {
    if(err) throw err;
      let sqlStr1 = `INSERT INTO article(id,title,name,content,img,time) VALUES('${req.params.id}','${user.title}','${user.name}','${user.content}','${user.img}','${current_time}')`
      connection.query(sqlStr1, (err, result) => {
    if(err) throw err;
      res.redirect('/xdmin')
      })
  })
})

module.exports = router; 