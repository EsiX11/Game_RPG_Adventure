// class for the player position
class xy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// variable for storing the location of the player
let player_location = null;

// the map that is used currently. If this is empty the map isn't loaded yet
let current_map = null;
let current_map_name = null;

const start_location_id = 7;

// load the map
load_json("https://esix11.github.io/Game_RPG_Adventure/Game_RPG_Adventure/json/map1.json")
    .then(function(e){
        // set the map and the map name
        current_map = e["_map"];
        current_map_name = e["_map_name"];

        // give the player a location on the map
        player_location = init_player_position(current_map, start_location_id);

        // create a table to show the current position to the player
        create_table(document.getElementById("location_viewer"), [[null, null, null], 
                                                                  [null, null, null], 
                                                                  [null, null, null]]);

        // todo: show a start screen or something
        // show_startscreen();
    });

// handler for all the key presses
function keypress_handler(event) {
    console.log("Keyboard button pressed", event.keyCode);   
}

function is_within_map_bounds(pos) {
    // check if the location is within bounds
    if (pos.y < 0 || pos.y >= current_map.length) {
        return false;
    }

    if (pos.x < 0 || pos.x >= current_map[pos.y].length) {
        return false;
    }

    return true;
}

function movement_check(direction) {
    // check if we can access the map
    if (!current_map) {
        return false;
    }

    // get the new location with the direction
    let t = move_player(player_location, direction);

    // check if the new location is within bounds
    if (!is_within_map_bounds(t)) {
        return false;
    }

    // check if the new location is a valid biome location
    if (isNaN(parseInt(current_map[t.y][t.x]))) {
        // location is not valid
        return false;
    }

    // todo: check if we can go to the new cell biome wise

    return true;
}

function move_player(curr_loc, dir) {
    let ret = new xy(curr_loc.x, curr_loc.y); 

    switch (dir) {
        case 0:
            ret.y -= 1;
            break;
        case 1:
            ret.x += 1;
            break;
        case 2:
            ret.y += 1;
            break;
        case 3:
            ret.x -= 1;
            break;
    }

    return ret;
}

function init_player_position(map, start_id) {
    // search for the start id
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == start_id) {
                // return the xy of the first start location
                return new xy(x, y);
            }
        }        
    }

    if (map.length && map[0].length) {
        // we have a map with data so return the middle
        return new xy(map.length / 2, map[0].length / 2);
    }

    // map doesn't have any values so return null
    return null;
}

function update_field() {
    // todo: update the display with the new map info
}

// handler for the buttons
function move_direction(evt) {
    // check if the player can actualy move to the targeted position
    let posible = movement_check(evt.target.direction);

    if (posible) {
        // move the player to the new place
        player_location = move_player(player_location, evt.target.direction);

        // update the playing field
        update_field();
    }

    console.log(player_location);
}

// for keypresses we can use one of the following listeners
// keydown, keypress, keyup
document.addEventListener("keypress", keypress_handler);

// movement button's
var north_button = document.getElementById("move_north");
var east_button = document.getElementById("move_east");
var south_button = document.getElementById("move_south");
var west_button = document.getElementById("move_west");

// array with all the buttons
var buttons = [north_button, east_button, south_button, west_button];

// set the event listener for all buttons with a button id
for (var i = 0; i < buttons.length; i++) {
    if (!buttons[i]) {
        // button doesnt exist on the page so dont add a listener
        continue;
    }

    // set the button id of the button
    buttons[i].direction = i;

    // add the click listener to the button
    buttons[i].addEventListener("click", move_direction);
}
