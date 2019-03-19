// For the sake of example, if there's no token in the url let the user create a link.
function newLink() {
    $("#survey_stuff").text("Create a New Link");
    $("#new_link").show();
}

var newLinkButton = $('#new_link_button');
newLinkButton.on("click", newLinkButtonPress);

function newLinkButtonPress() {
    $.ajax({
        type: 'POST',
        url: "api/survey_get",
        data: 'email='+$("#new_link_email").val(),
        dataType: 'text'
    });
}

// Run this when the page loads.
function pageLoad() {
    $("#new_link").hide();

    var url = window.location.href;

    if (url.indexOf('?') === -1) {
        newLink();
    } else {
        // If there's a token in the url, send it to the server for verification.
        var token = url.substring(url.indexOf('?')+1);
        $.get("api/survey_get?token=" + token, callback);
    }
}

// If the token was valid, display the survey.
function callback(result) {
    var size = (result.toString()).length;

    if (size > 3) {
        $("#survey_stuff").text("Congratulartions " + result + "! You are now wasting your time taking a survey!");
    } else {
        $("#survey_stuff").text("Error : Invalid Token");
    }
}

pageLoad();