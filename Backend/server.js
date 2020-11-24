const express = require("express");
const cors = require("cors");
const server = express();

server.use(cors())
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}...`));



const ArrayUser = require("../Backend/class.js");
