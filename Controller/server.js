//Vi anvender express-pakken fra NPM
const express = require("express");
//Vi anvender cors-pakken fra NPM
const cors = require("cors");
//Her anvender vi express application og putter den ind i vores "server"-variable
const server = express();

//Vi anvender express-session-modulet fra NPM
var session = require("express-session"); // session gemmer information i server-side

//Vi anvender body-parser pakken fr NPM. Body-paser er en middleware, som læser JSON, råtekst og URL
var bodyParser = require("body-parser");

//Vi anvender path-modulet fra NPM
var path = require("path");

//Vi bruger mysql-modulet fra NPM
var mysql = require("mysql");


//Setting up connection to mysql
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'rootroot',
    database : 'sys', 
});

//Checking if mysql connection is working
connection.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connected to db');
})
//Vi definerer her, at vi skal bruge session-modulet til at håndtere vores user-session
server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    insecureAuth : true
}));

//Her sikrer vi os, at vi parser urlencoded bodies. Vi transformerer urlencoded requests og sørger for, at vi kan læse alle former for værdier i stedet for kun strings
server.use(bodyParser.urlencoded({extended:true}));

//Her sikrer vi os, at vi kun parser JSON. Vi transformerer JSON input til JS-variable
server.use(bodyParser.json());

//Register routes
server.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '../../View/createUser.html')); 
});
server.post("/createUserPost", function(req, res) {
    var brugernavn = req.body.Brugernavn;
    var password2 = req.body.password;
    var email2 = req.body.email;
    var alder = req.body.Alder;
    var fornavn1 = req.body.fornavn;
    var efternavn1 = req.body.efternavn;
    var gender = req.body.Køn;

    //Vi konstruerer det array, som skal indsættes i vores mysql-database (skal defineres med curly brackets)
    var post = {username: brugernavn, password: password2, email: email2, age: alder, firstname: fornavn1, lastname: efternavn1, gender: gender};

    if(brugernavn != "" && password2 != "" && email2 != "" && alder != "" && fornavn1 != "" && efternavn1 != "" && gender != "") {
        connection.query("INSERT INTO sys.users SET ?", post, function (error, results, fields) {
           if(error) throw error;
           res.redirect("/hovedside");
        });
    } else {
        res.send({ping:'Error: missing information'});
    }

    
});

//Login routes
server.get("/loginside", function(req, res) {

    //Hvis vi er logget in skal vi redirectes til hovedsiden hver gang vi forsøger at tilgå loginsiden
    if(req.session.loggedin == true) {
        res.redirect("/hovedside");
    }
    res.sendFile(path.join(__dirname + '../../View/loginside.html'));
});
server.post("/loginUser", function(req, res) {
    
    var brugernavn = req.body.username;
    var password2 = req.body.password;

    if(password2 != "" && brugernavn != "") {
        connection.query("SELECT * FROM sys.users WHERE username = ? AND password = ?", [brugernavn, password2], function (error, results, fields) {
            if (error) throw error;

            if(results.length > 0) {
                req.session.loggedin = true;
                res.redirect("/hovedside");
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
    res.sendFile(path.join(__dirname + '../../View/hovedside.html'));
    }
    else {
        res.redirect('/');
    }
});

//Logut routes fra hovedside til createUser
server.get("/logout", function(req, res) {
    // req.session.destroy = destruerer vores session
    req.session.destroy();
    res.redirect("/");
})

//Matches routes
server.get("/matches.html", function(req, res) {
    res.sendFile(path.join(__dirname + '../../View/matches.html')); 
});

//Find matches routes
server.get("/findMatches.html", function(req, res) {
    res.sendFile(path.join(__dirname + '../../View/findMatches.html')); 

// her vælger vi hvilken data vi vil hente ud fra nedenstående sql-commands
/*connection.query('SELECT age FROM users', (err,rows, fields ) => {
    if(!err) 
    res.send(rows)
  });*/
});

server.get("/opdaterProfil.html", function(req, res) {
    res.sendFile(path.join(__dirname + '../../View/opdaterProfil.html')); 
});




//Vi gør brug af CORS-modulet
server.use(cors());

//Vi sætter porten til at være 3000, medmindre der allerede en eksisterer en konfigureret port, som vi kan tilgå
const port = process.env.PORT || 3000;

//Her tjekker vi om vores server virker --> hvis ja skal vi logge nedenstående og porten "3000"
server.listen(port, () => console.log(`Listening on port ${port}...`)); 
