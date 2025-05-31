import React from "react";

// PUBLIC_INTERFACE
function RewardsGamification() {
  /**
   * Playful, branded placeholder for the Rewards & Gamification screen.
   */
  return (
    <div style={{
      maxWidth: 400,
      margin: '54px auto',
      background: 'linear-gradient(120deg, #A259F7 76%, #FFD600 105%)',
      borderRadius: 36,
      boxShadow: "0 2px 18px 0 rgba(162,89,247,0.13)",
      padding: '38px 18px 34px 18px',
      textAlign: 'center',
      border: '3.5px solid #FFD600'
    }}>
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>🏅</div>
      <h2 style={{
        color: "#A259F7",
        fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
        fontWeight: 700,
        background: "linear-gradient(70deg,#A259F7 60%,#FFD600 120%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "2.2rem",
        margin: 0,
        letterSpacing: 1.5
      }}>
        Rewards & Gamification
      </h2>
      <div style={{
        margin: "26px 0 0 0",
        color: "#FFD600",
        fontWeight: 800,
        fontSize: "2.1rem",
        letterSpacing: 1.3,
        textShadow: "0 1px 2px #3335"
      }}>
        Coming Soon! <span role="img" aria-label="trophy">🌟</span>
      </div>
      <div style={{
        margin: "14px 0 0 0",
        color: "#333",
        fontWeight: 400,
        fontSize: "1.10rem"
      }}>
        Badges & minigames arriving soon!
      </div>
    </div>
  );
}

export default RewardsGamification;
