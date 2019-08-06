// colors for the biomes TODO: make this configurable
var biome_array = ["#006100", "0A944D", "#007BE1", "B8CCDD", "F14444", "E47C00", "#D8BFD8", "#D2B48C"];

function get_biome_color(index) {
    if (isNaN(index)) {
        // value is not filled in
        return "#FFFFFF";
    }

    if (index < 0 || index >= biome_array.length) {
        // value is out of index
        return "#FFFFFF";
    }
    
    // value within index        
    return biome_array[index - 1];
}

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