var rightAnswers = 0;
var wrongAnswers = 0;
var main = document.getElementById("main");
var submitButton = document.createElement("button");
submitButton.type = "button";
submitButton.textContent = "Submit";
var nextButton = document.createElement("button");
nextButton.type = "button";
nextButton.textContent = "Next";
var i = 0;
var begin = document.getElementById("begin");

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
  choices: ['Elliott Smith', 'Deerhoof', 'Bratmobile', 'Miranda July', 'Beat Happening'],
  correctAnswer: 4,
  explanation: "<img src='img/krs.jpg' alt='Kill Rock Stars'><br>Beat Happening was led by Calvin Johnson, founder of K Records - the 'other' Olympia label and the supposed archrival of Kill Rock Stars."
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
}
  ];


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
  main.innerHTML = "<div>" + quiz[i].explanation + "</div>";
    if (userAnswer == quiz[i].correctAnswer) {
        main.insertAdjacentHTML('afterbegin', '<h3 id="h3">Correct!</h3>');
        rightAnswers += 1;
      } else {
        main.insertAdjacentHTML('afterbegin', '<h3 id="h3">Incorrect!</h3>');
        wrongAnswers += 1;
      }
  var pcnt = (100 * rightAnswers / (wrongAnswers + rightAnswers)).toFixed(1);
  document.getElementById("results").innerHTML = 'Correct: ' + rightAnswers + '<br/>Incorrect: ' + wrongAnswers + '<br/>Percentage Correct: ' + pcnt + '%';
  main.appendChild(nextButton);
  i += 1;
});
}

begin.addEventListener('click', function () {
  main.innerHTML = '';
  displayQuiz(i);
});

nextButton.addEventListener('click', function () {
  main.innerHTML = '';
  displayQuiz(i);
});