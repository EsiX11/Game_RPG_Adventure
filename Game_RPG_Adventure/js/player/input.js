// class for the player position
class xy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// variable for storing the location of the player
var player_location = new xy(0, 0);

// handler for all the key presses
function keypress_handler(event) {
    console.log("Keyboard button pressed", event.keyCode);   
}

// handler for the buttons
function move_direction(evt) {
    switch (evt.target.direction) {
        case 0:
            player_location.y += 1;
            break;
        case 1:
            player_location.x += 1;
            break;
        case 2:
            player_location.y -= 1;
            break;
        case 3:
            player_location.x -= 1;
            break;
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