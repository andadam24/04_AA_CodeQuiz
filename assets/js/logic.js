const question = document.querySelector("question");
var timer = document.getElementById("time");
const choices = document.getElementById("choices");
var submit = document.getElementById("submit");
var startButton = document.getElementById("start-btn");
var initials = document.getElementById("initials");
var feedback = document.getElementById("feedback");

var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");

  questions.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  timer.textContent = time;

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var title = document.getElementById("question-title");
  title.textContent = currentQuestion.title;

  choices.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {

    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    choices.appendChild(choiceNode);
  });
}

function questionClick() {

  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    timer.textContent = time;

    sfxWrong.play();

    feedbackEl.textContent = "Wrong!";
  } else {
    sfxRight.play();

    feedback.textContent = "Correct!";
  }

  feedback.setAttribute("class", "feedback");
  setTimeout(function() {
    feedback.setAttribute("class", "feedback hide");
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);

  var endScreen = document.getElementById("end-screen");
  endScreen.removeAttribute("class");

  var finalScore = document.getElementById("final-score");
  finalScore.textContent = time;


  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timer.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = initials.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

submit.onclick = saveHighscore;

startButton.onclick = startQuiz;

initials.onkeyup = checkForEnter;
