import React from "react";

// PUBLIC_INTERFACE
function ParentalDashboard() {
  /**
   * Playful, branded placeholder for the Parental Dashboard screen.
   */
  return (
    <div style={{
      maxWidth: 400,
      margin: '54px auto',
      background: 'linear-gradient(110deg, #20CFCF 68%, #FF6F61 99%)',
      borderRadius: 36,
      boxShadow: "0 2px 18px 0 rgba(32,207,207,0.12)",
      padding: '38px 18px 34px 18px',
      textAlign: 'center',
      border: '3.5px solid #20CFCF'
    }}>
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>👨‍👩‍👧</div>
      <h2 style={{
        color: "#20CFCF",
        fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
        fontWeight: 700,
        background: "linear-gradient(70deg,#20CFCF 60%,#FF6F61 140%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "2.2rem",
        margin: 0,
        letterSpacing: 1.5
      }}>
        Parental Dashboard
      </h2>
      <div style={{
        margin: "26px 0 0 0",
        color: "#FF6F61",
        fontWeight: 800,
        fontSize: "2.1rem",
        letterSpacing: 1.3
      }}>
        Coming Soon! <span role="img" aria-label="family">🛡️</span>
      </div>
      <div style={{
        margin: "14px 0 0 0",
        color: "#222",
        fontWeight: 400,
        fontSize: "1.10rem"
      }}>
        Parent & guardian tools are on their way!
      </div>
    </div>
  );
}

export default ParentalDashboard;
