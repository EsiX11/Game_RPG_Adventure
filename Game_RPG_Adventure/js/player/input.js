// handler for all the key presses
function keypress_handler(event) {
    console.log("Keyboard button pressed", event.keyCode);   
}

// handler for the buttons
function move_direction(evt) {
    // print the button id
    console.log("Button pressed", evt.target.button_id);
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
    buttons[i].button_id = i;

    // add the click listener to the button
    buttons[i].addEventListener("click", move_direction);
}
