// Add Katie animation
$(".intro").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
    $("#katie").attr("src", "images/katie.png").height(325);
});

// Set up carousel
$(document).ready(function(){
    $(".carousel.carousel-slider").carousel({
        padding: 200
    });
    autoplay()
    function autoplay() {
        $(".carousel").carousel("next");
        setTimeout(autoplay, 4500);
    }
});