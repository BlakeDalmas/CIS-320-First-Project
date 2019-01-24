$('#button1').on("click", logFunction);
$('#button2').on("click", sumFunction);
$('#button3').on("click", toggleFunction);
$('#button4').on("click", phoneFunction);
$('#button5').on("click", jsonFunction);

function logFunction() {
    console.log("Hello");
}

function sumFunction() {
    var left = $("#field1").val() || 0;
    var right = $("#field2").val() || 0;
    var sum = parseFloat(left) + parseFloat(right);

    $("#field3").val(sum);
}

function toggleFunction() {
    $("#paragraphToHide").toggle();
}

function phoneFunction() {
    var phone = $("#phoneField").val();
    var pattern = /^\d{3}-\d{3}-\d{4}$/;
    var output = pattern.test(phone) ? "OK" : "Bad";

    console.log(output);
}

function jsonFunction() {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var objJSON = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    };
    var result = JSON.stringify(objJSON);

    console.log(result);
}