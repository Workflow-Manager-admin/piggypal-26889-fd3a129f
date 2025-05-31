import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * EducationZone: Interactive financial literacy quiz (playful, themed)
 *
 * Displays a quiz question, answer buttons, and themed feedback for correct/incorrect answers.
 * Now supports an array of questions and automatically loads the next on correct answers.
 * The quiz auto-advances after correct, cycles through, and offers a playful restart.
 */

// Sample quiz question set (Expand/replace for more questions!)
const QUIZ_SET = [
  {
    question: "Emilia wants to buy a toy that costs $8. She has $5 in her piggy bank. What should Emilia do?",
    answers: [
      { text: "Ask the toy store to lower the price", correct: false },
      { text: "Save $3 more before buying", correct: true },
      { text: "Borrow $50 from a friend", correct: false },
      { text: "Spend all her money and hope for the best", correct: false }
    ],
    correctFeedback: "🎉 Great job! Saving more is a smart choice. You'll reach your goal soon!",
    incorrectFeedback: "🐷 Oops! Try again… Remember, saving up what you need is always wise!"
  },
  {
    question: "Lucas saved $10 to buy a puzzle, but it went on sale for $7. How much will Lucas have left after buying it?",
    answers: [
      { text: "$0", correct: false },
      { text: "$3", correct: true },
      { text: "$7", correct: false },
      { text: "$17", correct: false }
    ],
    correctFeedback: "🎉 Great job! $10 - $7 leaves $3 saved up.",
    incorrectFeedback: "🐷 Try again. Remember: saved - spent = money left."
  },
  {
    question: "Maya wants to buy a book for $4. She gets $1 each week for allowance. How many weeks should she save?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "4", correct: false },
      { text: "4 or more", correct: true }
    ],
    correctFeedback: "🏅 That's right! She should save for at least 4 weeks.",
    incorrectFeedback: "Not quite—try counting $1 each week to reach $4."
  },
  {
    question: "If you get $2 for doing chores and want to buy a snack for $5, what's the best thing to do?",
    answers: [
      { text: "Buy the snack with $2", correct: false },
      { text: "Save more until you have $5", correct: true },
      { text: "Borrow from a friend every time", correct: false },
      { text: "Ask for more chores to earn $10", correct: false }
    ],
    correctFeedback: "That’s it! Save up until you can afford what you want.",
    incorrectFeedback: "🐷 Try again! Sometimes, saving up is the smartest option."
  }
];

