const e = require('express');
var express = require('express');
var router = express.Router();
var name = require("./xdminlogo");
var mysql = require("mysql");
const article = require('./bean/article');


let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "user",
  timezone:"SYSTEM"
});


//添加
router.get('/add', function(req, res, next) {
  res.render('insert');
});

router.post('/add', (req, res) => {
  let Article = new article(req.body.title,req.body.name,req.body.content,req.body.img)
  connection.query("insert into article(title,name,content,img) value(?,?,?,?)", [Article.title,Article.name, Article.content,Article.img], (err, result, fields) => {
    res.redirect('/xdmin')
  })
  
});

//查询
router.post('/find',function(req,res){
  let message = req.body.queryinput
  connection.query(`select * from article where title like '%${message}%'`,function(err,results) {
    let page=(req.query.page==undefined)? 0 : req.query.page;
       let startPage = page * 2;
      
       //从数据库获取数据，然后渲染到show页面
       let count = 'select count(*) as count from article';
       let sql = `select * from article order by(id) desc limit ${startPage},2`;
    

       connection.query(count,(err,result)=>{
         if(err) throw err;
           let countNum=result[0].count;
           console.log();
           connection.query(sql,(err,result)=>{
             if(err) throw err;
             console.log(result);
              res.render('xdmin',{
                data: results,
                count: countNum,
                page: page
              });
           })
       })
    // console.log(results);
    // res.render("xdmin",{data:results1})
  })
})

//删除
router.delete('/del/:id',(req,res) =>{
  let sql = `delete from article where id = ${req.params.id} `
  connection.query(sql,(err,results)=>{
    res.send('success')
  })
})

//更新
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

//分页
router.get('/',(req,res)=>{
       //获取get后面的page参数值； 没有page的参数值的时候，给它默认值0
       let page=(req.query.page==undefined)? 0 : req.query.page;
       let startPage = page * 2;
      
       //从数据库获取数据，然后渲染到show页面
       let count = 'select count(*) as count from article';
       let sql = `select * from article order by(id) desc limit ${startPage},2`;
    

       connection.query(count,(err,result)=>{
         if(err) throw err;
           let countNum=result[0].count;
           console.log();
           connection.query(sql,(err,result)=>{
             if(err) throw err;
             console.log(result);
              res.render('xdmin',{
                data: result,
                count: countNum,
                page: page
              });
           })
       })
     })

module.exports = router;