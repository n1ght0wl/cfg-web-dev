const buttonQuiz = document.querySelector(".button-quiz");
const wrapperQuiz = document.querySelector(".wrapper-quiz");
const wrapperResult = document.querySelector(".wrapper-result");
const optionList = document.querySelector(".option-list");
const restartQuiz = wrapperResult.querySelector(".buttons .restart");
const quitQuiz = wrapperResult.querySelector(".buttons .quit");
const nextButton = document.querySelector(".button-next");
const questionCounter = document.querySelector(".question-total");
const modeSwitch = document.querySelector(".mode-switch");

let questionCount = 0;
let questionNumber = 1;
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let userFavs = [];
let resultText = "";
let resultLink = "";
let resultIcon;
let categories = [];
let myCategory = 0;

function swapStyleSheet(sheet){
  document.getElementById('theme').setAttribute('href', sheet);
  localStorage.setItem("sheet", sheet);
}

// window.onload = _ =>
//  swapStyleSheet(
//   localStorage.getItem("sheet") || "../css/main.css"
//  );

modeSwitch.onclick = () => {
  swapStyleSheet('../css/mardi.css');
};


function mostFrequent(arr, n) {
 
  let maxcount = 0;
  let maxoccur;
  for (let i = 0; i < n; i++) {
      let count = 0;
      for (let j = 0; j < n; j++) {
          if (arr[i] == arr[j])
              count++;
      }

      if (count > maxcount) {
          maxcount = count;
          maxoccur = arr[i];
      }
  }
  if (maxcount == 1) {
    return 5;
  }

  return maxoccur;
}

function calculateResult(userFavs) {
    let oneOrZero = (Math.random()>0.5)? 1 : 0;  
    for(let i = 0; i < questions.length; i++) {
      for(let j = 0; j < questions[i].options.length; j++) {
        if(userFavs[i] == questions[i].options[j].fav) {
          categories.push(questions[i].options[j].category)
        }
      }
    }
    myCategory = mostFrequent(categories, categories.length);
    console.log(myCategory)
    console.log(categories)
    resultText = favourites[myCategory - 1].options[oneOrZero].name;
    resultLink = favourites[myCategory - 1].options[oneOrZero].link;
    resultIcon = favourites[myCategory - 1].options[oneOrZero].icon;
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
  categories = [];
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
    questions[index].options[0].fav +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1].fav +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2].fav +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3].fav +
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



