var express = require("express");
var bodyParser = require("body-parser");

// Tells node that we are creating an "express" server
var app = express();

var PORT = process.env.PORT || 3000;

// sets up the express app to handle data paraser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// points our server to a series of "route" files.
require("./app/routing/htmlRoutes")(app);

// starts our server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});


//app.get(queryUrl, function(error, response, body));
