let questions = [
  {
    title: "Inside which HTML elemtns do we put JavaScript:",
    choices: ["<javascript>", "<script>", "<scripting>", "<js>"],
    answer: "<script>"
  },
  {
    title: "The external JavaScript file must contain the <script> tag",
    choices: ["True", "False"],
    answer: "False"
  },
  {
    title: "How do you create a function in JavaScript?",
    choices: [
      "function = myFunction()",
      "function myFunction()",
      "function:myFunction()",
    
    ],
    answer: "function myFunction()"
  },
  {
    title: "How do you call a function named myFunction?",
    choices: [
      "call myFunction ()",
      "myFunction()",
      "call function myFunction()",
    
    ],
    answer: "myFunction()"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  }
];

let currentQuestionIndex = 0
let time = questions.length * 10;
let timerId;

let questionsEl = document.querySelector("#questions");
let timer = document.getElementById("time");
let choices = document.getElementById("choices");
let submit = document.getElementById("submit");
let startButton = document.getElementById("start");
let initials = document.getElementById("initials");
let feedback = document.getElementById("feedback");

let sfxRight = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  let startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  timer.textContent = time;

  getQuestion();
}

function getQuestion() {
  let currentQuestion = questions[currentQuestionIndex];

  let title = document.getElementById("question-title");
  title.textContent = currentQuestion.title;

  choices.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {

    let choiceNode = document.createElement("button");
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

    feedback.textContent = "Wrong!";
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

  let endScreen = document.getElementById("end-screen");
  endScreen.removeAttribute("class");

  let finalScore = document.getElementById("final-score");
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
  initials = initials.value.trim();

  if (initials !== "") {
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    let newScore = {
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
