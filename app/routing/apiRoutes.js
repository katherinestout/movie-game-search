var axios = require("axios");
var request = require("request");
var igdb = require("igdb-api-node").default;

// api keys
const OMDB_KEY = "879503ae";
const IGDB_KEY = "47a0d2b184712d0c3ae138e13c049062";

// routing
module.exports = function(app) {

    app.get("/api/search/:searchterm", function(req, res) {
        // *** SEARCH TERM MUST CONTAIN "-" BETWEEN WORDS (ex: "star-wars")
        var searchTerm = req.params.searchterm;
        console.log("search term: " + searchTerm);

        // perfor multiple concurrent requests using axios
        axios.all([getMovies(), getGames()])
            .then(axios.spread(function (movieData, gameData) {
                // return resulting data
                console.log(movieData);
                console.log(gameData);
            }));

        function getMovies() {
            var queryUrl = "http://www.omdbapi.com/?s=" + searchTerm + "&y=&plot=short&apikey=" + OMDB_KEY;
            console.log("omdb query url: " + queryUrl);
            request(queryUrl, function(error, response, body) {
                // If the request is successful
                if (!error && response.statusCode === 200) {
                    console.log(body);
                    return res.json(JSON.parse(body));
                }
            });
        }
        
        function getGames() {
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
                
                return res.json(response.body);
    
            }).catch(error => {
                throw error;
            });
        }

    });

}