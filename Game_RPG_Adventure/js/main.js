function move() {
    var x = document.getElementById("move");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
    }
    else {
        x.style.display = "none";
    }
}
function story() {
    var x = document.getElementById("storyText");
    x.innerHTML = "You're now looking around";
}
function darkTheme(){
    var x = document.getElementById("css").href="css/darkTheme.css";
}
function lightTheme(){
    var x = document.getElementById("css").href="css/lightTheme.css";
}