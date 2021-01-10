const highScoresList = document.querySelector('#highScoresList')
// This means get items from the highscores array or the empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")