import React from "react";

// PUBLIC_INTERFACE
function HomeDashboard() {
  /**
   * Playful, branded placeholder for the Home Dashboard screen.
   */
  return (
    <div style={{
      maxWidth: 400,
      margin: '54px auto',
      background: 'linear-gradient(120deg, #FF6F61 78%, #FFD600 95%)',
      borderRadius: 36,
      boxShadow: "0 2px 18px 0 rgba(255,111,97,0.10)",
      padding: '38px 18px 34px 18px',
      textAlign: 'center',
      border: '3.5px solid #FFD600'
    }}>
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>🐷</div>
      <h2 style={{
        color: "#FF6F61",
        fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
        fontWeight: 700,
        background: "linear-gradient(70deg,#FF6F61 60%,#A259F7 130%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "2.2rem",
        margin: 0,
        letterSpacing: 1.5
      }}>
        Home Dashboard
      </h2>
      <div style={{
        margin: "26px 0 0 0",
        color: "#A259F7",
        fontWeight: 800,
        fontSize: "2.1rem",
        letterSpacing: 1.3
      }}>
        Coming Soon! <span role="img" aria-label="piggy excited">🎉</span>
      </div>
      <div style={{
        margin: "14px 0 0 0",
        color: "#444",
        fontWeight: 400,
        fontSize: "1.10rem"
      }}>
        Animated piggy banks and goals coming soon!
      </div>
    </div>
  );
}

export default HomeDashboard;
