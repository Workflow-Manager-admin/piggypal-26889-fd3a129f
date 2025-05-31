import React from "react";

// PUBLIC_INTERFACE
function SavingsGoalForm() {
  /**
   * Playful, branded placeholder for the Savings Goal Form screen.
   */
  return (
    <div style={{
      maxWidth: 400,
      margin: '54px auto',
      background: 'linear-gradient(120deg, #FF6F61 74%, #20CFCF 94%)',
      borderRadius: 36,
      boxShadow: "0 2px 18px 0 rgba(32,207,207,0.10)",
      padding: '38px 18px 34px 18px',
      textAlign: 'center',
      border: '3.5px solid #20CFCF'
    }}>
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>🎯</div>
      <h2 style={{
        color: "#FF6F61",
        fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
        fontWeight: 700,
        background: "linear-gradient(70deg,#FF6F61 60%,#20CFCF 115%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "2.2rem",
        margin: 0,
        letterSpacing: 1.5
      }}>
        Savings Goal
      </h2>
      <div style={{
        margin: "26px 0 0 0",
        color: "#20CFCF",
        fontWeight: 800,
        fontSize: "2.1rem",
        letterSpacing: 1.3
      }}>
        Coming Soon! <span role="img" aria-label="target">⏳</span>
      </div>
      <div style={{
        margin: "14px 0 0 0",
        color: "#333",
        fontWeight: 400,
        fontSize: "1.10rem"
      }}>
        Set savings goals soon!
      </div>
    </div>
  );
}

export default SavingsGoalForm;
