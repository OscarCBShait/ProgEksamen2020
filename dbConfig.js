//Vi bruger mysql-modulet fra NPM
var mysql = require('mysql');


//Her opretter vi forbindelse til vores mysql-db
var config = {
    host : 'localhost',
    user : 'root',
    password : 'rootroot',
    database : 'sys', 
};

var connection = mysql.createConnection(config)

//Checking if mysql connection is working
connection.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Connected to db');
})

//Her sørger vi for, at vi kan eksportere vores db-config for at kunne foretage queries til vores mysql i andre filer
module.exports = {
    connection : mysql.createConnection(config)
}