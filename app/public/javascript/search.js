// Christina animation
$(".hurry").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
    $("#christina").attr("src", "images/christina.png").height(350);
});

// Nima animation
$(".nima").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
    $(".nima").hide();
});

// handle search button press
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    $(".prompt").hide();
    $("#movie-list").show();
    $("#game-list").show();
    $(".nima").show();


    var searchTerm = $("#search-input").val().trim();

    // get the location of the root page 
    var currentURL = window.location.origin;

    // *** important to use "-" for our external apis
    searchTerm = searchTerm.replace(/\s+/g, "-").toLowerCase();
    console.log("user input search term: " + searchTerm);

    // empty movie-list and game-list
    $("#movie-list").empty();
    $("#game-list").empty();
    
    // populate movie-list
    $.ajax({
        url: currentURL + "/api/movie-list/" + searchTerm,
        method: "GET"
    })
    .then(function(movieData) {
        console.log("populating movie list");
        console.log(movieData);

        for (var i = 0; i < movieData.Search.length; i++) {
            // for each movie 
            var movie = movieData.Search[i];
            console.log(movieData.Search[i]);

            // create div for game element and assign game class
            var movieElem = $("<div>").addClass("movie");

            // get movie title
            // var title = $("<p>").text(movie.Title);
            // title.addClass("item-title");

            // get movie poster
            var poster = $("<img>").attr("src", movie.Poster).addClass("poster").addClass("animated").addClass("rotateIn");

            // append title and poster to movieElem
            // movieElem.append(poster, title); 
            movieElem.append(poster);
            // append to movie-list div
            $("#movie-list").append(movieElem);
        }
    });

    // populate game-list 
    $.ajax({
        url: currentURL + "/api/game-list/" + searchTerm, 
        method: "GET"
    })
    .then(function(gameData) {
        console.log("populating game list");
        console.log(gameData);

        for (var i = 0; i < gameData.length; i++) {
            // for each game
            var game = gameData[i];

            // create div for game element and assign game class
            var gameElem = $("<div>").addClass("game");

            // get movie title
            // var title = $("<p>").text(game.name);
            // title.addClass("item-title");
            
            var cloudinaryId = game.cover.cloudinary_id;
            
            $.ajax({
                url: currentURL + "/api/game-image/" + cloudinaryId,
                method: "GET"
            })
            .then(function(coverURL) {
                // get movie poster
                var cover = $("<img>").attr("src", coverURL).addClass("cover").addClass("animated").addClass("rotateIn");

                // append title and poseter to gameElem
                // gameElem.append(cover, title);
                gameElem.append(cover);    
                // append to game-list div
                $("#game-list").append(gameElem);
            });
        }
    });
});