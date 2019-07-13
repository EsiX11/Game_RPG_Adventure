﻿function move() {
    var x = document.getElementById("move");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
    }
    else {
        x.style.display = "none";
    }
}
var storyNumber = 0;
function story() {
    var url = "https://esix11.github.io/Game_RPG_Adventure/Game_RPG_Adventure/json/story.json";

    const jFile = new XMLHttpRequest();
    jFile.open('GET', url);
    jFile.responseType = 'json';
    jFile.onload = function(e) {
      if (this.status == 200) {
        var json = this.response;
        var storyBox = document.getElementById("storyText");
        storyBox.innerHTML = json[json.header + storyNumber];
        console.log(storyNumber);
        storyNumber++;
        }
    }
    jFile.send();
}