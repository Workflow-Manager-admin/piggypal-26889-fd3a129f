import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Playful Rewards & Gamification screen featuring a "spin-the-wheel" demo mini-game
 * to unlock a badge, with animated feedback.
 */
function RewardsGamification() {
  const [spinning, setSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  // Palette colors mapped to semantic CSS vars
  const BADGE_COLORS = [
    "var(--accent-gold)",     // yellow
    "var(--accent-purple)",   // purple
    "var(--accent-orange)",   // coral/orange
  ];

  const badges = [
    {
      name: "Super Saver",
      emoji: "💰",
      desc: "Saved 3 days in a row!",
      color: "var(--accent-gold)"
    },
    {
      name: "Goal Getter",
      emoji: "🎯",
      desc: "Set your first goal.",
      color: "var(--accent-purple)"
    },
    {
      name: "Spin Star",
      emoji: "🌟",
      desc: "Tried the wheel!",
      color: "var(--accent-orange)"
    },
  ];

  function randomBadge() {
    return badges[Math.floor(Math.random() * badges.length)];
  }

  const [selectedBadge, setSelectedBadge] = useState(null);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setHasSpun(true);
    // Random rotation, at least 3 full turns
    const spinDegrees = 1440 + Math.floor(Math.random() * 360);
    setWheelRotation(prev => prev + spinDegrees);
    setTimeout(() => {
      const badge = randomBadge();
      setSelectedBadge(badge);
      setBadgeUnlocked(true);
      setSpinning(false);
    }, 2000);
  };

  const reset = () => {
    setBadgeUnlocked(false);
    setHasSpun(false);
    setSelectedBadge(null);
    setWheelRotation(0);
  };

  const wheelSlices = [
    { label: badges[0].name, emoji: badges[0].emoji, color: "var(--accent-gold)" },
    { label: badges[1].name, emoji: badges[1].emoji, color: "var(--accent-purple)" },
    { label: badges[2].name, emoji: badges[2].emoji, color: "var(--accent-orange)" },
    { label: badges[0].name, emoji: badges[0].emoji, color: "var(--accent-gold)" },
    { label: badges[1].name, emoji: badges[1].emoji, color: "var(--accent-purple)" },
    { label: badges[2].name, emoji: badges[2].emoji, color: "var(--accent-orange)" },
  ];

  // Outer: "page" container uses background variable, inner card area uses surface (strong contrast)
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "calc(100vh - 120px)",
        background: "var(--background)",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          maxWidth: 420,
          margin: "54px auto",
          background: "var(--surface)",
          borderRadius: 36,
          boxShadow: "0 2px 18px 0 var(--accent-purple)13",
          padding: "38px 18px 34px 18px",
          textAlign: "center",
          border: "3.5px solid var(--accent-gold)",
          minHeight: 480,
          position: "relative",
          zIndex: 1
        }}
      >
      <div style={{
        fontSize: "3.2rem",
        marginBottom: 8,
        color: "var(--accent-gold)"
      }}>🏅</div>
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
          textShadow: "0 2px 9px var(--background)99"
        }}
      >
        Rewards & Gamification
      </h2>

      {/* Mini-game: Spin-the-wheel */}
      <div style={{ margin: "30px 0 0 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          aria-label="spin the wheel"
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "7px solid var(--accent-purple)",
            background: "var(--surface)",
            margin: "0 auto 17px auto",
            boxShadow: "0 2px 15px 0 var(--accent-purple)21",
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
              <polygon
                points="14,0 28,28 0,28"
                fill="var(--accent-gold)"
                stroke="var(--accent-purple)"
                strokeWidth="2"
              />
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
                      fontFamily: "var(--font-playful)",
                      fontSize: "1.33rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      textShadow: "0 1px 0 var(--surface), 0 1.5px 0 var(--border-color)",
                      pointerEvents: "none",
                      userSelect: "none"
                    }}
                  >
                    {slice.emoji}{" "}
                    <span style={{
                      fontSize: 14,
                      color: "var(--text-light)",
                      textShadow: "0 1px 1px var(--surface), 0 1.5px 0 var(--border-color)"
                    }}>{slice.label}</span>
                  </div>
                </div>
              );
            })}
            {/* Slice backgrounds/segments */}
            {[...Array(wheelSlices.length)].map((_, i) => {
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
                ? "repeating-linear-gradient(120deg, var(--accent-gold), var(--accent-purple) 10%, var(--accent-orange) 25%)"
                : "linear-gradient(90deg, var(--accent-gold) 52%, var(--accent-purple) 92%)",
              color: "var(--text-light)",
              fontWeight: 700,
              fontSize: "1.18rem",
              border: "none",
              borderRadius: 12,
              padding: "13px 14px",
              letterSpacing: 0.6,
              transition: "background 0.18s",
              opacity: spinning ? 0.8 : 1,
              cursor: spinning ? "not-allowed" : "pointer",
              boxShadow: "0 2px 10px 0 var(--accent-gold)14",
              textShadow: "0 1px 2px var(--surface)"
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
                filter: "drop-shadow(0 5px 17px var(--accent-gold)aa)",
                color: "var(--accent-gold)",
                textShadow: "0 2px 14px var(--accent-gold)55, 0 3px 17px var(--background)99"
              }}
              aria-label="badge unlocked"
            >
              {selectedBadge.emoji}
            </div>
            <div style={{
              fontWeight: 800,
              color: "var(--text-dark)",
              fontSize: "1.43rem",
              marginBottom: 4,
              letterSpacing: 0.8,
              textShadow: "0 2px 8px var(--background)"
            }}>
              {selectedBadge.name} <span style={{
                color: selectedBadge.color,
                textShadow: "0 2px 7px var(--accent-gold)66"
              }}>UNLOCKED!</span>
            </div>
            <div style={{
              color: "var(--text-dark)",
              background: "var(--surface)",
              padding: "11px 14px",
              borderRadius: 11,
              marginBottom: 10,
              fontSize: "1.08rem",
              boxShadow: "0 4px 18px 0 var(--accent-gold)15, 0 2px 7px var(--accent-purple)10",
              textShadow: "0 1px 3px var(--background)20"
            }}>
              {selectedBadge.desc}
            </div>
            <button
              className="btn"
              style={{
                background: "linear-gradient(98deg, var(--accent-gold) 61%, var(--accent-purple) 93%)",
                color: "var(--button-text)",
                fontWeight: 700,
                marginTop: 10,
                fontSize: "1.08rem",
                letterSpacing: 0.6,
                border: "none",
                borderRadius: 10,
                padding: "9px 22px",
                boxShadow: "0 1px 6px 0 var(--accent-gold)44"
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
      {!hasSpun && (
        <div style={{
          marginTop: 20,
          color: "var(--text-dark)",
          fontWeight: 600,
          fontSize: "1.12rem",
          textShadow: "0 2px 8px var(--surface)22"
        }}>
          Try the spin wheel and unlock a fun badge!
        </div>
      )}
    </div>
  );
}

export default RewardsGamification;
