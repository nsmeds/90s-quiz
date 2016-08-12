window.onload = function () {
  'use strict';
  var correct = 0,
    incorrect = 0,
    current = 0,
    quiz = document.getElementById('quiz'),
    begin = document.getElementById('begin-button'),
    fieldset = document.getElementsByTagName('fieldset'),
    results = document.getElementsByClassName('results'),
    submitButton = document.getElementById('submit-button'),
    nextButton = document.getElementById('next-button'),
    radios = document.getElementsByTagName('input');

  function checkAnswer() {
    if (radios.value == 'x') {
      if (radios.checked === true) {
        correct += 1;
        quiz.insertAdjacentHTML('afterbegin', '<h3 id="h3">Correct!</h3>');
      } else {
        incorrect += 1;
        quiz.insertAdjacentHTML('afterbegin', '<h3 id="h3">Incorrect!</h3>');
      }
    }
    current += 1;
    results[current].style.display = 'flex';
    submitButton.style.display = 'none';
    nextButton.style.display = 'flex';
  }

  
  function submit() {
    submitButton.addEventListener('click', function (event) {
      event.preventDefault();
      fieldset[current].style.display = 'none';
      results[current].style.display = 'flex';
      checkAnswer();
    });
  }
 
  function displayQuiz() {
    for (var i = 0; i <= fieldset.length; i++) {
      nextButton.style.display = 'none';
      fieldset[current].style.display = 'flex';
      submitButton.style.display = 'flex';
      submit();
    }
  }
  
  begin.addEventListener('click', function (event) {
    document.getElementById('welcome').style.display = 'none';
    displayQuiz();
  });

  nextButton.addEventListener('click', function (event) {
    document.getElementById('h3').innerHTML = '';
    results.style.display = 'none';
    displayQuiz();
  });
};