var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#resetScores");
var startOver = document.querySelector("#startOver");
 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}
startOver.addEventListener("click", function () {
    // the 2 dots before index.html force the code to go up a folder level
    window.location.replace("../index.html");
});