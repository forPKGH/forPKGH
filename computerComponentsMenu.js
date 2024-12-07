const form = document.querySelector('#addQuestion__form');
const addInput = document.querySelector('#addQuestion__input');
const questions = document.querySelector('.questions__container');
const isEmpty = document.querySelector('.isEmpty');

let questionsLS = [];

if (localStorage.getItem('questions')) {
    questionsLS = JSON.parse(localStorage.getItem('questions'));
    questionsLS.forEach((question) => renderQuestion(question));
}

checkEmptyList();

form.addEventListener('submit', addQuestion)

questions.addEventListener('click', deleteQuestion)

function addQuestion(event) {
    //отменить отправку формы
    event.preventDefault();
    
    const addedQuestion = addInput.value;
    const parts = addedQuestion.split('.')

    if (parts.length != 6 || !Number.isInteger(parseInt(parts[5]))) {
        alert('У вас неверный формат ввода');
        return;
    }

    const question = parts[0].trim();
    const answer1 = parts[1].trim();
    const answer2 = parts[2].trim();
    const answer3 = parts[3].trim();
    const answer4 = parts[4].trim();
    const correctNum = parseInt(parts[5].trim());
    const correctAnswer = correctNum-1;

    if (correctAnswer > 3 || correctAnswer < 0) {
        alert('Правильный ответ указан неверно!');
        return; 
    }

    const newQuestion = {
        id: Date.now(),
        question: question,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
        correctAnswer: correctAnswer
    };
    questionsLS.push(newQuestion);

    renderQuestion(newQuestion);

    addInput.value = "";
    addInput.focus();

    checkEmptyList();

    saveToLocalStorage();
}

function isCorrect(correctAnswer) {
    const lastQuestion = questions.lastElementChild;
    const answersList = lastQuestion.querySelectorAll('.answers__ol .answer');

    if (correctAnswer >= 0 && correctAnswer < answersList.length) {
        answersList[correctAnswer].classList.add('correct');
    } 
}

function deleteQuestion(event) {    
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.question__container');
    const id = Number(parentNode.id);

    parentNode.remove();

    const index = questionsLS.findIndex((question) => question.id === id );

    questionsLS.splice(index, 1);

    checkEmptyList();

    saveToLocalStorage();
}

function checkEmptyList() {
    if (questionsLS.length === 0) {
        const emptyListHTML = `<li class="isEmpty">
                <p>Список вопросов пуст</p>
            </li>`;

        questions.insertAdjacentHTML ('afterbegin', emptyListHTML);    
    }

    if (questionsLS.length > 0) {
        const emptyEl = document.querySelector('.isEmpty');

        if (emptyEl) {
            emptyEl.remove()
        }
    }
}

function saveToLocalStorage() {
    localStorage.setItem('questions', JSON.stringify(questionsLS));
}

function renderQuestion(question) {
    const questionHTML = `<li id="${question.id}" class="question__container">
    <h2 class="question">${question.question}</h2>
    <button class="delete-button" data-action = 'delete'>×</button>
    <ol class="answers__ol">
        <li class="answer">${question.answer1}</li>
        <li class="answer">${question.answer2}</li>
        <li class="answer">${question.answer3}</li>
        <li class="answer">${question.answer4}</li>
    </ol>
</li>`

questions.insertAdjacentHTML('beforeend', questionHTML);

isCorrect(question.correctAnswer);
}