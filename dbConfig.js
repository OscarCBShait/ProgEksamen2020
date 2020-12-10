//Vi bruger mysql-modulet fra NPM
var mysql = require('mysql');


//Her opretter vi forbindelse til vores mysql-db
var config = {
    host : 'localhost', 
    user : 'root', // den bruger vi har oprettet på MySQL
    password : 'rootroot', // adgangskoden til at tilgå vores database
    database : 'sys', // hvilken database vi arbejder ud fra
    multipleStatements: true, // denne property tillader, at vi kan skrive flere SQL statements i vores queries
};

// her laver vi vores mysql connection
var connection = mysql.createConnection(config)

//Her tjekker vi om der er forbindelse til mysql - altså om vores connection virker
connection.connect((err) => {
    if(err) {
        //hvis der er fejl - skal vi console.log at der ikke er forbindelse
        console.log('Ingen forbindelse til db')
        throw err;
    }
    console.log('Forbindelse til db');
})

//Her sørger vi for, at vi kan eksportere vores db-config for at kunne foretage queries til vores mysql i andre filer
module.exports = {
    connection : mysql.createConnection(config)
}

