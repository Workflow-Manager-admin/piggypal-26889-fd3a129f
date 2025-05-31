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
        background: "linear-gradient(120deg, var(--background) 76%, var(--secondary) 130%)",
        borderRadius: 36,
        boxShadow: "0 3px 24px 0 var(--accent-purple)17, 0 12px 45px 0 var(--accent-1)13",
        padding: "38px 18px 34px 18px",
        textAlign: "center",
        border: "3.5px solid var(--primary)",
        position: "relative",
        minHeight: 370,
        overflow: "hidden",
      }}
    >
      <div style={{ fontSize: "3.2rem", marginBottom: 8, color: "var(--accent-gold)", textShadow: "0 1.5px 8px var(--accent-gold)55" }}>🐷📈</div>
      <h2
        style={{
          color: "var(--text-dark)",
          fontFamily: "var(--font-playful)",
          fontWeight: 800,
          background: "unset",
          WebkitBackgroundClip: "unset",
          WebkitTextFillColor: "unset",
          fontSize: "2.15rem",
          margin: 0,
          letterSpacing: 1.5,
          textShadow: "0 2px 9px var(--background)"
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
            fontWeight: 700,
            fontSize: "1.16rem",
            color: "var(--text-light)",
            letterSpacing: 1.2,
            marginBottom: 12,
            textShadow: "0 1.5px 8px var(--background)"
          }}
        >
          How full is your piggy bank?
        </div>
        {/* Animated progress bar */}
        <div
          style={{
            height: 38,
            background: "linear-gradient(90deg, var(--surface) 69%, var(--accent-gold) 108%)",
            borderRadius: 18,
            boxShadow: "0 2px 19px 0 var(--accent-gold)33",
            position: "relative",
            overflow: "hidden",
            margin: "0 auto",
            maxWidth: 280,
            width: "87%",
            border: "2.5px solid var(--primary)",
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
              background: "linear-gradient(93deg,var(--primary) 68%,var(--accent-purple) 118%)",
              borderRadius: 19,
              boxShadow: "0 2px 22px var(--primary)",
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
              filter: "drop-shadow(0 3px 11px var(--accent-gold)44) drop-shadow(0 1.5px 6px var(--accent-purple)52)",
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
              top: 7,
              zIndex: 4,
              color: "var(--text-light)",
              background: "var(--accent-gold)",
              borderRadius: 9,
              fontWeight: 900,
              fontFamily: "var(--font-playful)",
              fontSize: "1.11rem",
              letterSpacing: 1,
              paddingLeft: 30,
              paddingRight: 14,
              textAlign: "left",
              pointerEvents: "none",
              textShadow: "0 1.5px 7px var(--accent-gold)33"
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
            background: amount < SAVINGS_GOAL
              ? "linear-gradient(91deg, var(--primary) 66%, var(--accent-purple) 104%)"
              : "repeating-linear-gradient(-90deg, var(--accent-gold), var(--accent-purple) 12%, var(--accent-gold) 27%)",
            color: "var(--button-text)",
            fontWeight: 800,
            fontSize: "1.16rem",
            border: "none",
            borderRadius: 13,
            marginTop: 7,
            padding: "13px 36px",
            boxShadow: "0 3px 19px 0 var(--accent-gold)22",
            letterSpacing: 0.7,
            outline: amount < SAVINGS_GOAL ? "3px solid var(--accent-gold)18" : "none",
            opacity: amount < SAVINGS_GOAL ? 1 : 0.62,
            cursor: amount < SAVINGS_GOAL ? "pointer" : "not-allowed",
            transition: "background 0.19s, opacity 0.18s",
            marginBottom: amount < SAVINGS_GOAL ? 0 : 12,
            textShadow: "0 1.5px 5px var(--accent-purple)"
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
              color: "var(--accent-gold)",
              fontWeight: 900,
              fontSize: "1.27rem",
              letterSpacing: 1.18,
              textShadow: "0 2px 17px var(--accent-gold), 0 1.5px 3px var(--accent-gold)92",
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
            fontSize: 27,
            opacity: 0.93,
            animation: "coin-drop 1.0s cubic-bezier(.23,1.7,.33,1.01)"
          }}
        >
          <span style={{ margin: "0 7px" }}>🪙</span>
          <span style={{ margin: "0 7px" }}>🪙</span>
          <span style={{ margin: "0 7px" }}>🪙</span>
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
          color: "var(--text-light)",
          fontWeight: 600,
          fontSize: "1.10rem",
          textShadow: "0 1.5px 2.5px var(--background)"
        }}
      >
        Each click adds $5! Try filling your piggy bank!
      </div>
    </div>
  );
}

export default SavingsReport;
