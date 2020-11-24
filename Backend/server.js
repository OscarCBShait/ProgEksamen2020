const express = require("express");
const cors = require("cors");
const server = express();

server.use(cors())
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}...`));



const ArrayUser = require("../Backend/class.js");

// GET REQUEST = User // GET/read bruges til at læse ressourcer i vores REST-enviroment. GET request ændrer aldrig på informationen, men henter den blot
server.get('/class', (req, res) => { // denne skal bruges til User
    res.send(ArrayUser);
});