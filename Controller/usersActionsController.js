//Vi anvender path-modulet fra NPM -- dette modul er et effektivt redskab, når man skal arbejde med directories og stier til filer
var path = require("path");

// her anvender vi require til at hente vores class user fra class.js
var user = require("../Controller/class")

// her vælger vi at hente vores db config for at kunne lave mysql commands
// samtidig skaber vi vores connection
var config = require('../dbConfig.js');
var mysqlcon = config.connection;


//Register routes = altså vores main route
// denne route angiver vores usercreateform side
// exports sikrer, at vi kan eksportere det pågældende endpoint
// GET
exports.userCreate_get = function(req, res) {
    res.sendFile(path.join(__dirname + '../../views/createUser.html')); //__dirname returnerer stien til denne fil og path.join sammensætter de to stier
};

// post anvendes fordi vi ønsker at sende data til en server, der opretter/opdager en ressource
// exports sikrer, at vi kan eksportere vores post-request
// POST
exports.userCreate_post =  function(req, res) {
    // her initialiserer vi vores class
    let opretBruger = new user(
    brugernavn = req.body.Brugernavn,
    password2 = req.body.password,
    email2 = req.body.email,
    alder = req.body.Alder,
    fornavn1 = req.body.fornavn,
    efternavn1 = req.body.efternavn,
    gender = req.body.Køn,
    bio1 = req.body.Bio,
    );
    //Vi konstruerer det array, som skal indsættes i vores mysql-database (skal defineres med curly brackets)
    opretBruger =  {username: brugernavn, password: password2, email: email2, age: alder, firstname: fornavn1, lastname: efternavn1, gender: gender, bio: bio1};

    if(brugernavn != "" && password2 != "" && email2 != "" && alder != "" && fornavn1 != "" && efternavn1 != "" && gender != "" && bio1 != "") {
            mysqlcon.query("INSERT INTO sys.users SET ?", [opretBruger], function (error, results) {
            if(error){ 
                throw error;
            } else {
            req.session.loggedin = true;
            res.redirect("/hovedside");
            }
        });
    } else {
        res.send({ping:'Error: missing information'});
        res.end();
    }  
};

// Forsøg på at slette bruger routes
// her bruger vi exports til delete user (GET)
exports.userDelete_get = function(req, res) {
    res.sendFile(path.join(__dirname + '../../views/deleteUser.html')); 
};

// post anvendes fordi vi ønsker at sende data til en server, der opretter/opdager en ressource
// her anvendes exports til delete user (POST)
exports.userDelete_post = function(req, res) {
    var brugernavn3 = req.body.Brugernavn;
    var password2 = req.body.password;
    // Hvis password og brugernavn ikke er tomt skal de køre nedenstående
    // Vores mysql commands indikerer, at den skal finde hvor username og password matcher i mysql og dernæst efter slette den kolonne
    if(brugernavn3 != "" && password2 != "" ) {
        mysqlcon.query("DELETE FROM sys.users WHERE username = ? AND password = ?", [brugernavn3, password2], function (error, results, fields) {
           if(error) throw error;
          res.redirect("/");
        });
    } else {
        res.send({ping:'Indtast de rette oplysninger for at slette bruger'});
    }    
};


// Opdater profil route
// her bruger vi exports til opdater user (GET)
exports.userUpdate_get = function(req, res) {
    res.sendFile(path.join(__dirname + '../../views/opdaterProfil.html')); 
};

// post anvendes fordi vi ønsker at sende data til en server, der opretter/opdager en ressource
// her bruger vi exports til opdater user (POST)
exports.userUpdate_post = function(req, res) { 
    var brugernavn = req.body.Brugernavn;
    var password2 = req.body.password;
    var email2 = req.body.email;
    var alder = req.body.Alder;
    var fornavn1 = req.body.fornavn;
    var efternavn1 = req.body.efternavn;
    var gender = req.body.Køn;
    var bio1 = req.body.Bio;

    if(req.session.loggedin == true)  {
        mysqlcon.query("UPDATE sys.users SET email = ?, age = ?, firstname = ?, lastname = ?, gender = ?, bio = ? WHERE username = ? AND password = ?", [email2, alder, fornavn1, efternavn1, gender, bio1, brugernavn, password2], function (error, results, fields) {
           if(error) throw error;
           res.redirect("/hovedside");

        });
    } else {
        res.send({ping:'Error: missing information'});
    }  
};
