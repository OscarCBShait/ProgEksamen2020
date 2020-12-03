//Vi anvender express-pakken fra NPM
const express = require("express");

//Vi anvender cors-pakken fra NPM
const cors = require("cors");

//Her anvender vi express application og putter den ind i vores "server"-variable
const server = express();

//Vi anvender express-session-modulet fra NPM
var session = require("express-session"); // session gemmer information i server-side

//Vi anvender body-parser pakken fr NPM. Body-paser er en middleware, som læser JSON, og kan transformere det indtil den tidligere "datatype"
var bodyParser = require("body-parser");

//Vi anvender path-modulet fra NPM -- dette modul er et effektivt redskab, når man skal arbejde med directories og stier til filer
var path = require("path");

// her anvender vi require til at hente vores class user fra class.js
var user = require("../Controller/class")

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


//Her registrerer vi vores body-parser middleware så vi kan arbejde med de forms, som vi har oprettet
server.use(bodyParser.urlencoded({extended:true}));

// Body-parser sørger for, at vi kan få adgang til data, fordi den tjekker om det er JSON-fil
server.use(bodyParser.json());


//Register routes = altså vores main route
server.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '../../View/createUser.html')); //__dirname returnerer stien til denne fil og path.join sammensætter de to stier
});

// post anvendes fordi vi ønsker at sende data til en server, der opretter/opdager en ressource
server.post("/createUserPost", function(req, res) {
    // her initialisere vi vores class
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
        connection.query("INSERT INTO sys.users SET ?", [opretBruger], function (error, results, fields) {
        if(error) throw error;
        req.session.loggedin = true;
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

// Her sørger vi for, at man ikke kan tilgå "hovedside", hvis man ikke er logget ind
server.get("/hovedside", function(req, res) {
    if(req.session.loggedin == true) {
    res.sendFile(path.join(__dirname + '../../View/hovedside.html'));
    }
    else {
        res.redirect('/');
    }
});

// Her sørger vi for, at man ikke kan tilgå "opdaterProfil", hvis man ikke er logget ind
server.get("/opdaterProfil.html", function(req, res) {
    if(req.session.loggedin == true) {
    res.sendFile(path.join(__dirname + '../../View/opdaterProfil.html'));
    }
    else {
        res.redirect('/');
    }
});

// Her sørger vi for, at man ikke kan tilgå "matches", hvis man ikke er logget ind
server.get("/matches", function(req, res) {
    if(req.session.loggedin == true) {
    res.sendFile(path.join(__dirname + '../../View/matches.ejs'));
    }
    else {
        res.redirect('/');
    }
});

// Her sørger vi for, at man ikke kan tilgå "findMatches", hvis man ikke er logget ind
server.get("/findMatches", function(req, res) {
    if(req.session.loggedin == true) {
    res.sendFile(path.join(__dirname + '../../View/findMatches.ejs'));
    }
    else {
        res.redirect('/');
    }
});

// Her sørger vi for, at man ikke kan tilgå "deleteUser", hvis man ikke er logget ind
server.get("/deleteUser.html", function(req, res) {
    if(req.session.loggedin == true) {
    res.sendFile(path.join(__dirname + '../../View/deleteUser.html'));
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
server.get("/matches.ejs", function(req, res) {
    res.sendFile(path.join(__dirname + '../../View/matches.ejs')); 
});


 //res.sendFile(path.join(__dirname + '../../View/findMatches.html'));
//Find matches routes
server.get("/findMatches.ejs", function(req, res) {
    res.sendFile(path.join(__dirname + '../../View/findMatches.ejs')); 
    });

  

 
    


// Opdater profil route
server.get("/opdaterProfil.html", function(req, res) {
    res.sendFile(path.join(__dirname + '../../View/opdaterProfil.html')); 
});

// post anvendes fordi vi ønsker at sende data til en server, der opretter/opdager en ressource
server.post("/updateUser", function(req, res) { 
    var brugernavn = req.body.Brugernavn;
    var password2 = req.body.password;
    var email2 = req.body.email;
    var alder = req.body.Alder;
    var fornavn1 = req.body.fornavn;
    var efternavn1 = req.body.efternavn;
    var gender = req.body.Køn;
    var bio1 = req.body.Bio;

    if(req.session.loggedin == true)  {
        connection.query("UPDATE sys.users SET email = ?, age = ?, firstname = ?, lastname = ?, gender = ?, bio = ? WHERE username = ? AND password = ?", [email2, alder, fornavn1, efternavn1, gender, bio1, brugernavn, password2], function (error, results, fields) {
           if(error) throw error;
           res.redirect("/hovedside");

        });
    } else {
        res.send({ping:'Error: missing information'});
    }  
});

// Forsøg på at slette bruger routes
server.get("/deleteUser.html", function(req, res) {
    res.sendFile(path.join(__dirname + '../../View/deleteUser.html')); 
});

// post anvendes fordi vi ønsker at sende data til en server, der opretter/opdager en ressource
server.post("/deleteUser", function(req, res) {
    var brugernavn3 = req.body.Brugernavn;
    var password2 = req.body.password;
    // Hvis password og brugernavn ikke er tomt skal de køre nedenstående
    // Vores mysql commands indikerer, at den skal finde hvor username og password matcher i mysql og dernæst efter slette den kolonne
    if(brugernavn3 != "" && password2 != "" ) {
        connection.query("DELETE FROM sys.users WHERE username = ? AND password = ?", [brugernavn3, password2], function (error, results, fields) {
           if(error) throw error;
          res.redirect("/");
        });
    } else {
        res.send({ping:'Indtast de rette oplysninger for at slette bruger'});
    }    
});



//Vi gør brug af CORS-modulet
server.use(cors());

//Vi sætter porten til at være 3000, medmindre der allerede eksisterer en konfigureret port, som vi kan tilgå
const port = process.env.PORT || 3000;

//Her tjekker vi om vores server virker --> hvis ja skal vi logge nedenstående og porten "3000"
server.listen(port, () => console.log(`Listening on port ${port}...`)); 
