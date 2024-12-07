function getQuestions() {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
        const questions = JSON.parse(storedQuestions);
        console.log(questions);
    } else {
        console.log("Нет сохраненных вопросов.");
    }
}

function shuffleArray(storedQuestions) {
    for (let i = storedQuestions.length - 1; i>0; i--) {
        const j = Math.floor(Math.random()*(i+1));
        [storedQuestions[i],storedQuestions[j]] = [storedQuestions[j],storedQuestions[i]];
    }
    return storedQuestions;
}

shuffleArray();
getQuestions();

let score1 = 0;
let score2 = 0;
let questionIndex1 = 0;
let questionIndex2 = 0;

