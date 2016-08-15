var pcnt;
var i;
var rightAnswers = 0;
var wrongAnswers = 0;
var main = document.getElementById("main");
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

var quiz = [{
  question: "Pavement's original drummer was:",
  choices: ['Gary Young', 'John Bonham', 'Neil Peart', 'Animal', 'Josh Freese'],
  correctAnswer: 0,
  explanation: "<img src='img/pavement.jpg' alt='Pavement'><br>Gary Young played drums in Pavement from 1989-1993 and recorded the band's groundbreaking early work at Louder Than You Think, his home studio in Stockton, CA."
}, {
  question: "The two principal members of Royal Trux went on to form all of the following bands except:",
  choices: ['The Howling Hex', 'Black Bananas', 'RTX', 'XTC', 'Hagerty-Toth Band'],
  correctAnswer: 3,
  explanation: '<img src="img/royaltrux.jpg" alt="Royal Trux"><br>Jennifer Herrema and Neil Hagerty have each formed several new outfits, but to date neither has performed or recorded with British rock band XTC.'
}, {
  question: "Bill Callahan, aka Smog, wrote a zine by the name of:",
  choices: ['Disaster', 'Proclivity', 'Supper', 'Apocalypse', 'Forced Exposure'],
  correctAnswer: 0,
  explanation: "<img src='img/disaster.jpg' alt='Disaster, the zine'><br>Bill's zine was called Disaster, and so was the label on which he self-released his early recordings."
}, {
  question: "Pacific Northwest record label Kill Rock Stars released albums by all the following except:",
  choices: ['Elliott Smith', 'Deerhoof', 'Bratmobile', 'Miranda July', 'Dub Narcotic Sound System'],
  correctAnswer: 4,
  explanation: "<img src='img/krs.jpg' alt='Kill Rock Stars'><br>Dub Narcotic Sound System was led by Calvin Johnson, founder of K Records - the 'other' Olympia label and the supposed archrival of Kill Rock Stars."
}, {
  question: "Singer and guitarist Chan Marshall records and performs under the name:",
  choices: ['Witchypoo', 'Cat Power', 'Courtney Love', 'Flying Nun', 'Slim Moon'],
  correctAnswer: 1,
  explanation: "<img src='img/catpower.jpg' alt='Cat Power'><br>Chan Marshall is, of course, better known as Cat Power, and is shown here demonstrating her own impeccable taste in '90s indie rock."
}, {
  question: "Dale Crover has played drums for which of the following bands?",
  choices: ['Guided by Voices and R.E.M.', 'Palace Brothers and King Kong', 'Murder City Devils and Lungfish', 'Melvins and Nirvana', 'Sebadoh and Dinosaur Jr.'],
  correctAnswer: 3,
  explanation: "<img src='img/crover.jpg' alt='Crover'><br><br>Mister Crover is the longtime drummer of the Melvins and played on some of Nirvana's earliest recordings."
}, {
  question: "Tortoise is from:",
  choices: ['Los Angeles', 'Phoenix', 'Chicago', 'Berlin', 'New Paltz'],
  correctAnswer: 2,
  explanation: "<img src='img/tortoise.jpg' alt='Tortoise'><br>Like the Bears and the Bulls, the band Tortoise is a venerable Chicago institution."
}, {
  question: "The Elephant Six Collective included all of the following bands except:",
  choices: ['Olivia Tremor Control', 'Neutral Milk Hotel', 'Apples In Stereo', 'Elf Power', 'Superchunk'],
  correctAnswer: 4,
  explanation: "<img src='img/elephant6.jpg' alt='Elephant 6'><br>The Elephant Six tentacles spread far and wide, but Superchunk has never been associated with the Athens crew."
}, {
  question: "Two members of Blonde Redhead are:",
  choices: ['Psychics', 'Twins', 'Attorneys', 'Sisters', 'Cousins'],
  correctAnswer: 1,
  explanation: "<img src='img/blonderedhead.jpg' alt='Blonde Redhead'><br>Simone and Amedeo Pace are twin brothers. According to legend, vocalist/guitarist Kazu Makino demanded that one of them grow a mustache so she could tell them apart."
}, {
  question: "Chris Lombardi is the founder of:",
  choices: ['Matador Records', 'Homestead Records', 'Drag City Records', 'DGC Records', 'Merge Records'],
  correctAnswer: 0,
  explanation: "<img src='img/chrislombardi.jpg' alt='Chris Lombardi'><br>Suave gentleman Chris Lombardi founded Matador Records in New York City in 1989. Now he is rich!"
}];

function welcome() {
  main.innerHTML = "<p>Ready to test your knowledge of 1990s indie rock culture? These ten probing questions will determine whether you have what it takes to properly reminisce with the disaffected slackers of yesteryear.</p>";
  main.appendChild(beginButton);
}

