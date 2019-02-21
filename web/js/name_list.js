var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

var saveChangesButton = $('#saveChanges');
saveChangesButton.on("click", saveChanges);



var checks = [
    ["#firstName", /^\S{1,40}$/],
    ["#lastName", /^\S{1,40}$/],
    ["#email", /^[\.a-zA-Z0-9_]+@[\.a-zA-Z_]+\.[a-zA-Z_]{2,3}$/],
    ["#phone", /^\d{10}$|^\d{3}-\d{3}-\d{4}$/],
    ["#birthday", /^\d{4}\-([0][1-9]|[1][0-2])\-([0][1-9]|[1-2][0-9]|[3][0-2])$/]
];

function saveChanges() {
    console.log("Changes Saved");

    var valid_form = true;

    for (var i = 0; i < checks.length; i++) {
        var identifier = checks[i][0];
        var inputVal = $(identifier).val();
        var regex = checks[i][1];

        if (regex.test(inputVal)) {
            console.log(identifier + " is valid.");
            $(identifier).removeClass("is-invalid");
            $(identifier).addClass("is-valid");
        } else {
            console.log(identifier + " is invalid.");
            $(identifier).removeClass("is-valid");
            $(identifier).addClass("is-invalid");
            valid_form = false;
        }
    }

    if (valid_form) {
        $('#myModal').modal('hide');

        var json = '{';

        for (var i = 0; i < checks.length; i++) {
            var identifier = checks[i][0];
            var str_name = identifier.substring(1, identifier.length);
            var str_val = $(identifier).val();

            $(identifier).removeClass("is-valid");
            $(identifier).removeClass("is-invalid");

            json += '\"'+str_name+'\"' + ':' + '\"'+str_val+'\"';

            if (i < checks.length - 1) json += ',';
        }

        json += '}';

        var jsonObj = JSON.parse(json);

        var url = "api/name_list_edit";

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(jsonObj),
            success: [function(dataFromServer) {
                updateTable();
            }],
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
    }
}

function showDialogAdd() {
    // Clear out the values in the form.
    $('#id').val("");

    for (var i = 0; i < checks.length; i++) {
        $(checks[i][0]).val("");
    }

    // Show the hidden dialog
    $('#myModal').modal('show');
}

function updateTable() {
    var url = "api/name_list_get";
    $.getJSON(url, null, callback);
}

function callback(json_result) {
    if (json_result.length > 0) {
        var tbody = '#datatable tbody';
        var thead = '#datatable thead';

        $(thead).empty();
        $(tbody).empty();

        // Headers
        var dataStr = '<tr>';

        for (var header in json_result[0]) {
            dataStr += '<th>' + header + '</th>'
        }

        dataStr += '</tr>';

        $(thead).html(dataStr);

        // Body
        dataStr = '';

        for (var i = 0; i < json_result.length; i++) {
            var row = json_result[i];
            dataStr += '<tr>';

            for (var item in row) {
                var data = row[item]

                // Format phone numbers.
                if (item === "phone" && data.length === 10) {
                    data = data.substring(0, 3) + "-" + data.substring(3, 6) + "-" + data.substring(6, 10);
                }

                dataStr += '<td>' + data + '</td>';
            }

            dataStr += '</tr>';
        }

        $(tbody).html(dataStr);
    }
}

updateTable();