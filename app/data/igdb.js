var request = require("request");

function Igdb(key) {
    this.key = key;
    
    this.search = function(title, callback) {
       
    };

    this.searchWithDate = function(title, date, callback) {
        
    };
}

// export constructor so it can be used in other files
module.exports = Igdb;