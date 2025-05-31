import React from "react";

// PUBLIC_INTERFACE
function SecuritySharing() {
  /**
   * Playful, branded placeholder for the Security & Sharing screen.
   */
  return (
    <div style={{
      maxWidth: 400,
      margin: '54px auto',
      background: 'linear-gradient(120deg, #20CFCF 68%, #A259F7 105%)',
      borderRadius: 36,
      boxShadow: "0 2px 18px 0 rgba(32,207,207,0.08)",
      padding: '38px 18px 34px 18px',
      textAlign: 'center',
      border: '3.5px solid #A259F7'
    }}>
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>🔒</div>
      <h2 style={{
        color: "#20CFCF",
        fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
        fontWeight: 700,
        background: "linear-gradient(60deg,#A259F7,#20CFCF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "2.2rem",
        margin: 0,
        letterSpacing: 1.5
      }}>
        Security & Sharing
      </h2>
      <div style={{
        margin: "26px 0 0 0",
        color: "#A259F7",
        fontWeight: 800,
        fontSize: "2.1rem",
        letterSpacing: 1.3
      }}>
        Coming Soon! <span role="img" aria-label="padlock">🧸</span>
      </div>
      <div style={{
        margin: "14px 0 0 0",
        color: "#222",
        fontWeight: 400,
        fontSize: "1.10rem"
      }}>
        Parental locks & group savings features coming!
      </div>
    </div>
  );
}

export default SecuritySharing;
