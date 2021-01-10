// Const variables must have a value when they are decalred and they cannot be reassigned.
// Using VAR below meant that it did not work as the variable could be redefined and as it did not need to be we can use let and const
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
var quizTimer = document.getElementById("timer")

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


var timeleft = 60;

    var quizTimer = setInterval(function function1() {
        document.getElementById("countdown").innerHTML = timeleft +
            "&nbsp" + "s remaining";

        timeleft -= 1;
        if (timeleft <= 0) {
            clearInterval(quizTimer);
            document.getElementById("countdown").innerHTML = "Time is up!"
            // The below takes you straight to the end page when the timer runs out
            return window.location.assign('./end.html')
        }
    }, 1000);


// Below are the questions that we will use for the quiz

var questions = [
    {
        question: "What does HTML stand for?",
        choice1: "1 - Hyper-Text Mark-Up Language",
        choice2: "2- Hard To Make-Up Language",
        choice3: "3 - Hyperactive Text Making Little-sense",
        choice4: "4 - Hard To Mix-Up Language",
        answer: 1,
    },
    {
        question: "Which language is used to style web pages?",
        choice1: "1 - HTML",
        choice2: "2 - jQuery",
        choice3: "3 - CSS",
        choice4: "4 - Javascript",
        answer: 3
    },
    {
        question: "In which font do you write code?",
        choice1: "1 - Upper Case",
        choice2: "2 - Lower Case",
        choice3: "3 - All Capital Letters",
        choice4: "4 - Camel Case",
        answer: 4,
    },
    {
        question: "For, Do and While, are all types of what",
        choice1: "1 - Objects",
        choice2: "2 - Arrays",
        choice3: "3 - Loops",
        choice4: "4 - Document Types",
        answer: 3,
    },
    {
        question: "Who invented HTML?",
        choice1: "1 - Steve Jobs",
        choice2: "2 - Tim Berners-Lee",
        choice3: "3 - Mark Zuckerberg",
        choice4: "4 - Alan Turing",
        answer: 2,
    },
]



const SCORE_POINTS = 1
const MAX_QUESTIONS = 5

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

        return window.location.assign('./end.html')
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
// This means if answer is correct increase the score by the const score points which is 1
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
// Otherwise dont do anything apart from minus time - see function below
        else {
            minusTime ();
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()

        }, 1000)
    })
})
// The below function removes 10 seconds from the time if the answer given is incorrect
function minusTime () {
    (timeleft = timeleft - 10)
};

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
