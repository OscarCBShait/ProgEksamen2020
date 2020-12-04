//Vi anvender path-modulet fra NPM -- dette modul er et effektivt redskab, når man skal arbejde med directories og stier til filer
var path = require("path");

// her vælger vi at hente vores db config for at kunne lave mysql commands
// samtidig skaber vi vores connection
var config = require('../dbConfig.js');
var mysqlcon = config.connection;


//export (GET-request), der tillader at vi kan tilgå vores findMatches side
// render anvendes til ejs-filer = hvis man anvender sendFile, sender den filen til din computer som du kan downloade
exports.findMatch_get = function(req, res) {
    res.render(path.join(__dirname + '../../views/findMatches.ejs')); //__dirname returnerer stien til denne fil og path.join sammensætter de to stier
};

//export (GET-request) , der tillader at vi kan se vores matches
// render anvendes til ejs-filer = hvis man anvender sendFile, sender den filen til din computer som du kan downloade
exports.seMatches_get = function(req, res) {
    res.render(path.join(__dirname + '../../views/matches.ejs')); //__dirname returnerer stien til denne fil og path.join sammensætter de to stier
};