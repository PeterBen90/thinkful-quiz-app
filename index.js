const STORE = {
  questions: [
    {
      question: '1/10: Who wears the Iron Man suit?',
      answerList: ['Steve Rogers','Bruce Banner','Tony Stark','Donald Trump'],
      correctAnswer: 'Tony Stark'
    },
    {
      question: '2/10: Where does Vibranium come from?',
      answerList: ['Wakanda','America','Canada','Gotham City'],
      correctAnswer: 'Wakanda'
    },
    {
      question: '3/10: Incredible who?',
      answerList: ['Thor', 'Ultron','Spider Man','Hulk'],
      correctAnswer: 'Hulk'
    },
    {
      question: '4/10: Who is the Winder Soldier?',
      answerList: ['Bucky Barnes', 'Clark Kent', 'Tony Stark', 'Loki'],
      correctAnswer: 'Bucky Barnes'
    },
    {
      question: '5/10: How many Infinity Stones are there?',
      answerList: ['five','three','six','eight'],
      correctAnswer: 'six'
    },
    {
      question: '6/10: Who killed Quicksilver?',
      answerList: ['Ronan the Accuser','Ultron','Drax the Destroyer','Peter Quill'],
      correctAnswer: 'Ultron'
    },
    {
      question: '7/10: Who is Peter Quill\'s father?',
      answerList: ['Ego the Living Planet', 'David Quill', 'Yondu', 'Damien Dahrk'],
      correctAnswer: 'Ego the Living Planet'
    },
    {
      question: '8/10: Who is Wade Wilson?',
      answerList: ['Deathstroke','Deadpool','Wolverine','Sabertooth'],
      correctAnswer: 'Deadpool'
    },
    {
      question: '9/10: What planet is the Contest of Champions on?',
      answerList: ['Xandar','Earth','Sakaar','Asgard'],
      correctAnswer: 'Sakaar'
    },
    {
      question: '10/10: Who wears the Infinity Gauntlet in the Infinity Wars?',
      answerList: ['Loki','the Green Arrow','Thanos','the Grandmaster'],
      correctAnswer: 'Thanos'
   }],
currentQuestionIndex: 0,
score: 0,
wrong: 0,
};

//hide pages
function hideStart() {
  $('#js-quiz-page').hide();
  $('#js-results-page').hide();
  $('#js-feedback-correct').hide();
  $('#js-feedback-incorrect').hide();
}

//shows start page and handles start button
function quizStart() {
  $('#start-button').on('click', function(event){
    event.preventDefault();
    $('#js-starting-screen').hide();
    renderQuestion();
    console.log('`quizStart` ran');
  });
}

//renders new question
function renderQuestion() {
  $('#js-feedback-correct').hide();
  $('#js-feedback-incorrect').hide();
  $('#js-quiz-page').show();
  $('#quiz-page-form').html("");
  let currentQuestion = STORE.questions[STORE.currentQuestionIndex];
  console.log(currentQuestion);
  $('.question-title').text(currentQuestion.question);
  currentQuestion.answerList.forEach((answer) => {
    $('#quiz-page-form').append(`
          <label class="answer">
            <input type="radio" name="option" class="js-quiz-option-button" value="${answer}">
            <span class="js-quiz-option">"${answer}"</span>
          </label><br>
          `);
  });
  $('#score-counter').html("");
  $('#score-counter').append(`<p>Correct: ${STORE.score} | Incorrect: ${STORE.wrong}</p>`);
  console.log('`renderQuestion` ran');
}

//handles question submission and feedback
function handleFeedback() {
  $('#submit-button').on('click', function(event) {
    event.preventDefault();
    $('.error-message').hide();
    let currentQuestion = STORE.questions[STORE.currentQuestionIndex];
    let scoreCounter = STORE.score + 1;
    let answerVal = currentQuestion.correctAnswer;
    let inputVal = $('input:radio[name=option]:checked').val();
    if (answerVal == inputVal) {
      $('#js-quiz-page').hide();
      $('#js-feedback-correct').show();
      $('.current-correct').html("");
      $('.current-correct').append(`<h4>${scoreCounter} question(s)</h4>`);
      STORE.score++;
    }
    else if (inputVal === undefined) {
      $('.error-message').show();
      $('.error-message').text("Please select an answer!");
      STORE.currentQuestionIndex--;
    }
    else {
      $('#js-quiz-page').hide();
      $('#js-feedback-incorrect').show();
      $('.number-correct').html("");
      $('.number-correct').append(`<h4>"${answerVal}"</h4>`);
      STORE.wrong++;
    }
  STORE.currentQuestionIndex++;
  });
  console.log('`handleFeedback` ran');
}

//loads quiz results page
function handleQuizResult() {
  $('.next-button').on('click', function(event){
    handleQuizResult();
  });
  if (STORE.currentQuestionIndex === STORE.questions.length) {
    $('#final-correct').html("");
    $('#final-correct').append(`<h4>You got ${STORE.score} out of 10 correct!</h4>`);
    $('#js-results-page').show();
    $('#js-quiz-page').hide();
    $('#js-feedback-correct').hide();
    $('#js-feedback-incorrect').hide();
    $('#js-starting-screen').hide();
  } else {
    renderQuestion();
  }
  console.log('handleQuizResult` ran');
}

//restarts entire quiz when restart button is clicked
function quizRestart() {
    $('#restart-quiz-button').on('click', function(event){
      location.reload();
    });
  console.log('quizRestart` ran');
}

quizStart();
handleFeedback();
handleQuizResult();
quizRestart();
hideStart();
