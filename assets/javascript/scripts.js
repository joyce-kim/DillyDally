var config = {
    apiKey: "AIzaSyAJ-h3X7RoJ4BsPnyrK7TFArZ1LjSsVfhY",
    authDomain: "project1-3f7fd.firebaseapp.com",
    databaseURL: "https://project1-3f7fd.firebaseio.com",
    projectId: "project1-3f7fd",
    storageBucket: "project1-3f7fd.appspot.com",
    messagingSenderId: "447834756755"
};
firebase.initializeApp(config);

var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();

// Sabrina's function to get youtube data
function youTube() {
    var base_url = 'http://www.youtube.com/embed?listType=search&list=';
    var search_field = document.getElementById("search-input").value;
    var target_url = base_url + search_field;
    var ifr = document.getElementById('youriframe');
    ifr.src = target_url;
    return false;
}
// Sabrina's function to get giphy data
function giphy() {
    // Grabbing and storing the data-animal property value from the button
    // var animal = $(this).attr("data-animal");
    var search_field = document.getElementById("search-input").value;
    search_field.concat();
    // Constructing a queryURL using the giphy API search input
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            search_field + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Performing an AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After data comes back from the request
    .done(function (response) {

        // storing the data from the AJAX request in the results variable
        var results = response.data;
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          
            // Creating and storing a div tag
            var giphyDiv = $("<div>");
            var giphyIframe = $("<iframe>");
            giphyIframe.attr("src", results[i].images.fixed_height.url);
            giphyDiv.append(giphyIframe);
            // Prependng the giphyDiv to the HTML page in the "#gifs-appear-here" div
            $("#giphyiframe").prepend(giphyDiv);
        }
    });
}

// On submit click event, run functions(defined above) to grab youtube videos and giphy's that match search input
$("#submit-button").on("click", function (event) {

    youTube();
    // Empty giphy iframe after its been created
    $("#giphyiframe").empty();
    giphy();
    event.preventDefault();

    var searchInput = $("#search-input").val().trim();
    database.ref().push({
        searchItem: searchInput
    });
    $("#search-input").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    var searchTerm = childSnapshot.val().searchItem;
    var historyItem = $("<li><a href='#' class='trending-items'>" + searchTerm + "</a></li>");
    
    $("#insert-history-here").prepend(historyItem);

    $(".trending-items").on("click", function() {
        var value = $(this).html();
        var input = $("#search-input");
        input.val(value);
    });
});