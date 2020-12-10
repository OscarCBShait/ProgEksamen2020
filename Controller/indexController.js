//Vi anvender path-modulet fra NPM -- dette modul er et effektivt redskab, når man skal arbejde med directories og stier til filer
var path = require('path');

// her vælger vi at hente vores db config for at kunne lave mysql commands
// samtidig skaber vi vores connection
var config = require('../dbConfig.js');
var mysqlcon = config.connection;


//bliv henvist til hovedsiden
exports.hovedside_get = function (req, res) {
    res.sendFile(path.join(__dirname + '../../views/hovedside.html')); //__dirname returnerer stien til denne fil og path.join sammensætter de to stier
}

//Login routes
// hvis vi er logget ind - komemr vi videre til hovedside og ellers skal vi logge ind
exports.login_get = function(req, res) {

    //Hvis vi er logget in skal vi redirectes til hovedsiden hver gang vi forsøger at tilgå loginsiden
    if(req.session.loggedin == true) {
        res.redirect("/hovedside");
    }
    res.sendFile(path.join(__dirname + '../../views/loginside.html'));
};
//her laves vores exports POST 
exports.login_post = function(req, res) {
    
    // vi anvender req.body som henter vde pågældende informationer fra vores den log ind form, som vi har lavet
    var brugernavn = req.body.username;
    var password2 = req.body.password;
    
    //Hvis password og brugernavn er udfyldt, skal den eksekvere nedenstående
    //Nedenstående query tjekker om der findes en bruger med det brugernavn og password i mysql
    // hvis det passer, skal vi videreføres til hovedsiden
    // hvis ikke, bliver vi redirected til samme login-side for at prøve igen
    if(password2 != "" && brugernavn != "") {
        mysqlcon.query("SELECT * FROM sys.users WHERE username = ? AND password = ?", [brugernavn, password2], function (error, results, fields) {
          if(results.length > 0) {
                req.session.user = results[0];
                req.session.loggedin = true;
                res.redirect("/hovedside");
            } else {
                res.redirect("/loginUser");
                console.log('Forkert brugernavn eller password');       
            } 
        });
}};


//logut exports laves nedenfor
exports.logout = function(req,res){
	req.session.destroy(); // req.session.destroy = destruerer vores session
	res.redirect('/');
};
