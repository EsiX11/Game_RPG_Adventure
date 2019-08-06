function create_table(table_div, table_array) {
    // create a table
    var table = document.createElement('TABLE');

    table.border = '1';

    var table_body = document.createElement('TBODY');
    table.appendChild(table_body);

    // loop through the size of the json
    for (i = 0; i < table_array.length; i++) {
        var tr = document.createElement('TR');

        for (var j = 0; j < table_array[i].length; j++) { 
            var td = document.createElement('TD');
            
            td.width = '25';

            // get the value 
            var td_value = table_array[i][j];

            // set the color of the table entry
            td.setAttribute('bgcolor', get_biome_color(parseInt(td_value)));

            // append the text to the entry
            td.appendChild(document.createTextNode(td_value));

            // add the entry to the row
            tr.appendChild(td); 
        }

        // add the row to the table
        table_body.appendChild(tr);
    }

    // add the table to the table div
    table_div.appendChild(table);
}