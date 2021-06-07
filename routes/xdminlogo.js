const { render } = require('ejs');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var User = require("./bean/user");
var md5 = require("md5");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "user"
});

router.get('/', function (req, res, next) {
    res.render('xdminlogo');
});

router.post("/login", function (req, res) {
    let name = req.body.name;
    let pass1 = req.body.password;
    let pass = md5(pass1);
    let query = 'select name,pass from admin where name ="' + name + '" and pass = "' + pass + '"'
    connection.query(query, (err, results, fidelds) => {
        var v = results[0];
        if (!v) {
            res.json({ "status": -1 });
        } else {
            res.json({ "status": 1 });
            req.session.user=v.name;
            router.nam = v.name;
        }
    })
});

router.post("/regist", function (req, res) {
    let pass1=req.body.password;
    let pass=md5(pass1);
    let user = new User(req.body.name, pass);
    let query = 'insert admin (name,pass) values("' + user.name + '","' + user.password + '")'
    connection.query(query, (err, results, fidelds) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.send("success")
        }
    })
})

module.exports = router;