function shuffleArray(arr) {
  // Fisher-Yates shuffle (returns new array)
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function EducationZone() {
  // Set up: randomize question order on mount/new-quiz
  const [questions, setQuestions] = useState(() => shuffleArray(QUIZ_SET));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null); // index of answer picked
  const [feedback, setFeedback] = useState(null); // "correct"/"incorrect" or null
  const [reveal, setReveal] = useState(false);    // reveal feedback or not
  const [completed, setCompleted] = useState(false);

  // Select current question
  const quiz = questions[current];

  // Handle answer selection
  function handleAnswer(idx) {
    if (reveal || completed) return; // Prevent re-answering
    setSelected(idx);
    const isCorrect = quiz.answers[idx].correct;
    setFeedback(isCorrect ? "correct" : "incorrect");
    setReveal(true);

    // If answer is correct, auto-advance to next after short playful delay
    if (isCorrect) {
      setTimeout(() => {
        // Only move forward if not completed in the meantime
        if (current < questions.length - 1) {
          setCurrent(c => c + 1);
          setSelected(null);
          setFeedback(null);
          setReveal(false);
        } else {
          setCompleted(true);
        }
      }, 1200); // ~1.2s to show feedback
    }
    // If not correct: user must click 'Try Again'
  }

  // Retry logic for incorrect answers
  function handleRetry() {
    setSelected(null);
    setFeedback(null);
    setReveal(false);
  }

  // Kept for completeness (not used, but keeps button-less ARIA accessibility)
  function handleNextQuestion() {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setFeedback(null);
      setReveal(false);
    } else {
      setCompleted(true);
    }
  }

  // Restart quiz with new shuffle
  function handleRestart() {
    setQuestions(shuffleArray(QUIZ_SET));
    setCurrent(0);
    setSelected(null);
    setFeedback(null);
    setReveal(false);
    setCompleted(false);
  }

  // Themed playful UI
  return (
    <div style={{
      maxWidth: 420,
      margin: "54px auto",
      background: "linear-gradient(120deg, var(--secondary) 72%, var(--accent-1) 100%)",
      borderRadius: 36,
      boxShadow: "0 2px 18px 0 var(--accent-purple)18",
      padding: "38px 18px 34px 18px",
      textAlign: "center",
      border: "3.5px solid var(--accent-1)",
      minHeight: 410
    }}>
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>📚</div>
      <h2 style={{
        color: "var(--text-dark)",
        fontFamily: "var(--font-playful)",
        fontWeight: 800,
        background: "linear-gradient(70deg, var(--accent-1) 70%, var(--secondary) 120%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontSize: "2.15rem",
        margin: 0,
        letterSpacing: 1.5,
        textShadow: "0 1.5px 8px var(--background)"
      }}>
        Financial Quiz Time!
      </h2>
      {completed ? (
        <div style={{
          margin: "60px 0 0 0",
          minHeight: 230,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            fontSize: "2.3rem",
            marginBottom: 8,
            color: "var(--primary)",
            filter: "drop-shadow(0 1.5px 8px var(--accent-gold))"
          }}>
            🎉🏆
          </div>
          <div style={{
            background: "var(--surface)",
            borderRadius: 18,
            color: "var(--text-dark)",
            fontWeight: 800,
            fontSize: "1.4rem",
            padding: "15px 12px",
            marginBottom: 10,
            boxShadow: "0 3px 14px var(--accent-gold)19"
          }}>
            You finished the quiz!
          </div>
          <div style={{
            color: "var(--accent-1)",
            fontWeight: 700,
            fontSize: "1.12rem",
            marginBottom: 12,
            textShadow: "0 1.5px 7px var(--background)"
          }}>
            Great job, money smartie! 🐷
          </div>
          <button
            className="btn btn-large"
            style={{
              background: "linear-gradient(90deg, var(--accent-gold) 60%, var(--accent-1) 110%)",
              color: "var(--text-dark)",
              fontWeight: 800,
              fontSize: "1.08rem",
              border: "none",
              borderRadius: 11,
              margin: "0 auto",
              padding: "11px 26px",
              boxShadow: "0 2px 11px 0 var(--accent-gold)11"
            }}
            onClick={handleRestart}
            aria-label="Restart Quiz"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          {/* Question Progress Indicator */}
          <div style={{
            margin: "0 0 8px 0",
            color: "var(--accent-gold)",
            fontWeight: 600,
            fontSize: "1.04rem"
          }}>
            Question {current + 1} / {questions.length}
          </div>
          <div style={{
            margin: "17px 0 0 0",
            color: "var(--text-light)",
            background: "var(--accent-gold)",
            fontWeight: 700,
            fontSize: "1.23rem",
            letterSpacing: 1.04,
            borderRadius: 10,
            padding: "8px 4px",
            textShadow: "0 1.5px 2.5px var(--accent-gold)8a"
          }}>
            {quiz.question}
          </div>
          <div style={{ margin: "30px 0 0 0" }}>
            {quiz.answers.map((ans, idx) => {
              let bg, color, outline;
              if (reveal && idx === selected) {
                if (ans.correct) {
                  bg = "linear-gradient(90deg,var(--accent-1) 58%, var(--secondary) 92%)";
                  color = "var(--text-dark)";
                  outline = "3px solid var(--accent-1)";
                } else {
                  bg = "linear-gradient(91deg,var(--accent-orange) 54%,var(--accent-1) 124%)";
                  color = "var(--text-dark)";
                  outline = "3px solid var(--accent-orange)";
                }
              } else {
                bg = "linear-gradient(90deg, var(--secondary) 56%, var(--accent-1) 98%)";
                color = "var(--text-light)";
                outline = "none";
              }
              return (
                <button
                  key={ans.text}
                  className="btn btn-large"
                  style={{
                    width: "100%",
                    margin: "0 0 13px 0",
                    background: bg,
                    color: color,
                    fontWeight: 700,
                    fontSize: "1.11rem",
                    letterSpacing: 0.5,
                    borderRadius: 11,
                    border: "none",
                    padding: "12px 13px",
                    opacity: reveal && selected !== idx ? 0.78 : 1,
                    boxShadow: "0 2px 12px 0 var(--accent-gold)20",
                    outline: outline,
                    cursor: reveal ? "default" : "pointer",
                    transition: "background 0.17s, color 0.17s, outline 0.16s",
                    textShadow: "0 2px 8px var(--background)20"
                  }}
                  disabled={reveal}
                  aria-label={"Answer: " + ans.text}
                  onClick={() => handleAnswer(idx)}
                >
                  {ans.text}
                  {reveal && idx === selected && (
                    ans.correct ? <span style={{ marginLeft: 10 }} role="img" aria-label="correct">✅</span>
                    : <span style={{ marginLeft: 10 }} role="img" aria-label="incorrect">😅</span>
                  )}
                </button>
              );
            })}
          </div>
          {/* Feedback, themed */}
          {reveal && (
            <div style={{
              marginTop: 22,
              animation: "quiz-pop 0.46s cubic-bezier(.22,1.39,.31,1.04) both",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              {feedback === "correct" ? (
                <div style={{
                  color: "var(--primary)",
                  fontWeight: 800,
                  fontSize: "1.34rem",
                  marginBottom: 2,
                  background: "var(--surface)",
                  padding: "12px 16px",
                  borderRadius: 13,
                  boxShadow: "0 4px 16px 0 var(--accent-1)20"
                }}>
                  {quiz.correctFeedback}
                  {/* No "Next" button shown – auto advances! */}
                </div>
              ) : (
                <div>
                  <div style={{
                    color: "var(--accent-orange)",
                    fontWeight: 800,
                    fontSize: "1.20rem",
                    marginBottom: 2,
                    background: "var(--surface)",
                    padding: "11px 14px",
                    borderRadius: 13,
                    boxShadow: "0 2px 11px 0 var(--accent-orange)14"
                  }}>
                    {quiz.incorrectFeedback}
                  </div>
                  <button
                    className="btn"
                    style={{
                      background: "linear-gradient(91deg,var(--accent-gold) 40%,var(--accent-1) 90%)",
                      color: "var(--text-dark)",
                      fontWeight: 700,
                      fontSize: "1.07rem",
                      marginTop: 12,
                      border: "none",
                      borderRadius: 9,
                      padding: "9px 18px",
                      boxShadow: "0 1.5px 8px var(--accent-gold)18"
                    }}
                    onClick={handleRetry}
                    aria-label="Try Again"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Helper/encouragement */}
          {!reveal && (
            <div style={{
              marginTop: 21,
              color: "var(--text-dark)",
              fontWeight: 500,
              fontSize: "1.11rem",
              textShadow: "0 1.5px 4px var(--accent-1)33"
            }}>
              Test your money smarts with a quiz!
            </div>
          )}
        </>
      )}
      <style>
        {`
        @keyframes quiz-pop {
          0% { transform: scale(0.61); opacity: 0; }
          70% { transform: scale(1.12); opacity: 1; }
          90% { transform: scale(0.93); }
          100% { transform: scale(1); }
        }
        `}
      </style>
    </div>
  );
}

export default EducationZone;
