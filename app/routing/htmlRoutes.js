var path = require("path");

// routing
module.exports = function(app) {

    app.get("/games", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/games.html"));
    });

    app.get("/movies", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/movies.html"));
    });

    // If no matching route is found default to home
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

}