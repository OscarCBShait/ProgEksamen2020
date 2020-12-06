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
    
    var brugernavn = req.body.username;
    var password2 = req.body.password;

    if(password2 != "" && brugernavn != "") {
        mysqlcon.query("SELECT * FROM sys.users WHERE username = ? AND password = ?", [brugernavn, password2], function (error, results, fields) {
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
};


//logut exports laves nedenfor
exports.logout = function(req,res){
	var loggedin = req.session.loggedin;
	if (loggedin) { 
		req.session.destroy(); // req.session.destroy = destruerer vores session
	}
	res.redirect('/');
};

/*
//Logut routes fra hovedside til createUser (dette er den tidligere logout, som jeg ønsker at gemme)
server.get("/logout", function(req, res) {
    // req.session.destroy = destruerer vores session
    req.session.destroy();
    res.redirect("/");
})*/