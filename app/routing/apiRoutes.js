var request = require("request");
var igdb = require("igdb-api-node").default;

// keys
const OMDB_KEY = "879503ae";
const IGDB_KEY = "47a0d2b184712d0c3ae138e13c049062";

// routing
module.exports = function(app) {
    
    // get movies based on games
    app.get("/api/movies/:gameterm", function(req, res) {
        
        var gameTerm = req.params.gameterm;
        console.log("Game Search Term: " + gameTerm);

        // Run a request to the IGDB API with the title specified
        const client = igdb(IGDB_KEY);

        client.games({
            fields: '*',
            limit: 5,
            offset: 0,
            order: 'name:desc',
            search: gameTerm
        }).then(response => {
            // response.body contains the parsed JSON response to this query
            console.log(response.body);
            
            return res.json(response.body);

        }).catch(error => {
            throw error;
        });

    });

    // get games based on movies
    app.get("/api/games/:movieterm", function(req, res) {

        var movieTerm = req.params.movieterm;
        console.log("Movie Search Term: " + movieTerm);

        

    });





    // get movies based on games with date released
    app.get("/api/movies/:gameterm/:date", function(req, res) {

    });

    // get games based on movies with date released
    app.get("/api/games/:movieterm/:date", function(req, res) {

    });

}