i = JSON.parse(localStorage.getItem("currentPage"));
if (i === null || i === undefined) {
  i = 0;
  welcome();
} else if (i === quiz.length) {
  reset();
  welcome();
} else {
  i = JSON.parse(localStorage.getItem("currentPage"));
  displayQuiz(i);
}

if (rightAnswers == null) {
  rightAnswers = 0;
} // prevent scoreboard from displaying "null" after a page refresh

if (wrongAnswers == null) {
  wrongAnswers = 0;
} // prevent scoreboard from displaying "null" after a page refresh

function displayQuiz() {
  main.innerHTML = '';
  var quizContainer = document.createElement('div');
  quizContainer.innerHTML = "<p>" + quiz[i].question + "</p>";
  var options = quiz[i].choices;
  for (var k = 0; k < options.length; k++) {
    var radio = document.createElement('input');
    radio.type = "radio";
    radio.value = options[k];
    radio.name = "question"+i;
    radio.id = options.indexOf(options[k]);
    quizContainer.appendChild(radio);
    var label = document.createElement('label');
    label.innerHTML = options[k];
    quizContainer.appendChild(label);
    quizContainer.appendChild(document.createElement('br'));
}

  main.appendChild(quizContainer);
  main.appendChild(submitButton);
  submitButton.addEventListener('click', function checkAnswer() {
  'use strict';
  var userAnswer = document.querySelector('input:checked').id;
  localStorage.setItem("userAnswer", JSON.stringify(userAnswer));
  userAnswer = JSON.parse(localStorage.getItem("userAnswer"));
  main.innerHTML = "<div>" + quiz[i].explanation + "</div>";
    if (userAnswer == quiz[i].correctAnswer) {
        main.insertAdjacentHTML('afterbegin', '<h3 id="h3">Correct!</h3>');
        rightAnswers += 1;  
        localStorage.setItem("currentRightAnswers", rightAnswers);
        rightAnswers = JSON.parse(localStorage.getItem("currentRightAnswers"));
      } else {
        main.insertAdjacentHTML('afterbegin', '<h3 id="h3">Incorrect!</h3>');
        wrongAnswers += 1;
        localStorage.setItem("currentWrongAnswers", wrongAnswers);
      }

  showResults();
  i += 1;  
  localStorage.setItem("currentPage", i);
  if (i === quiz.length) {
    displayResults();
  } else {
    main.appendChild(nextButton);
    results.appendChild(clearButton);
  }
});
}

function showResults () {
  pcnt = (100 * rightAnswers / (wrongAnswers + rightAnswers)).toFixed();
  results.innerHTML = 'Correct: ' + rightAnswers + '<br>Incorrect: ' + wrongAnswers + '<br>';
  results.appendChild(clearButton);
}

function displayResults() {
  results.innerHTML = 'Correct: ' + rightAnswers + '<br>Incorrect: ' + wrongAnswers + '<br>Percentage Correct: ' + pcnt + '%<br>';
  results.insertAdjacentHTML('beforeend', '<br><h3>Results</h3>');
  if (pcnt <= 20) {
    results.insertAdjacentHTML('beforeend', 'Novice (0-20%): You are blissfully unaware of this period in music history, and probably better off for it.');
  } else if (pcnt <= 40) {
    results.insertAdjacentHTML('beforeend', 'Poseur (21-40%): Your trucker cap is weathered, but your knowledge is minimal.');
  } else if (pcnt <= 60) {
    results.insertAdjacentHTML('beforeend', 'Dilettante (41-59%): You may not have owned any zines, tapes or vinyl in the 1990s, but you have done some online research.');
  } else if (pcnt <= 80) {
    results.insertAdjacentHTML('beforeend', 'Nerd (60-79%): You were there, but you were killing brain cells at the time and there’s a lot you don’t recall.');
  } else if (pcnt < 99) {
    results.insertAdjacentHTML('beforeend', 'Expert (80-99%): Your knowledge is impressive, albeit useless.');
  } else {
    results.insertAdjacentHTML('beforeend', 'Omniscient Genius (100%): You deserve a medal, or a sealed first-pressing of “Spiderland.”');
  }
  results.insertAdjacentHTML('beforeend', '<br>')
  results.appendChild(clearButton);
}

function reset() {
  localStorage.clear();
  rightAnswers = 0;
  wrongAnswers = 0;
  i = 0;
  main.innerHTML = '';
  results.innerHTML = '';
}

window.onbeforeunload = (
  showResults()
);

beginButton.addEventListener('click', function () {
  main.innerHTML = '';
  displayQuiz(i);
});

nextButton.addEventListener('click', function () {
  main.innerHTML = '';
  displayQuiz(i);
});

clearButton.addEventListener('click', function () {
  reset();
  welcome();
});