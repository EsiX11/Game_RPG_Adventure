function move() {
    var x = document.getElementById("move");
    if (x.style.display === "none") {
        x.style.display = "inline-block";
    }
    else {
        x.style.display = "none";
    }
}
var storyNumber = -1;
var headerNumber = 0;
function story(number, headerNumber) {
    if (number < 0){
        storyNumber = 0;
        number = 0;
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
        if (number >= storyHeader.length){
            number = storyHeader.length - 1;
            console.log("Uuhm")
        }
        storyBox.innerHTML = storyHeader[number];
        console.log(number);
        }
    }
    jFile.send();

}