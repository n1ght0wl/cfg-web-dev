const buttonQuiz = document.querySelector(".button-quiz");
const wrapperQuiz = document.querySelector(".wrapper-quiz");
const wrapperResult = document.querySelector(".wrapper-result");
const optionList = document.querySelector(".option-list");
const restartQuiz = wrapperResult.querySelector(".buttons .restart");
const quitQuiz = wrapperResult.querySelector(".buttons .quit");
const nextButton = document.querySelector(".button-next");
const questionCounter = document.querySelector(".question-total");

let questionCount = 0;
let questionNumber = 1;
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let userFavs = [];
let resultText = "";
let resultLink = "";
let resultIcon;

function calculateResult(userFavs) {
    let oneOrZero = (Math.random()>0.5)? 1 : 0;  
    console.log(userFavs)
    for (let i = 0; i < favourites.length; i++) {
        if(favourites[i].drink == userFavs[0]) {
            if(userFavs[0] == "Herbal tea" && (userFavs[1] == "Seared salmon" || userFavs[2] == "Long walks")) {
                console.log("first");
                resultText = favourites[0].options[oneOrZero].name;
                resultLink = favourites[0].options[oneOrZero].link;
                resultIcon = '<i class="fa-solid fa-spa"></i>';
            } else if(userFavs[0] == "Tequila" && (userFavs[1] == "Doner kebab" || userFavs[2] == "Partying!")) {
                console.log("sec");
                resultText = favourites[1].options[oneOrZero].name;
                resultLink = favourites[1].options[oneOrZero].link;
                resultIcon = '<i class="fa-solid fa-martini-glass-citrus"></i>';
            } else if(userFavs[0] == "Espresso" && (userFavs[1] == "Linguine ai gamberi" || userFavs[2] == "Visiting museums")) {
                console.log("fthird");
                resultText = favourites[2].options[oneOrZero].name;
                resultLink = favourites[2].options[oneOrZero].link;
                resultIcon = '<i class="fa-solid fa-building-columns"></i>';
            } else if(userFavs[0] == "Mojito" && (userFavs[1] == "Night market food" || userFavs[2] == "Bungee jumping")) {
                console.log("fourth");
                resultText = favourites[3].options[oneOrZero].name;
                resultLink = favourites[3].options[oneOrZero].link;
                resultIcon = '<i class="fa-solid fa-volcano"></i>';
            } else {
                console.log("last");
                resultText = "New York USA";
                resultLink = "https://www.nycgo.com/";
                resultIcon = '<i class="fa-solid fa-plane-departure"></i>';
            }
        }
    }  
}

function optionSelected(answer) {
  let userAns = answer.textContent;
  const allOptions = optionList.children.length;
  answer.classList.add("correct");
  answer.insertAdjacentHTML("beforeend", tickIconTag);
  userFavs.push(userAns);
  for (i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextButton.classList.add("show");
}

function setter() {
  showQuestions(questionCount);
  setQuestionCounter(questionNumber);
  nextButton.classList.remove("show");
}

function resetter() {
  wrapperResult.classList.remove("activeResult");
  questionCount = 0;
  questionNumber = 1;
  userFavs = [];
}

function setQuestionCounter(index) {
  let totalQuestionCountTag =
    "<span><p>" + index + "</p> of <p>" + questions.length + "</p></span>";
  questionCounter.innerHTML = totalQuestionCountTag;
}

function showQuestions(index) {
  const textQuiz = document.querySelector(".text-quiz");
  let questionTag = "<span>" + questions[index].question + "</span>";
  let optionTag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  textQuiz.innerHTML = questionTag;
  optionList.innerHTML = optionTag;

  const options = optionList.querySelectorAll(".option");

  for (i = 0; i < options.length; i++) {
    options[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function showResult() {
  wrapperQuiz.classList.remove("activeQuiz");
  wrapperResult.classList.add("activeResult");
  const scoreText = wrapperResult.querySelector(".text-score");
  const completeText = wrapperResult.querySelector(".text-complete");
  const resultBoxIcon = wrapperResult.querySelector(".icon-result");
  calculateResult(userFavs);
  let iconTag = resultIcon;
  let completeTag = "<p><span>" + resultText + "</span></p>";;
  let scoreTag =
    '<span class="travel-link"><a href="' +
    resultLink +
    '" target="_blank">Travel now</a></span>';
  completeText.innerHTML = completeTag;
  scoreText.innerHTML = scoreTag;
  resultBoxIcon.innerHTML = iconTag;
  userCookie = [];
}

buttonQuiz.onclick = () => {
  wrapperQuiz.classList.add("activeQuiz");
  showQuestions(0);
  setQuestionCounter(1);
};

restartQuiz.onclick = () => {
  wrapperQuiz.classList.add("activeQuiz");
  resetter();
  setter();
};

quitQuiz.onclick = () => {
  wrapperQuiz.classList.remove("activeQuiz");
  resetter();
};

nextButton.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNumber++;
    setter();
  } else {
    showResult();
  }
};



