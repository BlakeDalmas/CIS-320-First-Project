$("#button1").click(function() {
  console.log("Hello");
});

$("#button2").click(function() {
    var left = $("#field1").val() || 0;
    var right = $("#field2").val() || 0;
    var sum = parseFloat(left) + parseFloat(right);

    $("#field3").val(sum);
});

$("#button3").click(function() {
   $("#paragraphToHide").toggle();
});

$("#button4").click(function() {
   var phone = $("#phoneField").val();
   var pattern = /^\d{3}-\d{3}-\d{4}$/;

   if (pattern.test(phone)) {
       console.log("OK");
   } else {
       console.log("Bad");
   }
});

$("#button5").click(function() {
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
})