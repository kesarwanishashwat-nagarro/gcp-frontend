var express = require("express");
var bodyParser = require("body-parser");
var request = require('request');
var router = require("./route");
var app = express();

app.use(express.static('frontend'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app, request);

app.get("/*", function(req, res) {
    res.sendFile(__dirname + '/frontend/index.html')
});

const port = process.env.PORT || 4200;

var server = app.listen(port, function () {
    console.log("app running on port.", server.address().port);
});