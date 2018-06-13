// import our omdb and igdb modules/constructors
var Omdb = require("./data/omdb");
var Igdb = require("./data/igdb");

// create a new instance of omdb, passing in our api key
var omdb = new Omdb("");

// create a new instance of igdb, passing in our api key
var igdb = new Igdb("");

// OMDB TEST!!
omdb.search("Star Wars", function(data) {

});

omdb.searchWithDate("Star Wars", "<date>", function(data) {

});

// IGDB TEST!!
igdb.search("Star Wars", function(data) {

});

igdb.searchWithDate("Star Wars", "<date>", function(data) {

});
