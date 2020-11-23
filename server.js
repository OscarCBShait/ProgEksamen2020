const express = require("express");
const app = express();

app.get("/", (req, res) =>{
    res.send("Hej med dig");

});

app.listen("8080")