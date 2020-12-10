//Vi anvender path-modulet fra NPM -- dette modul er et effektivt redskab, når man skal arbejde med directories og stier til filer
var path = require("path");

// her vælger vi at hente vores db config for at kunne lave mysql commands
// samtidig skaber vi vores connection
var config = require('../dbConfig.js');
var mysqlcon = config.connection;


// findmatches funktionen udføres nedenfor
exports.findmatches_get = (req, res) =>{
    
   
   // her vælger vi alle brugere, som ikke har det samme id, som den bruger, der er logget ind
   // måden det sker på at ved at tjekke id for den person, som ligger ind
   mysqlcon.query('SELECT * FROM sys.users WHERE NOT id = ?; SELECT * FROM matchlist WHERE user_id = ? OR match_user_id = ?;', [req.session.user.id, req.session.user.id, req.session.user.id], function(err, results, fields ) {
     if(!err) {
         var users = results[0]; // her stores vores users fra users tabellen
         var matches = results[1]; // her sørger vi for at vise, når der er et match
   
         // her anvender vi forEach metoden til at tjekke om der er et match ved hver bruger
         // vi kalder altså denne funktion for hver bruger for at vurdere om det er et match eller ej
         // vi bruger ligeledes forEach til at vise hver bruger inde på vores findMatches.ejs, hvor jeg har angivet funktionen
         //funktion her går altså vores brugere igennem, som vi henter fra vores db
         //er der et match mellem to brugere, anvendes funktonen til at vise det
         // hvis der ikke er et match, har brugeren mulighed for at like den anden
         users.forEach(function(user_temp) {
            var is_a_match_check = 0;
            user_temp.have_i_liked_this_user = false;
            matches.forEach(function(match) {
               // hvis vores id's passer til brugerne og det ses, at der er et match, skal vi vise det i vores view
               if(user_temp.id == match.user_id && req.session.user.id == match.match_user_id) {
                  if(match.is_a_match == 1) {
                     is_a_match_check = 1;
                  }
               }
                // hvis vores id's passer til brugerne og det ses, at der er et match, skal vi vise det i vores view
               if(req.session.user.id == match.user_id && user_temp.id == match.match_user_id) {
                  user_temp.have_i_liked_this_user = true;
                  if(match.is_a_match == 1) {
                     is_a_match_check = 1;
                  }
               }
            })
            // vi anvender 1 i vores matchlist tabel for at vise, at der er et match 
            if(is_a_match_check == 1) {
               user_temp.is_a_match = true;
            } else {
               user_temp.is_a_match = false;
            }
         })
        res.render(path.join(__dirname + '/../views/findMatches.ejs'), {
           usersInFile: users,
           
        });
     }
     else {
        throw err;
     }
  }); 

};

// nedenfor er angivet vores like funktion
exports.makematch = function(req, res) {
   // først finder vi den user, som er logget ind ved at efterspørge det pågældende id
   function getUser(callback) {
      mysqlcon.query('SELECT * FROM sys.users WHERE id = ?', [req.session.user.id], function (error, results, fields){
         var currentUser = results[0];
         return callback(currentUser);
      });
   };
      //denne funktion tjekker først hvert id for den bruger som er logget ind og den bruger der likes
      // hvis begge brugere er at finde og vores resultat er større end 1, er der tale om et match. Dette match returneres ved hjælp return callback
      // hvis ikke brugere endnu ikke har liket hinanden, vil vores resultat være og dermed ses det, at der ikke er et match

      getUser(function(user){
         function checkmatch (callback){
            mysqlcon.query('SELECT * FROM sys.matchlist WHERE user_id = ? AND match_user_id = ?;', [req.params.id, req.session.user.id], function(error, results, fields){
               if (results.length > 0){
                  var match = results[0];
                 
                  return callback (match);
               }
               else{
                  var match = 'no';
                  return callback (match);
               }
            });
         }
         // hvis der ikke var et match - altså match == 0
         // skal vi indsætte indsætte vores like i vores matchlist tabel = dette sker ved nedenstående query
            checkmatch(function(match){
               if(match == 'no') {

                  mysqlcon.query("INSERT INTO matchlist (user_id, match_user_id, is_a_match, user_name, match_user_name) VALUES (?, ?, ?, ?, ?);", [req.session.user.id, req.params.id, 0, req.session.user.username, req.params.name], function (error, results, fields) {
                     if(error) {
                        throw error;
                     }
                  });
               } else {
                  // hvis der om en situation, hvor begge brugere har liket, skal vi opdateres vores is_a_match kolonne til 1, hvor de pågældende id passer til den bruger, der er logget ind og den der har liket
                  mysqlcon.query("UPDATE matchlist SET is_a_match = 1 WHERE user_id = ? AND match_user_id = ?;", [req.params.id, req.session.user.id], function (error, results, fields) {});
               }
            });
            // efter at have udført vores like, returneres vi bare til samme side igen
            res.redirect('/findMatches');
      });


}
// denne funktion tillader at en bruger kan fjerne et match
// Vi opdaterer  vores "is_a_match"-field til 0, hvorefter at den ikke længere henter dette, eftersom den kun henter is_a_match = 1"
// Når vi fjerner vores match, redirectes vi til samme side igen
exports.removematch = function(req, res) {
   mysqlcon.query("UPDATE matchlist SET is_a_match = 0 WHERE user_id = ? AND match_user_id = ?;", [req.params.id, req.session.user.id], function (error, results, fields) {});
   mysqlcon.query("UPDATE matchlist SET is_a_match = 0 WHERE user_id = ? AND match_user_id = ?;", [req.session.user.id, req.params.id], function (error, results, fields) {});
   res.redirect('/findMatches');
}

