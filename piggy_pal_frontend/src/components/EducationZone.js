import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * EducationZone: Interactive financial literacy quiz (playful, themed)
 *
 * Displays a quiz question, answer buttons, and themed feedback for correct/incorrect answers.
 */
function EducationZone() {
  // Example quiz question (extendable to future question pools!)
  const quiz = {
    question: "Emilia wants to buy a toy that costs $8. She has $5 in her piggy bank. What should Emilia do?",
    answers: [
      { text: "Ask the toy store to lower the price", correct: false },
      { text: "Save $3 more before buying", correct: true },
      { text: "Borrow $50 from a friend", correct: false },
      { text: "Spend all her money and hope for the best", correct: false }
    ],
    correctFeedback: "🎉 Great job! Saving more is a smart choice. You'll reach your goal soon!",
    incorrectFeedback: "🐷 Oops! Try again… Remember, saving up what you need is always wise!"
  };

  const [selected, setSelected] = useState(null); // index of answer picked
  const [feedback, setFeedback] = useState(null); // "correct"/"incorrect" or null
  const [reveal, setReveal] = useState(false);    // reveal feedback or not

  // Handle answer selection
  function handleAnswer(idx) {
    if (reveal) return; // Prevent re-answering
    setSelected(idx);
    const isCorrect = quiz.answers[idx].correct;
    setFeedback(isCorrect ? "correct" : "incorrect");
    setReveal(true);
  }

  // Retry logic for incorrect answers
  function handleRetry() {
    setSelected(null);
    setFeedback(null);
    setReveal(false);
  }

  // Themed playful UI
  return (
    <div style={{
      maxWidth: 420,
      margin: '54px auto',
      background: 'linear-gradient(120deg, var(--secondary) 72%, var(--accent-1) 100%)',
      borderRadius: 36,
      boxShadow: "0 2px 18px 0 var(--accent-purple)18",
      padding: '38px 18px 34px 18px',
      textAlign: 'center',
      border: '3.5px solid var(--accent-1)',
      minHeight: 410,
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
      <div style={{
        margin: "27px 0 0 0",
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
          // Accessible color for normal/unselected vs answered
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
          alignItems: "center",
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
          Test your money smarts with a quiz! More questions coming soon.
        </div>
      )}
      {/* Themed animation */}
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
