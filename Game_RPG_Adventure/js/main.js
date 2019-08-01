function move() {
    var x = document.getElementById("move");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
    }
    else {
        x.style.display = "none";
    }
}
function hideButtonNext() {
    var x = document.getElementById("buttonNext");
    x.style.display = "none";
}
function showButtonNext() {
    var x = document.getElementById("buttonNext");
    x.style.display = "inline-block";
}
function hideButtonBack() { 
    var x = document.getElementById("buttonBack");
    x.style.display = "none";
}
function showButtonBack() { 
    var x = document.getElementById("buttonBack");
    x.style.display = "inline-block";

}
var storyNumber = -1;
var headerNumber = 0;
function story(number, headerNumber) {
    if (number < 1){
        hideButtonBack();
    }
    if (number < 0){
        storyNumber = 0;
        number = 0;
    }
    if (number === 1){
        showButtonBack();
    }
    var url = "https://esix11.github.io/Game_RPG_Adventure/Game_RPG_Adventure/json/story.json";
    const jFile = new XMLHttpRequest();
    jFile.open('GET', url);
    jFile.responseType = 'json';
    jFile.onload = function(e) {
      if (this.status == 200) {
        var json = this.response;
        var storyBox = document.getElementById("storyText");
        var storyHeader = json[json.header+headerNumber];
        if (number < storyHeader.length){
            showButtonNext();
        }
        if (number >= storyHeader.length - 1){
            hideButtonNext();
        }
        if (number >= storyHeader.length){
            number = storyHeader.length - 1;
        }
        storyBox.innerHTML = storyHeader[number];
        }
    }
    jFile.send();
}
function darkTheme(){
    var x = document.getElementById("css").href="css/darkTheme.css";
}
function lightTheme(){
    var x = document.getElementById("css").href="css/lightTheme.css";
}