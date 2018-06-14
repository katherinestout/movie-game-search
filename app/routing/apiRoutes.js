var request = require("request");
var igdb = require("igdb-api-node").default;

// keys
const OMDB_KEY = "879503ae";
const IGDB_KEY = "47a0d2b184712d0c3ae138e13c049062";

// routing
module.exports = function(app) {
    
    // get movies based on games
    app.get("/api/movies/:gameterm", function(req, res) {
        
        // **** SEARCH URL TERM MUST CONTAIN "-" BETWEEN WORDS (EX: star-wars)
        var gameTerm = req.params.gameterm;
        console.log("Game Search Term: " + gameTerm);

        // Run a request to the IGDB API with the title specified
        const client = igdb(IGDB_KEY);

        client.games({
            fields: '*',
            limit: 10,
            offset: 0,
            order: 'popularity:desc',
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

        var queryUrl = "http://www.omdbapi.com/?s=" + movieTerm + "&y=&plot=short&apikey=" + OMDB_KEY;
        console.log("omdb query url: " + queryUrl);
        request(queryUrl, function(error, response, body) {
            // If the request is successful
            if (!error && response.statusCode === 200) {
                console.log(body);
                return res.json(JSON.parse(body));
            }

        });

    });











    // get movies based on games with date released
    app.get("/api/movies/:gameterm/:date", function(req, res) {
        var gameTerm = req.params.gameterm;
        var date = req.params.date;
        console.log("Game Search Term: " + gameTerm + "Date: " + date);

    });

    // get games based on movies with date released
    app.get("/api/games/:movieterm/:date", function(req, res) {
        var movieTerm = req.params.movieterm;
        var date = req.params.date;
        console.log("Movie Search Term: " + movieTerm + "Date: " + date);

    });

}