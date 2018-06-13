var request = require("request");

function Omdb(key) {
    this.key = key;
    
    this.search = function(title, callback) {
       // Run a request to the OMDB API with the title specified
       var queryUrl = "http://www.omdbapi.com/?s=" + title + "&y=&plot=short&apikey=" + this.key;

       // This line is just to help us debug against the actual URL.
       console.log(queryUrl);

       request(queryUrl, function(error, response, body) {

           // If the request is successful
           if (!error && response.statusCode === 200) {
               // console.log(JSON.parse(body.Search));
               // return JSON.parse(body.Search);
               // execute callback function within request callback
               callback(JSON.parse(body).Search);
           }
       });
    };

    this.searchWithDate = function(title, date, callback) {
        // Run a request to the OMDB API with the title specified
        // TODO: add date to search arguments
        var queryUrl = "http://www.omdbapi.com/?s=" + title + "&y=&plot=short&apikey=" + this.key;

        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);

        request(queryUrl, function(error, response, body) {

            // If the request is successful
            if (!error && response.statusCode === 200) {
                // console.log(JSON.parse(body.Search));
                // return JSON.parse(body.Search);
                // execute callback function within request callback
                callback(JSON.parse(body).Search);
            }
        });
    };
}

// export constructor so it can be used in other files
module.exports = Omdb;