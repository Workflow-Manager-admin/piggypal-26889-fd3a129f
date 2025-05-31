import React from "react";

// PUBLIC_INTERFACE
function SavingsReport() {
  /**
   * Playful, branded placeholder for the Savings Report screen.
   */
  return (
    <div style={{
      maxWidth: 400,
      margin: '54px auto',
      background: 'linear-gradient(120deg, #FFD600 75%, #20CFCF 105%)',
      borderRadius: 36,
      boxShadow: "0 2px 18px 0 rgba(255,214,0,0.11)",
      padding: '38px 18px 34px 18px',
      textAlign: 'center',
      border: '3.5px solid #20CFCF'
    }}>
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>📈</div>
      <h2 style={{
        color: "#FFD600",
        fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
        fontWeight: 700,
        background: "linear-gradient(70deg,#FFD600 60%,#20CFCF 120%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "2.2rem",
        margin: 0,
        letterSpacing: 1.5
      }}>
        Savings Report
      </h2>
      <div style={{
        margin: "26px 0 0 0",
        color: "#20CFCF",
        fontWeight: 800,
        fontSize: "2.1rem",
        letterSpacing: 1.3
      }}>
        Coming Soon! <span role="img" aria-label="party">🥳</span>
      </div>
      <div style={{
        margin: "14px 0 0 0",
        color: "#222",
        fontWeight: 400,
        fontSize: "1.10rem"
      }}>
        Visual savings analytics coming!
      </div>
    </div>
  );
}

export default SavingsReport;
