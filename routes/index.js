const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var User = require(".//bean/user");
var md5 = require("md5");
var moment = require('moment');
var sendemail = require('../eamil');


let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "user",
    timezone: "SYSTEM"
});


router.get('/', function (req, res, next) {
    res.render('index');
});

router.put('/:id', (req, res) => {
    let code = sendemail(req.params.id)
    req.session.code = code;
    res.send("success")
})

router.post("/login", function (req, res) {
    let name = req.body.name;
    let pass1 = req.body.password;
    let pass = md5(pass1);
    let query = 'select name,pass from tab_lol where name ="' + name + '" and pass = "' + pass + '"'
    connection.query(query, (err, results, fidelds) => {
        var v = results[0];
        if (!v) {
            res.json({ "status": -1 });
        } else {
            req.session.user = v.name;
            req.session.userq = v.name;
            res.json({ "status": 1 });
        }
    })
});


router.post("/regist", function (req, res) {
    var current_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    let pass1 = req.body.password;
    let pass = md5(pass1);
    let user = new User(req.body.name, pass);
    let code = req.session.code;
    if(code == req.session.code){
           let query = 'insert tab_lol (name,pass,regist_time) values("' + user.name + '","' + user.password + '","' + current_time + '")'
            connection.query(query, (err, results, fidelds) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.send("success");
                }
            })
        }else {
            
        }
})

module.exports = router;
