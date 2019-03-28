// This calls our back-end Java program that sets our session info
function login() {
    var url = "api/login";

    // Grab data from the HTML form
    var sessionKey = $("#userID").val();

    // Create a JSON request based on that data
    var dataToServer = {"sessionKey" : sessionKey};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("login");
        console.log(dataFromServer);
        // Clear the form
        $("#userID").val("");
        getLogin();
    });
}

// This gets session info from our back-end servlet.
function getLogin() {
    var url = "api/get_login";

    $.post(url, null, function (dataFromServer) {
        console.log("get login");
        console.log(dataFromServer);
        // Update the HTML with our result

        if (dataFromServer.length > 0) {
            $('#getSessionResult').html("Welcome " + dataFromServer + "!");
            $('#loginArea').hide();
            $('#logoutArea').show();
        } else {
            $('#getSessionResult').html("Welcome!");
            $('#loginArea').show();
            $('#logoutArea').hide();
        }
    });
}

// This method calls the servlet that invalidates our session
function logout() {
    var url = "api/logout";

    $.post(url, null, function (dataFromServer) {
        console.log("logout");
        console.log(dataFromServer);
        getLogin();
    });
}

// Hook the functions above to our buttons
button = $('#getLogin');
button.on("click", getLogin);

button = $('#loginButton');
button.on("click", login);

button = $('#logoutButton');
button.on("click", logout);

getLogin();