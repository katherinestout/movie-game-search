// app logic and event handling corresponding to games.html 
// user types a movie into the search bar and app populates movie results and video games based on those movies

// import our omdb and igdb modules/constructors
var Omdb = require("./data/omdb");
var Igdb = require("./data/igdb");

// handle search button press
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    var movieSearchTerm = $("#search-input").val().trim();

    // Using a RegEx Pattern to remove spaces from searchTerm
    movieSearchTerm = movieSearchTerm.replace(/\s+/g, "").toLowerCase();

    // Find video games based on movie search

    // query omdb api for short list of movies that match search term
    // ...
    
    // populate movie-list with movies (include title, cover, date)
    // ...
       
        // after returned, query igdb api for short list of video games that correspond to returned results from omdb api
        // ...

        // populate game-list with video games (include title, cover, date)
        // ...


});