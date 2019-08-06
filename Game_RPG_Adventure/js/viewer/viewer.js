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

function create_table(table_div, table_array, text = true, color = false) {
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
            
            // todo: change this to css as this is not supported in html5
            td.width = '25';
            td.height = '25';

            // add the entry to the row
            tr.appendChild(td); 
        }

        // add the row to the table
        table_body.appendChild(tr);
    }

    // add the table to the table div
    table_div.appendChild(table);

    if (text || color) {
        fill_table(table_div, table_array, text, color);
    }
}

function fill_table(table_div, array, text = true, color = false) {
    // get all the cells
    let cells = table_div.children[0].children[0].children;

    // error if the array is not the same size as the table
    if (cells.length != array.length) {
        return;
    }

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (text) {
                // add a text node if there is none
                if (!cells[i].children[j].childNodes.length) {
                    cells[i].children[j].appendChild(document.createTextNode(""));
                }

                // change the value of the text box in the cell
                cells[i].children[j].childNodes[0].nodeValue = array[i][j];
            }

            if (color) {
                cells[i].children[j].bgColor = get_biome_color(parseInt(array[i][j]));
            }
        }        
    }
}