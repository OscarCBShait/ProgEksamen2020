//Vi anvender express-pakken fra NPM
var express = require("express");

//Vi anvender express-session-modulet fra NPM
var session = require("express-session"); // session gemmer information i server-side

//Vi anvender body-parser pakken fr NPM. Body-paser er en middleware, som læser JSON, og kan transformere det indtil den tidligere "datatype"
var bodyParser = require("body-parser");

//Vi anvender path-modulet fra NPM -- dette modul er et effektivt redskab, når man skal arbejde med directories og stier til filer
var path = require("path");

//Vi anvender cors-pakken fra NPM
const cors = require("cors");

//Vi henter vores EJS-template. Denne bruges til at vores frontend for at vise data fra mysql og js
var ejs = require('ejs');

// Dette er et objekt, som henter alle vores endpoints/routes
var allRoutes = require('./routes/web')

//Her anvender vi express application og putter den ind i vores "server"-variable
const server = express();

//Vi definerer her, at vi skal bruge session-modulet til at håndtere vores user-session
server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    insecureAuth : true
}));

//Vi gør brug af CORS-modulet
server.use(cors());

//Her registrerer vi vores body-parser middleware så vi kan arbejde med de forms, som vi har oprettet
server.use(bodyParser.urlencoded({extended:true}));

// Body-parser sørger for, at vi kan få adgang til data, fordi den tjekker om det er JSON-fil
server.use(bodyParser.json());

//Express.static er et værktøj vi kan bruge til at læse/render static files såsom billeder, CSS-filer mv. Nodejs pr. defaiult kan ikke læse disse
//Her vælger vi hvor vi skal serve vores static.files ved hjælp af __dirname og /public
server.use(express.static(__dirname + '/public'));

// Denne linje kode gør, at vi anvender EJS som vores templating engine
//Express bruger jade som default template enige - og derfor bruger vi set til at vælge ejs
// Pr. default søger ejs template engine efter filerne i en mappe kaldet views - og derfor har vi ændret mappen til views
server.set('view engine', 'ejs');

//Vi sætter porten til at være 3000, medmindre der allerede eksisterer en konfigureret port, som vi kan tilgå
const port = process.env.PORT || 3000;

// Bid kode, der skal initiasiere vores endpoints/routes
server.use('/', allRoutes);

//Her tjekker vi om vores server virker --> hvis ja skal vi logge nedenstående og porten "3000"
server.listen(port, () => console.log(`Listening on port ${port}...`)); 

//Vi eksporterer vores server, så den kan bruges i andre filer
module.exports = server;




