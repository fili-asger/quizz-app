import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getTrivia();
  }, []);

  let questions = [];

  let question = class {
    constructor(question, correct_answer, incorrect_answers) {
      this.question = question;
      this.correct_answer = correct_answer;
      this.incorrect_answers = incorrect_answers;
    }
  };

  /* Question format */
  var firstQuestion = new question("Test", "Bruce Wayne", [
    "Clark Kent",
    "Barry Allen",
    "Tony Stark"
  ]);


  /*
  Foreach loop over the JSON data
  Create question object for each question in the reponse.
  Display the current question and listen for input.

  */

  const getTrivia = async () => {
    let response = await fetch("https://opentdb.com/api.php?amount=10&category=29&difficulty=easy&type=multiple");
    let data = await response.json();
    return data;
  }

  getTrivia().then((data) => data.results.forEach(result => {
    let newQuestion = new question(result.question, result.correct_answer, result.incorrect_answers)
    questions.push(newQuestion);
  }));

  console.log(questions[2]);

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < 10) {
      console.log(questions);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="App">
      {/* 1. Header  */}
      <h1>USA Quiz 🇺🇸</h1>

      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {10} correct - (
            {(score / 10) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
          /* 5. Question Card  */
          <div className="question-card">
            {/* Current Question  */}
            <h2>
              Question: {currentQuestion + 1} out of {10}
            </h2>
            <h3 className="question-text">{questions[currentQuestion].question}</h3>

            {/* List of possible answers  */}
            <ul>

              <li
                onClick={() => optionClicked(true)}
              >
                {questions[currentQuestion].correct_answer}
              </li>
              <li
                onClick={() => optionClicked(false)}
              >
                {questions[currentQuestion].incorrect_answers[0]}
              </li>
              <li
                onClick={() => optionClicked(false)}
              >
                {questions[currentQuestion].incorrect_answers[1]}
              </li>
              <li
                onClick={() => optionClicked(false)}
              >
                {questions[currentQuestion].incorrect_answers[2]}
              </li>

            </ul>
          </div>
        )}
    </div>
  );
};

export default App;
