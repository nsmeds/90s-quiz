var pcnt;
var count;
var rightAnswers = 0;
var wrongAnswers = 0;
var quizContainer = document.getElementById("quiz-container");
var results = document.getElementById("results");
var beginButton = document.createElement("button");
beginButton.type = "button";
beginButton.textContent = "Begin!";
var submitButton = document.createElement("button");
submitButton.type = "button";
submitButton.textContent = "Submit";
var nextButton = document.createElement("button");
nextButton.type = "button";
nextButton.textContent = "Next";
var clearButton = document.createElement("button");
clearButton.type = "button";
clearButton.textContent = "Start Over";
clearButton.id = "clear-button";
rightAnswers = JSON.parse(localStorage.getItem("currentRightAnswers"));
wrongAnswers = JSON.parse(localStorage.getItem("currentWrongAnswers"));


function welcome() {
  results.style.display = 'none';
  quizContainer.innerHTML = "<p>Ready to test your knowledge of 1990s indie rock culture? These ten probing questions will determine whether you have what it takes to properly reminisce with the disaffected slackers of yesteryear.</p>";
  quizContainer.appendChild(beginButton);
  quizContainer.style.textAlign = 'center';
  quizContainer.style.maxWidth = '600px';
}

function randomize(arr) {
  arr.sort(function() {
    return Math.random() - 0.5;
  });
};

count = JSON.parse(localStorage.getItem("currentPage"));
if (!count) {
  count = 0;
  welcome();
} else if (count === quiz.length) {
  reset();
  welcome();
} else {
  count = JSON.parse(localStorage.getItem("currentPage"));
  displayQuiz(count);
}

if (!rightAnswers) {
  rightAnswers = 0;
} // prevent scoreboard from displaying "null" after a page refresh

if (!wrongAnswers) {
  wrongAnswers = 0;
} // prevent scoreboard from displaying "null" after a page refresh

function displayQuiz() {
  quizContainer.innerHTML = "<p>" + (count + 1) + ". " + quiz[count].question + "</p>";
  var options = quiz[count].choices;
  for (var k = 0; k < options.length; k++) {
    var radio = document.createElement('input');
    radio.type = "radio";
    radio.value = options[k];
    radio.name = "question"+count;
    radio.id = options.indexOf(options[k]);
    radio.className = "radio";
    var label = document.createElement('label');
    label.appendChild(radio);
    label.insertAdjacentHTML ('beforeend', options[k]);
    quizContainer.appendChild(label);
    quizContainer.appendChild(document.createElement('br'));
  }

  quizContainer.appendChild(submitButton);
  submitButton.addEventListener('click', function checkAnswer() {
    'use strict';
    var userAnswer = document.querySelector('input:checked').id;
    localStorage.setItem("userAnswer", JSON.stringify(userAnswer));
    userAnswer = JSON.parse(localStorage.getItem("userAnswer"));
    quizContainer.innerHTML = "<div>" + quiz[count].explanation + "</div>";
    if (userAnswer === quiz[count].correctAnswer) {
      quizContainer.insertAdjacentHTML('afterbegin', '<h3>Correct!</h3>');
      rightAnswers += 1;  
      localStorage.setItem("currentRightAnswers", rightAnswers);
      rightAnswers = JSON.parse(localStorage.getItem("currentRightAnswers"));
    } else {
      quizContainer.insertAdjacentHTML('afterbegin', '<h3>Incorrect!</h3>');
      wrongAnswers += 1;
      localStorage.setItem("currentWrongAnswers", wrongAnswers);
    }

    showResults();
    count += 1;  
    localStorage.setItem("currentPage", count);
    if (count === quiz.length) {
      displayResults();
    } else {
      quizContainer.appendChild(nextButton);
      document.getElementById("scoreboard").appendChild(clearButton);
    }
  });
}

function showResults () {
  pcnt = (100 * rightAnswers / (wrongAnswers + rightAnswers)).toFixed();
  results.innerHTML = '<div id="scoreboard">Correct: <span class="right">' + rightAnswers + '</span><br>Incorrect:  <span class="wrong">' + wrongAnswers + '</span><br></div>';
  if (pcnt >= 0) {
    document.getElementById("scoreboard").insertAdjacentHTML('beforeend','<br>Score: ' + pcnt + '%<br>');
  }
  document.getElementById("scoreboard").appendChild(clearButton);
}

function displayResults() {
  results.insertAdjacentHTML('beforeend', '<br><h3>Results</h3>');
  if (pcnt <= 20) {
    results.insertAdjacentHTML('beforeend', 'Novice (0-20%): You are blissfully unaware of this period in music history, and probably better off for it.');
  } else if (pcnt <= 40) {
    results.insertAdjacentHTML('beforeend', 'Poseur (21-40%): Your trucker cap is weathered, but your knowledge is minimal.');
  } else if (pcnt <= 60) {
    results.insertAdjacentHTML('beforeend', 'Dilettante (41-60%): You may not have owned any zines, tapes or vinyl in the 1990s, but you have done some online research.');
  } else if (pcnt <= 80) {
    results.insertAdjacentHTML('beforeend', 'Nerd (61-80%): You were there at the time, but your memory is a little fuzzy.');
  } else if (pcnt < 99) {
    results.insertAdjacentHTML('beforeend', 'Expert (81-99%): Your knowledge is impressive, albeit useless.');
  } else {
    results.insertAdjacentHTML('beforeend', 'Omniscient Genius (100%): You deserve a medal, or a sealed first-pressing of “Spiderland.”');
  }
  results.insertAdjacentHTML('beforeend', '<br>');
  document.getElementById("scoreboard").appendChild(clearButton);
}

function reset() {
  localStorage.clear();
  rightAnswers = 0;
  wrongAnswers = 0;
  count = 0;
  quizContainer.innerHTML = '';
  results.innerHTML = '';
  randomize(quiz);
}

window.onbeforeunload = (
  showResults()
); // prevent scoreboard from disappearing on page refresh

beginButton.addEventListener('click', function () {
  quizContainer.innerHTML = '';
  quizContainer.style.textAlign = 'left';
  results.style.display = 'block';
  randomize(quiz);
  displayQuiz(count);
  showResults();
});

nextButton.addEventListener('click', function () {
  quizContainer.innerHTML = '';
  displayQuiz(count);
});

clearButton.addEventListener('click', function () {
  reset();
  welcome();
});