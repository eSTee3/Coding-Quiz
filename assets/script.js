// String of questions and answers
var questions = [
    {
        question: "What shortcut can be used, to start an HTML file with a default template?",
        answers: ["Excalamation Point", "Ctrl+Shift+/", "Alt+F4", "Space+Eject"],
        correctAnswer: "An excalamation point"
    },
    {
        question: "What does the word 'repo' mean, within git?",
        answers: ["Reposessed", "Repolorization", "Repository", "Repopulate"],
        correctAnswer: "Repository"
    },
    {
        question: "How do you return the 3rd item in an array?",
        answers: ["Ask it nicely", "With the number 2", "With the number 3", "all of the above"],
        correctAnswer: "With the number 2"
    },
    {
        question: "What are the 3 standard file types that make up a basic web page?",
        answers: [".exe, .csv and .mp4 files", "manilla, x and personal files", ".xlsx, .doc and .ppi files", ".html, .css and .js files"],
        correctAnswer: ".html, .css and .js files"
    },
    {
        question: "What type of device works best for coding?",
        answers: ["Windows PC", "Apple Computer", "Linux Computer", "All of the above"],
        correctAnswer: "All of the above"
    },

];

var score = 0;
var questionIndex = 0;
var startTimer = document.querySelector("#timer");
var startQuiz = document.querySelector("#quizStart");
var questionsDiv = document.querySelector("#questionsDiv");
var entirePage = document.querySelector("#entirePage");
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

startQuiz.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            startTimer.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                startTimer.textContent = "Time is up, try again!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].answers;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].correctAnswer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].correctAnswer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].correctAnswer;
        }

    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
function allDone() {
    questionsDiv.innerHTML = "";
    startTimer.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Great Job!"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./results.html");
        }
    });

}


