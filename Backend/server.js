const express = require("express");
const app = express();

app.get("/", (req, res) =>{
    res.send("Det virker");

});

app.listen("3000")