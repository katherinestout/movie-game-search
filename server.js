var express = require("express");
var bodyParser = require("body-parser");

// Tells node that we are creating an "express" server
var app = express();
var PORT = process.env.PORT || 3000;

// sets up the express app to handle data paraser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get style.css, etc
app.use(express.static("app/public"));

// points our server to a series of "route" files.
// **** order matters, htmlRoutes includes a catch-all for other routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// starts our server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
