//Vi anvender path-modulet fra NPM -- dette modul er et effektivt redskab, når man skal arbejde med directories og stier til filer
var path = require("path");

// her vælger vi at hente vores db config for at kunne lave mysql commands
// samtidig skaber vi vores connection
var config = require('../dbConfig.js');
var mysqlcon = config.connection;


//export (GET-request), der tillader at vi kan tilgå vores findMatches side
// render anvendes til ejs-filer = hvis man anvender sendFile, sender den filen til din computer som du kan downloade
/*exports.findMatch_get = function(req, res) {
    res.render(path.join(__dirname + '../../views/findMatches.ejs')); //__dirname returnerer stien til denne fil og path.join sammensætter de to stier
};*/

//export (GET-request) , der tillader at vi kan se vores matches
// render anvendes til ejs-filer = hvis man anvender sendFile, sender den filen til din computer som du kan downloade
exports.seMatches_get = function(req, res) {
    res.render(path.join(__dirname + '../../views/matches.ejs')); //__dirname returnerer stien til denne fil og path.join sammensætter de to stier
};


/**
 * SHOW ALL USERS
 */

exports.show_all_get = function(req, res) {
   if(req.session.loggedIn == true) {
         mysqlcon.query('SELECT * FROM sys.users', function(error, results, fields){
            if(results){
                console.log(results)
               res.json(results)

            }
            console.log('virker')
         })
   }
}



/**
 * VIEW MATCHES
 */

//export (GET-request) , der tillader at vi kan se vores matches
// render anvendes til ejs-filer = hvis man anvender sendFile, sender den filen til din computer som du kan downloade 
exports.matches_get = function(req, res) {
    res.render(path.join(__dirname + '../../views/matches.ejs')); //__dirname returnerer stien til denne fil og path.join sammensætter de to stier
 };


/**
 * FIND MATCHES BY LIKING OR DISKLING
 */


exports.findmatches_get = (req, res) =>{
    
   mysqlcon.query("SELECT * FROM sys.users WHERE username = ? AND password = ?", [req.session.username, req.session.password], function (error, results, fields) {
      if (error) throw error; 
      if(results.length == 0) {
          res.redirect('/login');
      }
   });
console.log(req.session.user.id);
   mysqlcon.query('SELECT * FROM users WHERE interested_in = ? AND gender = ?; SELECT * FROM matches WHERE user_id = ? OR match_user_id = ?', [req.session.user.gender, req.session.user.interested_in, req.session.user.id, req.session.user.id], function(err, results, fields ) {
     if(!err) {
         var users = results[0];
         var matches = results[0];

         console.log(users);

         users.forEach(function(user_temp) {
            var is_a_match_check = 0;
            matches.forEach(function(match) {
               if(user_temp.id == match.user_id && req.session.user.id == match.match_user_id) {
                  if(match.is_a_match == 1) {
                     is_a_match_check = 1;
                  }
               }

               

               if(req.session.user.id == match.user_id && user_temp.id == match.match_user_id) {
                  if(match.is_a_match == 1) {
                     is_a_match_check = 1;
                  }
               }
            })

            if(is_a_match_check == 1) {
               user_temp.is_a_match = true;
            } else {
               user_temp.is_a_match = false;
            }
         })

         console.log(users);

        res.render(path.join(__dirname + '/../views/findMatches'), {
           usersInFile: users
        });
     }
  }); 

};

//  connection.query('SELECT * FROM users WHERE interested_in = ?', [req.session.gender], function(err,rows, fields ) {
//     if(!err) {
//        var ages = rows;
//        res.render(path.join(__dirname + '/view/findMatches'), {
//           agesInFile: ages
//        });
//     }
//  });    
//  is this supposed to be a get function?!
exports.findmatches_post = function(req, res) {
    var matchUserId = req.params.id;
    var matchUserName = req.params.name;
 
    mysqlcon.query("SELECT * FROM sys.users WHERE username = ? AND password = ?", [req.session.username, req.session.password], function (error, results, fields) {
       if (error) throw error; 
       if(results.length > 0) {
           var user = results[0];
       }
 
  
   })
 
 }
