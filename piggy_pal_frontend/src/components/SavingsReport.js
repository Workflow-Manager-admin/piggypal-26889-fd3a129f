import React, { useState, useRef } from "react";

// PUBLIC_INTERFACE
/**
 * An interactive savings progress demo for PiggyPal kids.
 * Features an animated progress bar and fun counter
 * that increment with every "Add Savings" button click.
 * The bar fills and the number animates for visual feedback!
 */
function SavingsReport() {
  // Adjust these for playful demo
  const SAVINGS_GOAL = 50; // e.g., $50 target
  const [amount, setAmount] = useState(0); // current savings
  const [display, setDisplay] = useState(0); // animated display

  const animRef = useRef();

  // Animate the display number for fun feedback!
  const animateAmount = (from, to) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const duration = 700; // ms
    const start = performance.now();

    function animate(ts) {
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(from + (to - from) * progress);
      setDisplay(value);
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  };

  // Handle button click to "save" (simulate)
  const handleAddSavings = () => {
    if (amount < SAVINGS_GOAL) {
      const newAmount = Math.min(amount + 5, SAVINGS_GOAL); // +$5 per click
      setAmount(newAmount);
      animateAmount(amount, newAmount);
    }
  };

  // Initial amount animation on mount/first click
  React.useEffect(() => {
    animateAmount(0, amount);
    // eslint-disable-next-line
  }, []);

  // Show playful piggy + progress
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "54px auto",
        background:
          "linear-gradient(120deg, #FFD600 75%, #20CFCF 105%)",
        borderRadius: 36,
        boxShadow: "0 2px 18px 0 rgba(255,214,0,0.11)",
        padding: "38px 18px 34px 18px",
        textAlign: "center",
        border: "3.5px solid #20CFCF",
        position: "relative",
        minHeight: 370,
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>🐷📈</div>
      <h2
        style={{
          color: "#FFD600",
          fontFamily:
            "'Fredoka One','Comic Sans MS','Inter',sans-serif",
          fontWeight: 700,
          background: "linear-gradient(70deg,#FFD600 60%,#20CFCF 120%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "2.2rem",
          margin: 0,
          letterSpacing: 1.5,
        }}
      >
        Savings Report
      </h2>
      <div
        style={{
          marginTop: 26,
          marginBottom: 21,
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: "1.15rem",
            color: "#20CFCF",
            letterSpacing: 1.2,
            marginBottom: 12,
          }}
        >
          How full is your piggy bank?
        </div>
        {/* Animated progress bar */}
        <div
          style={{
            height: 38,
            background:
              "linear-gradient(90deg, #FFD600 63%, #20CFCF 100%)",
            borderRadius: 18,
            boxShadow: "0 2px 18px 0 #FFD60033",
            position: "relative",
            overflow: "hidden",
            margin: "0 auto",
            maxWidth: 280,
            width: "85%",
            border: "2.5px solid #FFD600",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              left: 0,
              top: 0,
              height: "100%",
              width: `${(display / SAVINGS_GOAL) * 100}%`,
              background:
                "linear-gradient(93deg,#FF6F61 70%,#A259F7 120%)",
              borderRadius: 18,
              boxShadow: "0 2px 22px #FF6F613a",
              transition: "width 0.7s cubic-bezier(.32,1.66,.41,0.96)",
              minWidth: 22,
              display: display === 0 ? "none" : "block",
            }}
            aria-label="savings progress bar"
          />
          {/* Piggy icon slides across as you save */}
          <div
            style={{
              position: "absolute",
              left: `calc(${(display / SAVINGS_GOAL) * 100}% - 23px)`,
              top: 2,
              zIndex: 3,
              fontSize: 28,
              transition: "left 0.7s cubic-bezier(.32,1.66,.41,0.96)",
              filter:
                "drop-shadow(0 3px 7px #FF6F611b) drop-shadow(0 2px 4px #A259F74a)",
              userSelect: "none",
            }}
            aria-label="animated piggy"
          >
            🐖
          </div>
          {/* Savings total over bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 6,
              zIndex: 4,
              color: "#fff",
              fontWeight: 900,
              fontSize: "1.09rem",
              textShadow: "0 2px 9px #FFD600bb, 0 1px 0 #A259F799",
              letterSpacing: 1,
              paddingLeft: 30,
              paddingRight: 14,
              textAlign: "left",
              pointerEvents: "none",
              fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif"
            }}
          >
            ${display} / ${SAVINGS_GOAL}
          </div>
        </div>
        {/* Add Savings Button */}
        <button
          className="btn btn-large"
          type="button"
          onClick={handleAddSavings}
          disabled={amount >= SAVINGS_GOAL}
          style={{
            background:
              "linear-gradient(90deg,#FF6F61 66%,#A259F7 104%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.15rem",
            border: "none",
            borderRadius: 13,
            marginTop: 6,
            padding: "13px 36px",
            boxShadow: "0 2px 12px 0 #FFD60029",
            letterSpacing: 0.7,
            outline:
              amount < SAVINGS_GOAL
                ? "3px solid #FFD60033"
                : "none",
            opacity: amount < SAVINGS_GOAL ? 1 : 0.57,
            cursor: amount < SAVINGS_GOAL ? "pointer" : "not-allowed",
            transition: "background 0.17s, opacity 0.18s",
            marginBottom: amount < SAVINGS_GOAL ? 0 : 10,
          }}
          aria-label="Add Savings"
        >
          {amount < SAVINGS_GOAL ? (
            <>
              Add Savings&nbsp; <span style={{ fontWeight: 900 }}>+ $5</span> 🐷
            </>
          ) : (
            <>
              Goal Reached! 🎉
            </>
          )}
        </button>
        {/* Celebratory Message */}
        {amount >= SAVINGS_GOAL && (
          <div
            style={{
              marginTop: 14,
              color: "#FFD600",
              fontWeight: 800,
              fontSize: "1.26rem",
              letterSpacing: 1.12,
              textShadow: "0 2px 14px #FFD60044",
              animation: "savings-pop 0.6s cubic-bezier(.6,2.0,.44,1.13) both",
            }}
          >
            🎉 Congrats! Your piggy is FULL!
          </div>
        )}
      </div>
      {/* Fun animated coins rain if you fill the goal */}
      {amount >= SAVINGS_GOAL && (
        <div
          aria-label="coin sparkle"
          style={{
            pointerEvents: "none",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 12,
            zIndex: 7,
            display: "flex",
            width: "100%",
            justifyContent: "center",
            fontSize: 28,
            opacity: 0.9,
            animation: "coin-drop 1.0s cubic-bezier(.23,1.7,.33,1.01)"
          }}
        >
          <span style={{ margin: "0 6px" }}>🪙</span>
          <span style={{ margin: "0 6px" }}>🪙</span>
          <span style={{ margin: "0 6px" }}>🪙</span>
        </div>
      )}
      {/* Animations */}
      <style>
        {`
        @keyframes savings-pop {
          0% { transform: scale(0.28); opacity: 0.2;}
          60% { transform: scale(1.21); opacity: 1;}
          82% { transform: scale(0.93);}
          100% { transform: scale(1);}
        }
        @keyframes coin-drop {
          0% { transform: translateY(-60px) scale(0.55); opacity: 0;}
          100% { transform: translateY(0) scale(1); opacity:0.9;}
        }
        `}
      </style>
      {/* Helper text */}
      <div
        style={{
          marginTop: 25,
          color: "#A259F7",
          fontWeight: 400,
          fontSize: "1.09rem",
        }}
      >
        Each click adds $5! Try filling your piggy bank!
      </div>
    </div>
  );
}

export default SavingsReport;
