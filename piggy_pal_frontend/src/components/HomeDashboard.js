import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Interactive Home Dashboard:
 * - Shows list of playful piggy bank avatars (goal cards).
 * - Click piggy to view details in a friendly modal.
 * - Animated "Add New Goal" creates a new empty piggy jar.
 * - Uses PiggyPal playful branding/colors and fun feedback.
 */
function HomeDashboard() {
  // Demo: mock piggy avatars ("jars"). In real app, would be fetched or global state!
  const samplePiggies = [
    {
      name: "Super Games",
      emoji: "🎮",
      color: "var(--accent-orange)",
      goal: 50,
      saved: 19,
      id: 1,
    },
    {
      name: "Bike Fund",
      emoji: "🚲",
      color: "var(--primary)",
      goal: 120,
      saved: 48,
      id: 2,
    },
    {
      name: "Birthday",
      emoji: "🎂",
      color: "var(--secondary)",
      goal: 35,
      saved: 33,
      id: 3,
    }
  ];

  // State: piggies/jars
  const [piggies, setPiggies] = useState(samplePiggies);
  // Modal/selected details
  const [selected, setSelected] = useState(null); // piggy id
  const [showModal, setShowModal] = useState(false);
  // "Add" animation state
  const [adding, setAdding] = useState(false);

  // Helper: Add a new piggy/jar (empty goal)
  function handleAddPiggy() {
    setAdding(true);
    setTimeout(() => {
      setPiggies(ps => [
        ...ps,
        {
          name: "",
          emoji: ["🐷", "🐖", "🐽", "🐗", "🥓"][Math.floor(Math.random() * 5)],
          color: ["var(--piggy-coral)", "var(--piggy-teal)", "var(--accent-purple)", "var(--accent-yellow)"][Math.floor(Math.random() * 4)],
          goal: 0,
          saved: 0,
          id: Date.now() + Math.floor(Math.random()*9999),
          isNew: true
        }
      ]);
      setAdding(false);
    }, 350); // playful delay
  }

  // Click piggy → open details modal
  function handleViewDetails(piggy) {
    setSelected(piggy);
    setShowModal(true);
  }

  // Close details modal
  function handleModalClose() {
    setShowModal(false);
    setTimeout(() => setSelected(null), 280);
  }

  // Playful progress bar renderer
  function PiggyProgress({ saved, goal }) {
    const pct = goal > 0 ? Math.min(saved / goal, 1) : 0;
    return (
      <div style={{
        background: "var(--border-color)",
        borderRadius: 9,
        height: 14,
        marginTop: 10,
        marginBottom: 2,
        position: "relative",
        width: "100%",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${pct * 100}%`,
          height: 14,
          background: "linear-gradient(91deg,var(--accent-1) 48%,var(--primary) 92%)",
          borderRadius: 9,
          transition: "width 0.57s cubic-bezier(.6,1.1,.36,1.01)",
          boxShadow: "0 1.5px 8px var(--accent-2)17"
        }} />
        <span style={{
          position: "absolute",
          left: 8,
          top: -3,
          fontSize: 11,
          color: "var(--text-light)",
          fontWeight: 800,
          letterSpacing: 0.6,
          background: "var(--secondary)",
          borderRadius: 7,
          padding: "2px 6px",
          textShadow: "none",
          fontFamily: "var(--font-playful)"
        }}>{goal > 0 ? `$${saved}/${goal}` : "Set your goal!"}</span>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 490,
      minHeight: 420,
      margin: '54px auto',
      background: 'linear-gradient(118deg, var(--secondary) 86%, var(--accent-2) 135%)',
      borderRadius: 36,
      boxShadow: "0 2px 18px 0 var(--primary)1a, 0 7px 33px 0 var(--secondary)19",
      padding: '30px 12px 28px 12px',
      textAlign: 'center',
      border: '3.5px solid var(--primary)',
      transition: "box-shadow 0.13s",
      position: "relative",
      overflow: "visible",
      fontFamily: "var(--font-playful)",
      color: "var(--text-dark)"
    }}>
      <div style={{ fontSize: "2.4rem", marginBottom: 8, color: "var(--accent-2)", fontFamily: "var(--font-playful)" }} aria-label="Piggy Home">🐷🏠</div>
      <h2 style={{
        color: "var(--accent-2)",
        fontFamily: "var(--font-playful)",
        fontWeight: 800,
        background: "linear-gradient(70deg,var(--accent-2) 60%,var(--accent-1) 130%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontSize: "2.15rem",
        margin: 0,
        letterSpacing: 1.5
      }}>
        Your PiggyPals
      </h2>
      <div style={{
        color: "var(--accent-1)",
        fontWeight: 700,
        fontFamily: "var(--font-playful)",
        fontSize: "1.2rem",
        margin: "21px 0 19px 0"
      }}>
        {piggies.length === 0 ? "Create your first piggy goal!" : "Tap a piggy to view progress"}
      </div>
      {/* Piggy avatars/cards grid */}
      <div style={{
        display: "flex",
        gap: "21px",
        flexWrap: "wrap",
        justifyContent: "center",
        minHeight: 90,
        marginBottom: 16
      }}>
        {piggies.map((p, idx) => (
          <div
            key={p.id}
            tabIndex={0}
            role="button"
            aria-label={p.name ? `View ${p.name} piggy details` : "View new piggy details"}
            onClick={() => handleViewDetails(p)}
            onKeyDown={(e) => { if (["Enter"," "].includes(e.key)) handleViewDetails(p); }}
            style={{
              cursor: "pointer",
              outline: "none",
              background: `linear-gradient(120deg, ${p.color} 85%, var(--accent-1) 120%)`,
              borderRadius: 26,
              boxShadow: p.isNew ? "0 6px 27px 0 var(--secondary)77,0 2.5px 18px var(--accent-1)66"
                                : "0 2px 13px var(--accent-2)17",
              padding: "16px 16px 13px 16px",
              margin: "8px 0",
              minWidth: 104,
              minHeight: 94,
              maxWidth: 122,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: `2.3px solid var(--surface)`,
              transition: "box-shadow .18s, border .17s, transform .19s, background .19s",
              position: "relative",
              zIndex: 1,
              animation: p.isNew ? "piggy-pop 0.74s cubic-bezier(.22,1.6,.41,1.01) both" : undefined,
              fontFamily: "var(--font-playful)"
            }}
          >
            <span
              style={{
                fontSize: 38,
                filter: "drop-shadow(0 2px 10px var(--accent-2)11) drop-shadow(0 2px 2px var(--secondary)4a)",
                transform: p.isNew ? "scale(1.23)" : undefined,
                transition: "transform 0.15s",
                fontFamily: "var(--font-playful)"
              }}
            >
              {p.emoji}
            </span>
            <div
              style={{
                fontWeight: 800,
                fontFamily: "var(--font-playful)",
                color: "var(--text-dark)",
                fontSize: "1.08rem",
                letterSpacing: 0.7,
                margin: "6px 0 1px 0",
                maxWidth: 95,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>
              {p.name
                ? p.name
                : <span style={{
                    color: "var(--secondary)",
                    fontWeight: 900,
                    fontFamily: "var(--font-playful)"
                  }}>New Goal!</span>}
            </div>
            <PiggyProgress saved={p.saved} goal={p.goal} />
            {/* Mini 'View' badge */}
            <span
              style={{
                fontSize: 13,
                color: "var(--secondary)",
                background: "var(--surface)",
                fontWeight: 900,
                fontFamily: "var(--font-playful)",
                padding: "1px 7px 1.5px 7px",
                borderRadius: 9,
                marginTop: 5,
                letterSpacing: 0.37
              }}>
              View
            </span>
          </div>
        ))}
      </div>
      {/* Animated Add New Goal button */}
      <button
        className="btn btn-large"
        style={{
          marginTop: 13,
          padding: "13px 34px 13px 21px",
          background: adding
            ? "repeating-linear-gradient(-90deg, var(--secondary), var(--accent-1) 8%, var(--primary) 17%)"
            : "linear-gradient(95deg, var(--secondary) 60%, var(--primary) 112%)",
          color: "var(--text-dark)",
          fontWeight: 900,
          fontFamily: "var(--font-playful)",
          fontSize: "1.16rem",
          letterSpacing: 1,
          border: "none",
          borderRadius: 14,
          position: "relative",
          minWidth: 165,
          boxShadow: "0 4px 22px 0 var(--secondary)22,0 1.5px 7px 0 var(--accent-2)14",
          transition: "background 0.18s, box-shadow 0.12s, filter 0.13s",
          filter: adding ? "brightness(1.1) blur(0.5px)" : undefined,
          outline: adding ? "3px solid var(--secondary)" : "none",
          pointerEvents: adding ? "none" : undefined
        }}
        onClick={handleAddPiggy}
        aria-label="Add new piggy goal"
        disabled={adding}
      >
        <span style={{
          marginRight: 10, fontSize: 26, verticalAlign: "middle", display: "inline-block",
          animation: adding ? "wiggle 0.55s cubic-bezier(.22,1.41,.53,.82) both" : undefined,
          fontFamily: "var(--font-playful)"
        }}>➕</span>
        Add New Goal
      </button>
      {adding && (
        <div style={{
          color: "var(--accent-1)",
          fontWeight: 700,
          fontFamily: "var(--font-playful)",
          fontSize: "1.12rem",
          marginTop: 13,
          animation: "fadein 0.55s cubic-bezier(.22,1.13,.32,.86) both"
        }}>
          Creating a new piggy jar...
        </div>
      )}
      {/* "No piggies" encouragement */}
      {!adding && piggies.length === 0 && (
        <div style={{
          color: "var(--accent-2)",
          fontWeight: 700,
          fontFamily: "var(--font-playful)",
          marginTop: 21,
          fontSize: "1.18rem"
        }}>
          Let's start your very first goal!
        </div>
      )}

      {/* Details Modal */}
      {showModal && selected && (
        <div
          aria-modal="true"
          tabIndex={-1}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(33,37,41,0.64)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={handleModalClose} // click outside closes
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 370,
              background: "var(--surface)",
              borderRadius: 30,
              padding: "27px 22px 24px 22px",
              boxShadow: "0 8px 38px 0 var(--secondary)4a, 0 1.5px 7px var(--accent-2)21",
              border: `3.5px solid ${selected.color || "var(--secondary)"}`,
              textAlign: "center",
              animation: "piggy-pop 0.36s cubic-bezier(.33,1.2,.48,1.01) both",
              minHeight: 190,
              fontFamily: "var(--font-playful)",
              color: "var(--text-light)"
            }}
          >
            <div style={{
              fontSize: 51,
              marginBottom: 9,
              filter: "drop-shadow(0 4px 18px var(--accent-1)55)",
              fontFamily: "var(--font-playful)"
            }}>
              {selected.emoji}
            </div>
            <div style={{
              fontWeight: 900,
              fontFamily: "var(--font-playful)",
              color: "var(--accent-2)",
              background: "linear-gradient(70deg,var(--accent-2) 65%,var(--accent-1) 110%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "1.45rem",
              letterSpacing: 1,
              marginBottom: 6
            }}>
              {selected.name && selected.name.length > 0 ? selected.name : "Unnamed Piggy"}
            </div>
            <div style={{
              color: "var(--accent-1)",
              fontWeight: 600,
              fontFamily: "var(--font-playful)",
              fontSize: "1.15rem"
            }}>
              {selected.goal > 0 ? (
                <>
                  Goal: <span style={{ color: "var(--accent-2)", fontWeight: 800, fontFamily: "var(--font-playful)" }}>${selected.goal}</span>
                  <br />Saved:&nbsp;
                  <span style={{ color: "var(--primary)", fontWeight: 800, fontFamily: "var(--font-playful)" }}>${selected.saved}</span>
                  <br />
                  <PiggyProgress saved={selected.saved} goal={selected.goal} />
                  {(selected.saved >= selected.goal) && (
                    <div style={{
                      color: "var(--secondary)",
                      background: "var(--card-bg-light)",
                      fontWeight: 800,
                      fontFamily: "var(--font-playful)",
                      borderRadius: 8,
                      padding: "5px 10px",
                      marginTop: 9
                    }}>
                      🎉 Goal reached! Time to treat yourself.
                    </div>
                  )}
                </>
              ) : (
                <div style={{ color:"var(--accent-1)", fontWeight: 800, fontFamily: "var(--font-playful)" }}>
                  New piggy! Tap "Goal" to set target on the Goals tab.
                </div>
              )}
            </div>
            <button
              className="btn"
              style={{
                background: "linear-gradient(90deg,var(--accent-1) 50%,var(--accent-2) 100%)",
                color: "var(--text-dark)",
                fontWeight: 800,
                fontFamily: "var(--font-playful)",
                marginTop: 18,
                border: "none",
                borderRadius: 10,
                padding: "8px 20px",
                fontSize: "1.07rem"
              }}
              onClick={handleModalClose}
              aria-label="close piggy info"
              autoFocus
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Animations */}
      <style>
        {`
        @keyframes piggy-pop {
          0% { transform: scale(0.70); opacity: 0.2;}
          70% { transform: scale(1.07); opacity: 1;}
          95% { transform: scale(0.93);}
          100% { transform: scale(1);}
        }
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(-22px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes wiggle {
          0% { transform: rotate(-10deg) scale(1.10);}
          16% { transform: rotate(7deg) scale(1.15);}
          31% { transform: rotate(-6deg) scale(1.0);}
          45% { transform: rotate(3deg) scale(1.11);}
          57% { transform: rotate(-2deg);}
          68% { transform: rotate(2deg);}
          100% { transform: rotate(0deg) scale(1);}
        }
        `}
      </style>
      {!showModal && (
        <div style={{
          marginTop: 30,
          color: "var(--accent-1)",
          fontWeight: 600,
          fontFamily: "var(--font-playful)",
          fontSize: "1.09rem"
        }}>
          Make saving fun! Track all your piggy jars here.
        </div>
      )}
    </div>
  );
}

export default HomeDashboard;
