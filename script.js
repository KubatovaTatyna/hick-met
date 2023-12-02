let header = document.querySelector('h1.title');
let questionHeader = document.querySelector('h1.questionHeader');
const stars = document.querySelectorAll(".stars i");
const submitBtn = document.getElementById("submitBtn");
const secondSubmitBtn = document.getElementById("secondSubmitBtn");
let questionsForm = document.querySelector('form.questions');
let textareaAnotherText = document.querySelector('textarea.anotherText');
let firstSubmitButton = document.querySelector('button.firstSubmitButton');
// let answerInput = document.querySelector('input.answerInput');
// let answerText = document.querySelector('label.answerText');
// let questionContainer = document.querySelector('div.question');


fetch('http://78.40.109.118/active-surveys/')
  .then(response => response.json())
  .then(data => {
    let questions = data[0].questions;
    console.log(questions)

    // let questionNumber = questions.length - questions.length;

    let selectedRating = 0;

    function askQuestions(questions) {
      let currentQuestion = questions[0];

      header.innerHTML = currentQuestion.title;
      questionHeader.innerHTML = currentQuestion.text;

      // function toggleActiveClass() {
      //   submitBtn.classList.toggle("active");
      // }
      stars.forEach((star, index) => {
        star.addEventListener("click", function () {
          selectedRating = index + 1;

          // Remove existing filled stars
          stars.forEach((s, i) => {
            if (i < selectedRating) {
              s.classList.add("active");
            } else {
              s.classList.remove("active");
            }
          });

          // console.log(currentQuestion)

          if (selectedRating <= 3) {
            questionsForm.classList.add('active');
            textareaAnotherText.classList.add('notActive');
            firstSubmitButton.classList.add('notActive');
            const answersList = currentQuestion.answers;

            answers(answersList);
          }

          function answers(answersList) {
            console.log(answersList)
            for (let i = 0; i <= answersList.length; i++) {
              let answerContainer = document.createElement('div');
              let answerInput = document.createElement('input');
              let answerText = document.createElement('label');
              answerInput.type = 'radio';
              answerInput.id = answersList[i].id;
              answerText.innerHTML = answersList[i].text;
              answerInput.classList.add('answerInput');
              answerText.classList.add('answerText');
              answerContainer.classList.add('question');
              answerInput.name = 'answer';
              answerContainer.append(answerInput);
              answerContainer.append(answerText);
              questionsForm.prepend(answerContainer);
            }
          }

          // Enable the submit button
          // submitBtn.disabled = false;
          // toggleActiveClass();
        });
      });
    }


    askQuestions(questions)

    submitBtn.addEventListener('click', (event) => {
      event.preventDefault();

      selectedRating = 0;

      questions.shift();
      askQuestions(questions);
    });

    // const currentAnswer = questions[questionNumber];
    // answers(currentQuestion)

    secondSubmitBtn.addEventListener('click', (event) => {
      event.preventDefault();

      questions.shift();
      askQuestions(questions);

      remove(answers)
    });

  })