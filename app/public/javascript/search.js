// Add Christina animation
$(".hurry").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
    $("#christina").attr("src", "images/christina.png").height(325);
});

// handle search button press
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    $("#christina").hide();
    $("#movie-list").show();
    $("#game-list").show();

    var searchTerm = $("#search-input").val().trim();

    // clear search button
    $("#search-input").val('');

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
            movieElem.attr("data-title", movie.Title);

            // get movie title
            // var title = $("<p>").text(movie.Title);
            // title.addClass("item-title");

            // get movie poster
            var poster = $("<img>").attr("src", movie.Poster).addClass("poster");

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
        // console.log(gameData);

        for (var i = 0; i < gameData.length; i++) {
            // for each game
            var game = gameData[i];

            var cloudinaryId = game.cover.cloudinary_id;

            // create div for game element and assign game class
            var gameElem = $("<div>").addClass("game");
            gameElem.attr("data-title", game.name);
            gameElem.attr("data-cloudinary-id", cloudinaryId);

            // get movie poster
            getCoverURL(cloudinaryId);   

            // append to game-list div
            $("#game-list").append(gameElem);

        } 
    });

    function getCoverURL(cloudinaryId) {
        $.ajax({
            url: currentURL + "/api/game-image/" +  cloudinaryId,
            method: "GET"
        })
        .then(function(coverURL) {
            // add movie poster
            var cover = $("<img>").addClass("cover");
            cover.attr("src", coverURL);

            $("[data-cloudinary-id='" + cloudinaryId +  "']").append(cover);
        });
    }


    // function triggers when movie item is clicked, provides movie info and Movie Trailer video in a div at top of page
    $(document).on("click", ".movie", showMovieInfoVideo);

    function showMovieInfoVideo() {
        console.log("movie item clicked!");

        // get data-title attribute value and add "- Official Trailer" to end of search string
        var movieSearchString = $(this).attr("data-title").replace(/\s+/g, "-").toLowerCase() + "-official-trailer";
        console.log("youtube search string for movie: " + movieSearchString);

        $.ajax({
            url: currentURL + "/api/yt/" + movieSearchString,
            method: "GET"
        })
        .then(function(videoData) {
            console.log(videoData);

            // get link from data returend from call to youtube API
            var ytId = JSON.stringify(videoData[0].id);
            console.log("youtube link for movie: " + ytId);

            $("#yt-video").attr("src", "https://www.youtube.com/embed/" + ytId.replace(/['"]+/g, ''));

            // show results div
            $(".results").show();

        });

    }

    // function triggers when game is clicked, provides game info and "Let's Play" video for each game in a div at top of page
    $(document).on("click", ".game", showGameInfoVideo);

    function showGameInfoVideo() {
        console.log("game item clicked!");

        // get data-title attribute value and add "Let's Play" to beginning of search string
        var gameSearchString = "lets-play-" + $(this).attr("data-title").replace(/\s+/g, "-").toLowerCase();
        console.log("youtube search string for game: " + gameSearchString);

        $.ajax({
            url: currentURL + "/api/yt/" + gameSearchString,
            method: "GET"
        })
        .then(function(videoData) {
            console.log(videoData);

            // get link from data returned from call to youtube API
            var ytId = JSON.stringify(videoData[0].id);
            console.log("youtube link for game: " + ytId);

            $("#yt-video").attr("src", "https://www.youtube.com/embed/" + ytId.replace(/['"]+/g, ''));

            // show results div
            $(".results").show();
         
        });
        
    }
});