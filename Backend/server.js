const express = require("express");
const cors = require("cors");
const server = express();
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'rootroot',
    database : 'sys', 
    insecureAuth : true
});

//Checking if mysql connection is working
connection.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connected to db');
})

server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

//Register routes
server.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '../../Frontend/frontend.html'));
});
server.post("/createUserPost", function(req, res) {
    var email2 = req.body.email;
    var password2 = req.body.password;
    var brugernavn = req.body.Brugernavn;

    var post = {username: brugernavn, password: password2, email: email2};

    if(email2 != "" && password2 != "" && brugernavn != "") {
        connection.query("INSERT INTO sys.users SET ?", post, function (error, results, fields) {
            if (error) throw error;
            res.redirect("/hovedside")
        });
    } else {
        res.send({ping:'Error: missing information'});
    }

    
});

//Login routes
server.get("/loginside", function(req, res) {
    if(req.session.loggedin == true) {
        res.redirect("/hovedside");
    }
    res.sendFile(path.join(__dirname + '../../Frontend/loginside.html'));
});
server.post("/loginUser", function(req, res) {
    
    var brugernavn = req.body.username;
    var password2 = req.body.password;

    if(password2 != "" && brugernavn != "") {
        connection.query("SELECT * FROM sys.users WHERE username = ? AND password = ?", [brugernavn, password2], function (error, results, fields) {
            if (error) throw error;

            if(results.length > 0) {
                req.session.loggedin = true;
                res.redirect("/hovedside")
            } else {
                res.redirect("/loginside");
                console.log('Credentials not true');
            }

            
        });
    } else {
        res.send({ping:'Error: missing information'});
    }

});

server.get("/hovedside", function(req, res) {
    if(req.session.loggedin == true) {
    res.sendFile(path.join(__dirname + '../../Frontend/hovedside.html'));
    }
    else {
        res.redirect('/');
    }
});

server.use(cors());
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}...`));

const ArrayUser = require("../Backend/class.js");
