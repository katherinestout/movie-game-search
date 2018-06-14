// app logic and event handling corresponding to movies.html
// user types a video game into the search bar and app populates video game results and movies based on those video games\

// import our omdb and igdb modules/constructors
var Omdb = require("./data/omdb");
var Igdb = require("./data/igdb");

// handle search button press
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    var gameSearchTerm = $("#search-input").val().trim();

    // Using a RegEx Pattern to remove spaces from searchTerm
    gameSearchTerm = gameSearchTerm.replace(/\s+/g, "").toLowerCase();
   
    // Find movies based on video games search

