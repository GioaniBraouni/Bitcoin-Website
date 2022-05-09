const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Το bitcoin προσφέρει ασφάλεια και ταχύτητα στις συναλλαγές με χαμηλό κόστος',
    answers: [
      { text: 'Σωστό', correct: true },
      { text: 'Λάθος', correct: false }
    ]
  },
  {
    question: 'Το bitcoin είναι ένα ψηφιακό νόμισμα και δεν εκδίδεται απο κάποια τράπεζα',
    answers: [
      { text: 'Σωστό', correct: true },
      { text: 'Λάθος', correct: false }
    ]
  },
  {
    question: 'Ποίος είναι ο πραγματικός δημιουργός του bitcoin;',
    answers: [
      { text: 'Dorian Nakamoto', correct: false },
      { text: 'Craig Wright', correct: false },
      { text: 'Nick Szabo', correct: false },
      { text: 'Άγνωστο', correct: true }
    ]
  },
  {
    question: 'Ποία από τα παρακάτω είναι κρυπτονομίσματα;',
    answers: [
      { text: 'Ethereum', correct: true },
      { text: 'Cardano', correct: true },
      { text: 'Luna', correct: true },
      { text: 'Yuan', correct: false },
    ]
  },
  {
  question: 'Πότε δημιουργήθηκε το bitcoin;',
    answers: [
      { text: '2012', correct: false },
      { text: '2022', correct: false },
      { text: '2004', correct: false },
      { text: '2008', correct: true }
    ]
  }
]