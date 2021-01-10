var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");
var progressBarFull = document.querySelector("#progressBarFull");

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

// Below are the questions that we will use for the quiz
var questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Hyper Text Mark-Up Language",
        choice2: "Hard To Make-Up Language",
        choice3: "Hyperactive Text Making Little-sense",
        choice4: "Hard To Mix-Up Language",
        answer: "Hyper Text Mark-Up Language",
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
const score_points = 1
const max_questions = 5

// The below function is to start the game
startGame = () => {
    questionCounter = 0
    score = 0
    // The ...questions below gets all of the values and questions from the above array
    availableQuestions = [...questions]
    getNewQuestion()
}

// Below we are defininng the funtion getNewQuestion, which we are using above
getNewQuestion = () => {
    // below says if the there are no new questions or the questions counter is above the max questions number
    // then it will end the quiz and take us to the end page
    if (availableQuestions.length === 0 || questionCounter > max_questions) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assing('./end.html')
    }
    questionCounter++
    // Below is the text that tells you which question you are on
    progressText.textContent = "Question ${questionCounter} of ${max_questions}"

    // The below calculates the length of the available questions
    const questionsIndex = math.floor(math.random * availableQuestions.length)
    // This keeps track of which question we are on from our array of questions
    currentQuestion = availableQuestions[questionsIndex]
    // This knows which question to ask
    question.textContent = currentQuestion.question 

    // below knows what choice we have clicked on
    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.textContent = currentQuestion["choice" + number]
    })
// Splicing takes an element from an array 
    availableQuestions.splice(questionsIndex, 1)
    // The below is true as to allow us to take the answers from the user
    acceptingAnswers = true
}

// The below will increase your score if it is correct
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === "correct") {
            incrementScore(score_points)
        }


        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
            
        }, 1000);
    })

})

incrementScore = num => {
    score =+num
    scoreText.textContent = score
}

startGame()