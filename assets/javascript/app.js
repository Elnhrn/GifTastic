$(document).ready(function () {

    // Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.

    var topics = ["The Office", "Parks and Recreation", "It's Always Sunny in Philadelphia", "Broad City", "Silicon Valley", "Veep", "Rick and Morty"];
    var TVbtn;

    // Your app should take the topics in this array and create buttons in your HTML.
    // Try using a loop that appends a button for each string in the array.

    function loadButtons() {
        $("#buttonsDiv").empty();
        for (var i = 0; i < topics.length; i++) {
            TVbtn = $("<button>");
            TVbtn.addClass("btn TVbtn");
            TVbtn.attr("data-name", topics[i]);
            TVbtn.text(topics[i]);
            $("#buttonsDiv").append(TVbtn);
        };
    };

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    loadButtons();

    // When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

    $(document).on("click", ".TVbtn", function () {
        $(".gifsHere").empty();

        var queryURL = "https://api.giphy.com/v1/gifs/search?";
        var queryParams = { "api_key": "7dVTOMJnC7KCOlYkrUIatFTMPjWY2iv1" };
        queryParams.q = $(this).data("name");
        queryParams.limit = 10;
        queryURL = queryURL + $.param(queryParams);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

            // Under every gif, display its rating (PG, G, so on).

            for (var i = 0; i < response.data.length; i++) {
                var rating = response.data[i].rating;
                if (rating != "r") {
                    var TVDiv = $("<div class='tv-gif'>");
                    var img = $("<img/>");
                    img = img.attr("src", response.data[i].images.fixed_height.url);
                    var p = $("<p>").html("Rated " + rating.toUpperCase());
                    TVDiv.append(img, p);
                    $(".gifsHere").append(TVDiv);
                }
            }

        });
    });

    // Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

    $("#addTV").on("click", function (event) {
        event.preventDefault();
        var input = toTitleCase($("#tv-input").val().trim());
        topics.push(input);
        loadButtons();
        $("input").val("");
    });

    $(document).on("click", "img", function() {
        console.log($(this)[0].src);
        var img = $("img");



        img.attr("src", data[0].images.fixed_height.url);
    });

});