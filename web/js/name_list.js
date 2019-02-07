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
                dataStr += '<td>' + row[item] + '</td>';
            }

            dataStr += '</tr>';
        }

        $(tbody).html(dataStr);
    }
}

updateTable();