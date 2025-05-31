import React, { useState } from "react";

/**
 * Playful Rewards & Gamification screen featuring a "spin-the-wheel" demo mini-game
 * to unlock a badge, with animated feedback.
 */
// PUBLIC_INTERFACE
function RewardsGamification() {
  const [spinning, setSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  const badges = [
    {
      name: "Super Saver",
      emoji: "💰",
      desc: "Saved 3 days in a row!",
      color: "#FFD600"
    },
    {
      name: "Goal Getter",
      emoji: "🎯",
      desc: "Set your first goal.",
      color: "#A259F7"
    },
    {
      name: "Spin Star",
      emoji: "🌟",
      desc: "Tried the wheel!",
      color: "#FF6F61"
    },
  ];

  // Just select a badge randomly on spin (for demo)
  function randomBadge() {
    return badges[Math.floor(Math.random() * badges.length)];
  }

  const [selectedBadge, setSelectedBadge] = useState(null);

  // Handle spin action
  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setHasSpun(true);

    // Random rotation, at least 3 full turns
    const spinDegrees = 1440 + Math.floor(Math.random() * 360); // 4+ full spins
    setWheelRotation(prev => prev + spinDegrees);
    // Wheel spin lasts 2s
    setTimeout(() => {
      // Unlock badge!
      const badge = randomBadge();
      setSelectedBadge(badge);
      setBadgeUnlocked(true);
      setSpinning(false);
    }, 2000);
  };

  // Reset everything
  const reset = () => {
    setBadgeUnlocked(false);
    setHasSpun(false);
    setSelectedBadge(null);
    setWheelRotation(0);
  };

  // The slices for the wheel are based on the demo badges
  const wheelSlices = [
    { label: badges[0].name, emoji: badges[0].emoji, color: "#FFD600" },
    { label: badges[1].name, emoji: badges[1].emoji, color: "#A259F7" },
    { label: badges[2].name, emoji: badges[2].emoji, color: "#FF6F61" },
    { label: badges[0].name, emoji: badges[0].emoji, color: "#FFD600" },
    { label: badges[1].name, emoji: badges[1].emoji, color: "#A259F7" },
    { label: badges[2].name, emoji: badges[2].emoji, color: "#FF6F61" },
  ];

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "54px auto",
        background: "linear-gradient(120deg, #A259F7 76%, #FFD600 105%)",
        borderRadius: 36,
        boxShadow: "0 2px 18px 0 rgba(162,89,247,0.13)",
        padding: "38px 18px 34px 18px",
        textAlign: "center",
        border: "3.5px solid #FFD600",
        minHeight: 480,
        position: "relative"
      }}
    >
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>🏅</div>
      <h2
        style={{
          color: "#fff",
          fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
          fontWeight: 700,
          background: "unset",
          WebkitBackgroundClip: "unset",
          WebkitTextFillColor: "unset",
          fontSize: "2.2rem",
          margin: 0,
          letterSpacing: 1.5,
          textShadow: "0 2px 9px #14141699"
        }}
      >
        Rewards & Gamification
      </h2>

      {/* Mini-game: Spin-the-wheel */}
      <div style={{ margin: '30px 0 0 0', display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          aria-label="spin the wheel"
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "7px solid #A259F7",
            background: "#fff",
            margin: "0 auto 17px auto",
            boxShadow: "0 2px 15px 0 rgba(162,89,247,0.21)",
            position: "relative",
            overflow: "hidden",
            zIndex: 3,
            transition: "box-shadow 0.13s"
          }}
        >
          {/* Arrow indicator */}
          <div style={{
            position: "absolute",
            top: -16,
            left: "calc(50% - 14px)",
            width: 28,
            height: 28,
            zIndex: 4,
            pointerEvents: "none"
          }}>
            <svg width="28" height="28">
              <polygon points="14,0 28,28 0,28" fill="#FFD600" stroke="#A259F7" strokeWidth="2" />
            </svg>
          </div>
          {/* Wheel */}
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              transition: "transform 2s cubic-bezier(.31,1.81,.48,.97)",
              willChange: "transform",
              transform: `rotate(${wheelRotation}deg)`
            }}
          >
            {wheelSlices.map((slice, i) => {
              // 6 slices, 60deg each
              const angle = (360 / wheelSlices.length) * i;
              return (
                <div
                  key={`slice-${i}`}
                  style={{
                    position: "absolute",
                    width: "50%",
                    height: "50%",
                    left: "25%",
                    top: "25%",
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "0 100%",
                    textAlign: "left",
                    zIndex: 2
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 24,
                      top: 62,
                      color: slice.color,
                      fontWeight: 700,
                      fontSize: "1.33rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      textShadow: "0 1px 0 #fff, 0 1.5px 0 #eaec",
                      pointerEvents: "none",
                      userSelect: "none"
                    }}
                  >
                    {slice.emoji}{" "}
                    <span style={{ fontSize: 14, color: "#222" }}>{slice.label}</span>
                  </div>
                </div>
              );
            })}
            {/* Slice backgrounds/segments */}
            {[...Array(wheelSlices.length)].map((_, i) => {
              // Colored sectors
              const startAngle = (360 / wheelSlices.length) * i;
              return (
                <div
                  key={`sector-${i}`}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    clipPath: "polygon(50% 50%, 100% 0, 100% 100%)",
                    background: wheelSlices[i].color,
                    opacity: 0.17,
                    transform: `rotate(${startAngle}deg)`
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Spin action or Result */}
        {!badgeUnlocked ? (
          <button
            className="btn btn-large"
            style={{
              marginTop: 4,
              minWidth: 120,
              background: spinning
                ? "repeating-linear-gradient(120deg, #FFD600, #A259F7 10%, #FF6F61 25%)"
                : "linear-gradient(90deg,#FFD600 52%,#A259F7 92%)",
              color: "#333",
              fontWeight: 700,
              fontSize: "1.18rem",
              border: "none",
              borderRadius: 12,
              padding: "13px 14px",
              letterSpacing: 0.6,
              transition: "background 0.18s",
              opacity: spinning ? 0.8 : 1,
              cursor: spinning ? "not-allowed" : "pointer",
              boxShadow: "0 2px 10px 0 rgba(255, 214, 0, 0.14)"
            }}
            disabled={spinning}
            onClick={spinWheel}
            aria-label="spin the wheel for badge"
          >
            {spinning ? (
              <span>
                <span role="img" aria-label="spinning">🎉</span> Spinning...
              </span>
            ) : (
              <span>
                Spin the Wheel!
                <span role="img" aria-label="sparkles" style={{ marginLeft: 6 }}>✨</span>
              </span>
            )}
          </button>
        ) : (
          <div style={{
            marginTop: 22,
            animation: "badge-pop 0.45s cubic-bezier(.21,2.0,.36,1.12) both",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div
              style={{
                fontSize: 62,
                marginBottom: 6,
                filter: "drop-shadow(0 5px 17px #FFD600aa)"
              }}
              aria-label="badge unlocked"
            >
              {selectedBadge.emoji}
            </div>
            <div style={{
              fontWeight: 800,
              color: selectedBadge.color,
              fontSize: "1.43rem",
              marginBottom: 4,
              letterSpacing: 0.8
            }}>
              {selectedBadge.name} UNLOCKED!
            </div>
            <div style={{
              color: "#181818",
              background: "#fff",
              padding: "11px 14px",
              borderRadius: 11,
              marginBottom: 10,
              fontSize: "1.05rem",
              boxShadow: "0 4px 22px 0 rgba(162,89,247,0.14)"
            }}>
              {selectedBadge.desc}
            </div>
            <button
              className="btn"
              style={{
                background: "linear-gradient(98deg,#FFD600 61%,#A259F7 93%)",
                color: "#fff",
                fontWeight: 700,
                marginTop: 10,
                fontSize: "1.08rem",
                letterSpacing: 0.6,
                border: "none",
                borderRadius: 10,
                padding: "9px 22px",
                boxShadow: "0 1px 6px 0 #FFD60044"
              }}
              onClick={reset}
              aria-label="Play again"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Animations - keyframes */}
      <style>
        {`
        @keyframes badge-pop {
          0% { transform: scale(0.3); opacity: 0; }
          70% { transform: scale(1.18); opacity: 1; }
          80% { transform: scale(0.86); }
          90% { transform: scale(1.08);}
          100% { transform: scale(1);}
        }
        `}
      </style>
      {/* Helper text or encouragement */}
      {!hasSpun && (
        <div style={{
          marginTop: 20,
          color: "#A259F7",
          fontWeight: 600,
          fontSize: "1.12rem"
        }}>
          Try the spin wheel and unlock a fun badge!
        </div>
      )}
    </div>
  );
}

export default RewardsGamification;
