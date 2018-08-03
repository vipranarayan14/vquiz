const quizContainerEle = document.querySelector('.quiz-container');
const quizProgressEle = quizContainerEle.querySelector('.quiz-progress>div');

quizContainerEle.classList.add('quiz-start');

const quizQuestionsForm = quizContainerEle.querySelector('.quiz-questions-form');

questions.forEach((quizQuestion, index) => {

  const questionNumber = index + 1;

  let html = `
    <div id="quiz-question-card-${questionNumber}" class="quiz-question-card">
      <div class="quiz-question">
        <h3>${quizQuestion.question}</h3>
      </div>

      <div class="quiz-choices">    
  `;

  quizQuestion.choices.forEach((choice, choiceIndex) => {

    const choiceNumber = choiceIndex + 1;

    html += `   
    <div class="quiz-choice">
      <input 
        type="radio" 
        name="question-${questionNumber}-choices" 
        id="radio--question-${questionNumber}-choice-${choiceNumber}"
      >
      <label 
        id="label--question-${questionNumber}-choice-${choiceNumber}"
        for="radio--question-${questionNumber}-choice-${choiceNumber}"
      >
      ${choice}
      </label>
    </div>`

  });


  html += `</div></div>`;

  quizQuestionsForm.insertAdjacentHTML('beforeend', html);

});

let currQuestionNumber = 1;

const handleFirstQuestion = questionNumber => {

  if (questionNumber === 1) {

    quizContainerEle.classList.add('quiz-first-question');

  } else {

    quizContainerEle.classList.remove('quiz-first-question');

  }

};

const handleLastQuestion = questionNumber => {

  if (questionNumber === questions.length) {

    quizContainerEle.classList.add('quiz-last-question');

  } else {

    quizContainerEle.classList.remove('quiz-last-question');

  }

};

const setNavState = questionNumber => {

  if (quizContainerEle.classList.contains('quiz-inprogress')) {

    handleFirstQuestion(questionNumber);

    handleLastQuestion(questionNumber);

  }

};

const roundToTwo = num => +(Math.round(num + "e+2") + "e-2");

const updateProgress = questionNumber => {

  const quizProgressPercent = roundToTwo(questionNumber / questions.length) * 100;

  quizProgressEle.style.width = quizProgressPercent + '%';

};

const hideAllQuestionCards = () => {

  quizQuestionsForm.querySelectorAll('.quiz-question-card').forEach(

    quizQuestionCard => quizQuestionCard.style.display = 'none'

  );

};

const showQuestionCard = (num = 1) => {

  hideAllQuestionCards();

  quizQuestionsForm.querySelector(`#quiz-question-card-${num}`).style.display = 'block';

  setNavState(num);

  updateProgress(num);

};

const showNextQuestionCard = () => {

  currQuestionNumber = (currQuestionNumber < questions.length) ? currQuestionNumber + 1 : currQuestionNumber;

  showQuestionCard(currQuestionNumber);

}

const showPrevQuestionCard = () => {

  currQuestionNumber = (currQuestionNumber > 1) ? currQuestionNumber - 1 : currQuestionNumber;

  showQuestionCard(currQuestionNumber);

}

const startQuiz = () => {

  quizContainerEle.classList.replace('quiz-start', 'quiz-inprogress');

  showQuestionCard();

};

const endQuiz = () => {

  const choiceEles = quizQuestionsForm.querySelectorAll('.quiz-choice>input[type=radio]');

  choiceEles.forEach(choiceEle => choiceEle.setAttribute('disabled', 'true'));

  quizContainerEle.classList.remove('quiz-first-question');
  quizContainerEle.classList.remove('quiz-last-question');
  quizContainerEle.classList.replace('quiz-inprogress', 'quiz-end');

}

const showAnswers = () => {

  questions.forEach((quizQuestion, index) => {

    const questionNumber = index + 1;

    const correctAnswer = quizQuestionsForm
      .querySelector(`#quiz-question-card-${questionNumber} #label--question-${questionNumber}-choice-${quizQuestion.answer}`);

    correctAnswer.classList.add('correct-answer');

  });

  quizContainerEle.classList.replace('quiz-end', 'quiz-checkanswers');

  showQuestionCard(1);

};

const quizNav = quizContainerEle.querySelector('.quiz-nav');

quizNav.querySelector('.quiz-nav-button.next').addEventListener('click', showNextQuestionCard);
quizNav.querySelector('.quiz-nav-button.back').addEventListener('click', showPrevQuestionCard);
quizNav.querySelector('.quiz-nav-button.start').addEventListener('click', startQuiz);
quizNav.querySelector('.quiz-nav-button.submit').addEventListener('click', endQuiz);
quizNav.querySelector('.quiz-nav-button.check').addEventListener('click', showAnswers);