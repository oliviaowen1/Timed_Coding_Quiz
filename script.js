var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');

var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var questionCounter = 0
var availableQuestions = []

// var timeleft = 75;

//     var quizTimer = setInterval(function function1() {
//         document.getElementById("countdown").innerHTML = timeleft +
//             "&nbsp" + "seconds remaining";

//         timeleft -= 1;
//         if (timeleft <= 0) {
//             clearInterval(quizTimer);
//             document.getElementById("countdown").innerHTML = "Time is up!"
//         }
//     }, 1000);


// Below are the questions that we will use for the quiz

var questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Hyper-Text Mark-Up Language",
        choice2: "Hard To Make-Up Language",
        choice3: "Hyperactive Text Making Little-sense",
        choice4: "Hard To Mix-Up Language",
        answer: "Hyper-Text Mark-Up Language",
    },
    {
        question: "Which language is used to style web pages?",
        choice1: "HTML",
        choice2: "jQuery",
        choice3: "CSS",
        choice4: "Javascript",
        answer: "CSS"
    },
    {
        question: "In which font do you write code?",
        choice1: "Upper Case",
        choice2: "Lower Case",
        choice3: "All Capital Letters",
        choice4: "Camel Case",
        answer: "Camel Case",
    },
    {
        question: "For, Do and While, are all types of what",
        choice1: "Objects",
        choice2: "Arrays",
        choice3: "Loops",
        choice4: "Document Types",
        answer: "Loops",
    },
    {
        question: "Who invented HTML?",
        choice1: "Steve Jobs",
        choice2: "Tim Berners-Lee",
        choice3: "Mark Zuckerberg",
        choice4: "Alan Turing",
        answer: "Tim Berners-Lee",
    },
]

// Const variables must have a value when they are decalred and they cannot be reassigned.

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

// The below function is to start the game

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

// Below we are defininng the funtion getNewQuestion, which we are using above

getNewQuestion = () => {
     // below says if the there are no new questions or the questions counter is above the max questions number
    // then it will end the quiz and take us to the end page
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    // Below is the text that tells you which question you are on
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    // The below calculates the length of the available questions
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
   // This keeps track of which question we are on from our array of questions
    currentQuestion = availableQuestions[questionsIndex]
    // This knows which question to ask
    question.innerText = currentQuestion.question

    // below knows what choice we have clicked on
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
// Splicing takes an element from an array 
    availableQuestions.splice(questionsIndex, 1)
    // The below is true as to allow us to take the answers from the user
    acceptingAnswers = true
}
// The below will increase your score if it is correct
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
