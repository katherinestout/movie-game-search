
// handle search button press
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    var searchTerm = $("#search-input").val().trim();

    // *** important to use "-" for our external apis
    searchTerm = searchTerm.replace(/\s+/g, "-").toLowerCase();
    console.log("user input search term: " + searchTerm);

    


});