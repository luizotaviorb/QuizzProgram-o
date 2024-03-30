// Declarando as variáveis
const question = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
    {
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": [
            {
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "Sistema operacional",
                "correct": false
            },
            {
                "answer": "Banco de dados",
                "correct": false
            },
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers": [
            {
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "var",
                "correct": true
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o seletor de id no CSS?",
        "answers": [
            {
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "/",
                "correct": false
            },
        ]
    },
];

// Substituição do quizz para a primeira pergunta
function init() {
    // criar a primeira pergunta
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i) {

    // Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function (btn) {
        btn.remove();
    });

    // Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere as alternativas
    questions[i].answers.forEach(function (answer, i) {

        // Cria o template do botão do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer']

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Inserir a alternativa na tela
        answersBox.appendChild(answerTemplate);


        // Limpa a estilização dos botões da pergunta anterior
        const oldButtons = answersBox.querySelectorAll("button");
        oldButtons.forEach(function (btn) {
            btn.classList.remove("correct-answer", "wrong-answer");
            btn.disabled = false; // Habilita o clique novamente
        });

        // Inserir um evento de clique no botão
        answerTemplate.addEventListener("click", function () {
            // Verifica a resposta do usuário ao clicar em uma resposta
            checkAnswer(this);

            // Aqui você aplica as classes corretas dependendo da resposta
            if (this.getAttribute("correct-answer") === "true") {
                this.classList.add("correct-answer");
            } else {
                this.classList.add("wrong-answer");
            }

            // Desabilita o clique em outros botões após a resposta
            const buttons = answersBox.querySelectorAll("button");
            buttons.forEach(function (button) {
                button.disabled = true;
            });
        });

    });

    // Incrementar o número da questão
    actualQuestion++;

}

// Verificando resposta do usuário
function checkAnswer(btn) {

    // Seleciona todos os botões
    const buttons = document.querySelectorAll("button");

    // Verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function (button) {

        if (button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer");

            // Checar se o usuário acertou a pergunta
            if (btn === button) {

                // Incrementa os pontos
                points++;
            }


        } else {

            button.classList.add("wrong-answer");

        }
    });

    // Exibir próxima pergunta
    nextQuestion();

}

// Exibir próxima pergunta no quizz
function nextQuestion() {

    // Timer para usuário ver as respostas
    setTimeout(function () {

        // Verifica se ainda há perguntas
        if (actualQuestion >= questions.length) {

            // Se não houver mais perguntas, exibir tela final
            ShowSuccessMessage();

        } else {

            createQuestion(actualQuestion);

        }

    }, 600);
}


// Tela final
function ShowSuccessMessage() {

    hideOrShowQuizz();

    // Alterar dados da tela

    // Calcular o scoreboard
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    // Alterar número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    // Alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;

}

// Mostra ou esconde o quizz
function hideOrShowQuizz() {

    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");

}

// Reiniciar o Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function () {

    // Zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
})

// Iniciando o Quizz
init();

