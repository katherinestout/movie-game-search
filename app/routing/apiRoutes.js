var request = require("request");
var igdb = require("igdb-api-node").default;

// api keys
const OMDB_KEY = "879503ae";
const IGDB_KEY = "47a0d2b184712d0c3ae138e13c049062";
const YOUTUBE_KEY = "AIzaSyAxaGmtGF-Ctvhj9OYggFV_cjiUXYJynSg";

// routing
module.exports = function(app) {

    app.get("/api/movie-list/:searchterm", function(req, res) {
        // *** SEARCH TERM MUST CONTAIN "-" BETWEEN WORDS (ex: "star-wars")
        var searchTerm = req.params.searchterm;
        console.log("search term: " + searchTerm);

        // movies
        var queryUrl = "http://www.omdbapi.com/?s=" + searchTerm + "&y=&plot=short&apikey=" + OMDB_KEY;
            console.log("omdb query url: " + queryUrl);
            request(queryUrl, function(error, response, body) {
                // If the request is successful
                if (!error && response.statusCode === 200) {
                    console.log(body);
                    res.json(JSON.parse(body));
                }
            });
    });

    app.get("/api/game-list/:searchterm", function(req, res) {
        // *** SEARCH TERM MUST CONTAIN "-" BETWEEN WORDS (ex: "star-wars")
        var searchTerm = req.params.searchterm;
        console.log("search term: " + searchTerm);

        // games   
        const client = igdb(IGDB_KEY);

        client.games({
            fields: '*',
            limit: 10,
            offset: 0,
            order: 'popularity:desc',
            search: searchTerm
        }).then(response => {
            // response.body contains the parsed JSON response to this query
            console.log(response.body);
            res.json(response.body);

        }).catch(error => {
            throw error;
        });
    });

    app.get("/api/movie/:title", function(req, res) {

    });

    app.get("api/game/:title", function(req, res) {

    });
};


