import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Interactive Home Dashboard:
 * - Shows list of playful piggy bank avatars (goal cards).
 * - Add, delete, or update each goal (name, limit, amount).
 * - Add money to a goal directly from dashboard.
 * - Uses playful palette and rounded styles.
 */
function HomeDashboard() {
  // Palette - available piggy colors
  const piggyColors = [
    "var(--primary)",     // coral
    "var(--secondary)",   // teal
    "var(--accent-1)",    // purple
    "var(--accent-2)",    // gold/yellow
    "var(--accent-orange)"// orange
  ];
  const piggyEmojis = ["🐷", "🐖", "🐽", "🐗", "🥓", "🎁", "🎮", "🚲", "🎂"];

  // Initial demo state for user goals (could move to persisted state or backend in future)
  const initialGoals = [
    { id: 1, name: "Super Games", emoji: "🎮", color: piggyColors[4], goal: 50, saved: 19 },
    { id: 2, name: "Bike Fund", emoji: "🚲", color: piggyColors[0], goal: 120, saved: 48 },
    { id: 3, name: "Birthday", emoji: "🎂", color: piggyColors[1], goal: 35, saved: 33 }
  ];

  // Local state: Array of savings goals
  const [goals, setGoals] = useState(initialGoals);
  // Modal control for details
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Add goal animation
  const [adding, setAdding] = useState(false);
  // Add form control (for new goal)
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalLimit, setNewGoalLimit] = useState("");
  // UI error feedback for goal creation
  const [addError, setAddError] = useState("");
  // Manage input for quick add-money direct to dashboard
  const [addAmtById, setAddAmtById] = useState({}); // { goalId: "" } keyed by goal id

  // Add new savings goal (with user input for name and savings limit)
  function handleAddGoal(e) {
    e.preventDefault();
    const name = newGoalName.trim();
    const goalLimit = parseFloat(newGoalLimit);
    // Validation
    if (!name || isNaN(goalLimit) || goalLimit <= 0) {
      setAddError("Please enter a name and valid amount.");
      return;
    }
    const emoji = piggyEmojis[Math.floor(Math.random() * piggyEmojis.length)];
    const color = piggyColors[Math.floor(Math.random() * piggyColors.length)];
    setAdding(true);
    setTimeout(() => {
      setGoals(arr => [
        ...arr,
        {
          id: Date.now() + Math.floor(Math.random()*9999),
          name,
          emoji,
          color,
          goal: Math.round(goalLimit * 100) / 100,
          saved: 0
        }
      ]);
      setNewGoalName("");
      setNewGoalLimit("");
      setAddError("");
      setAdding(false);
    }, 370);
  }

  // Add money to an existing goal (increments the saved amount, never goes beyond the goal limit)
  function handleAddMoney(goalId, amount) {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    setGoals(gs =>
      gs.map(g =>
        g.id === goalId
          ? { ...g, saved: Math.min(g.saved + amt, g.goal) }
          : g
      )
    );
    setAddAmtById(s => ({ ...s, [goalId]: "" }));
  }

  // Remove a goal
  function handleDeleteGoal(goalId) {
    setGoals(gs => gs.filter(g => g.id !== goalId));
    // Clean up input state
    setAddAmtById(a => {
      const { [goalId]: _, ...rest } = a;
      return rest;
    });
    if (selected && selected.id === goalId) {
      setShowModal(false); setSelected(null);
    }
  }

  // Click piggy/card to open modal for more info
  function handleViewDetails(goal) {
    setSelected(goal);
    setShowModal(true);
  }

  // Close details modal
  function handleModalClose() {
    setShowModal(false);
    setTimeout(() => setSelected(null), 220);
  }

  // Handle quick add-amount input change
  function handleQuickAmtChange(goalId, val) {
    if (!/^\d*\.?\d{0,2}$/.test(val)) return;
    setAddAmtById(s => ({ ...s, [goalId]: val }));
  }

  // Playful progress bar renderer
  // PUBLIC_INTERFACE
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

  // Helper: render a single goal card (with add, delete, quick add forms)
  function GoalCard({ goal, idx }) {
    return (
      <div
        key={goal.id}
        tabIndex={0}
        role="button"
        aria-label={goal.name ? `View ${goal.name} piggy details` : "View new piggy details"}
        onClick={() => handleViewDetails(goal)}
        onKeyDown={(e) => { if (["Enter", " "].includes(e.key)) handleViewDetails(goal); }}
        style={{
          cursor: "pointer",
          outline: "none",
          background: `linear-gradient(120deg, ${goal.color} 85%, var(--accent-1) 120%)`,
          borderRadius: 26,
          boxShadow: "0 2px 13px var(--accent-2)17",
          padding: "16px 16px 13px 16px",
          margin: "8px 0",
          minWidth: 104,
          minHeight: 94,
          maxWidth: 138,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: `2.3px solid var(--surface)`,
          transition: "box-shadow .18s, border .17s, transform .19s, background .19s",
          position: "relative",
          zIndex: 1,
          fontFamily: "var(--font-playful)"
        }}
      >
        <span
          style={{
            fontSize: 38,
            filter: "drop-shadow(0 2px 10px var(--accent-2)11) drop-shadow(0 2px 2px var(--secondary)4a)",
            transition: "transform 0.15s",
            fontFamily: "var(--font-playful)"
          }}
        >
          {goal.emoji}
        </span>
        <div
          style={{
            fontWeight: 800,
            color: "var(--text-dark)",
            fontSize: "1.06rem",
            letterSpacing: 0.7,
            margin: "6px 0 1px 0",
            maxWidth: 98,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
          {goal.name}
        </div>
        <PiggyProgress saved={goal.saved} goal={goal.goal} />
        {/* Add money quick form */}
        <form
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4
          }}
          onSubmit={e => {
            e.preventDefault();
            handleAddMoney(goal.id, addAmtById[goal.id]);
          }}
          onClick={e => e.stopPropagation()} // don't trigger view details modal
        >
          <input
            type="text"
            value={addAmtById[goal.id] || ""}
            onChange={e => handleQuickAmtChange(goal.id, e.target.value)}
            placeholder="+$"
            inputMode="decimal"
            pattern="^[0-9]*[.]?[0-9]{0,2}$"
            maxLength={7}
            style={{
              width: 44,
              fontSize: 15,
              borderRadius: 8,
              border: "1.7px solid var(--accent-2)",
              padding: "2.3px 7px",
              fontWeight: 700,
              color: "var(--accent-1)",
              background: "var(--surface-alt)",
              outline: "none"
            }}
            aria-label="Add amount"
          />
          <button
            type="submit"
            className="btn"
            style={{
              fontWeight: 700,
              fontSize: "0.99rem",
              borderRadius: 8,
              padding: "4px 12px",
              background: "var(--accent-gold)",
              color: "var(--primary)",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 1.5px 6px var(--accent-gold)20",
              marginLeft: 1
            }}
            disabled={
              !addAmtById[goal.id] ||
              isNaN(parseFloat(addAmtById[goal.id])) ||
              parseFloat(addAmtById[goal.id]) <= 0 ||
              goal.saved >= goal.goal
            }
            aria-label="Add money to goal"
            tabIndex={0}
          >＋</button>
        </form>
        {/* Delete this goal (trash icon button) */}
        <button
          className="btn"
          title="Delete goal"
          aria-label="Delete goal"
          style={{
            background: "var(--accent-orange)",
            color: "var(--surface)",
            border: "none",
            borderRadius: 9,
            marginTop: 5,
            fontWeight: 700,
            fontSize: 11,
            padding: "2px 11px",
            cursor: "pointer",
            boxShadow: "0 1px 5px var(--accent-orange)33"
          }}
          onClick={e => { e.stopPropagation(); handleDeleteGoal(goal.id); }}
        >
          <span role="img" aria-label="delete">🗑️</span>
        </button>
        {/* Mini view badge */}
        <span
          style={{
            fontSize: 12,
            color: "var(--secondary)",
            background: "var(--card-bg-light)",
            fontWeight: 900,
            padding: "1px 7px 1.5px 7px",
            borderRadius: 8,
            marginTop: 5,
            letterSpacing: 0.37
          }}>
          View
        </span>
      </div>
    );
  }

  // Calculate total saved across all goals
  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0);
  const totalGoal = goals.reduce((sum, g) => sum + g.goal, 0);

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
                background: "var(--card-bg-light)",
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
              background: "var(--card-bg-default)",
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
