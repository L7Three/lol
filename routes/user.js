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
  connection.query("select * from tab_lol ORDER BY id DESC", function (err, results, fields) {
    if(err) throw err;
    console.log(results);
    res.render('user', {
      data: results
    })
  })
});

router.delete('/del/:id',(req,res) =>{
  let sql = `delete from tab_lol where id = ${req.params.id} `
  connection.query(sql,(err,results)=>{
    res.send('success')
  })
})

module.exports = router;
