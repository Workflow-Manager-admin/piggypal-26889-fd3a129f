import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Interactive Home Dashboard:
 * Displays all savings goals in playful card form,
 * provides add, update, and delete functionality, and enforces
 * clear visual contrast: feature cards use var(--surface), page uses var(--background).
 */
function HomeDashboard() {
  // Savings goals state
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "New Bike",
      target: 100,
      saved: 25,
      color: "var(--accent-purple)",
      emoji: "🚲"
    },
    {
      id: 2,
      name: "Comic Book",
      target: 15,
      saved: 8,
      color: "var(--accent-gold)",
      emoji: "📚"
    }
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [addError, setAddError] = useState("");
  const [addAnim, setAddAnim] = useState(false);

  // Add new goal
  const handleAddGoal = (e) => {
    e.preventDefault();
    const name = newGoalName.trim();
    const target = parseFloat(newGoalTarget);
    if (!name || isNaN(target) || target < 1) {
      setAddError("Enter a name and amount ($1+)");
      return;
    }
    setAddError("");
    setShowAdd(false);
    setAddAnim(true);
    setTimeout(() => setAddAnim(false), 680);
    setGoals([
      ...goals,
      {
        id: Date.now(),
        name,
        target,
        saved: 0,
        color: pickAccent(goals.length),
        emoji: pickEmoji(goals.length)
      }
    ]);
    setNewGoalName("");
    setNewGoalTarget("");
  };

  // Add money to a goal
  const handleAddMoney = (id) => {
    setGoals(goals =>
      goals.map(g =>
        g.id === id
          ? { ...g, saved: Math.min(g.saved + 5, g.target) }
          : g
      )
    );
  };

  // Delete a goal - simulate "deleted" property for future-proofing (even though filter suffices now)
  // If a goal had a 'deleted' key, do not display it.
  const handleDelete = (id) => {
    setGoals(goals => 
      goals.filter(g => g.id !== id)
      // If supporting 'deleted' in future: goals.map(g => g.id === id ? {...g, deleted: true} : g)
    );
  };

  // Accent color/emoji mappings
  function pickAccent(idx) {
    // Rotates palette accent colors for cards
    const palette = [
      "var(--accent-purple)",
      "var(--accent-gold)",
      "var(--accent-teal)",
      "var(--accent-orange)"
    ];
    return palette[idx % palette.length];
  }
  function pickEmoji(idx) {
    const palette = ["🐖", "🍭", "🎒", "🎁", "🏀", "🧸", "🎹"];
    return palette[idx % palette.length];
  }

  return (
    <div style={{
      width: "100%",
      background: "none", // Card container only, main bg set globally
      margin: "0px auto"
    }}>
      <div style={{
        margin: "0 auto",
        maxWidth: 860,
        padding: "0 10px"
      }}>
        {/* Title area */}
        <section className="hero" style={{
          paddingTop: 15,
          paddingBottom: 17,
          background: "none"
        }}>
          <div style={{
            fontSize: "3.7rem",
            marginBottom: 3,
            color: "var(--primary)",
            filter: "drop-shadow(0 2px 10px var(--accent-1)33)"
          }}>
            🏠
          </div>
          <h1 className="title" style={{
            color: "var(--primary)",
            fontWeight: 800,
            fontFamily: "var(--font-playful)",
            marginBottom: 4,
            fontSize: "2.45rem",
            letterSpacing: 1.1,
            lineHeight: 1.16,
            textShadow: "0 2px 10px var(--accent-purple)13"
          }}>
            Your PiggyPal Dashboard
          </h1>
          <div className="subtitle" style={{
            color: "var(--accent-teal)",
            fontWeight: 700,
            fontSize: "1.12rem"
          }}>
            Track your goals, add savings, and smash your targets!
          </div>
        </section>

        {/* ALL GOALS */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 30,
          justifyContent: "center"
        }}>
          {goals.map((goal, idx) => (
            <div
              key={goal.id}
              className="feature-card"
              style={{
                // Card background & border based on app palette
                background: "var(--surface)",
                borderRadius: 32,
                boxShadow: "0 3px 24px 0 #FFD60019, 0 12px 45px 0 #A259F723",
                padding: "36px 17px 29px 17px",
                margin: "29px 0",
                minWidth: 265,
                maxWidth: 340,
                border: `3.5px solid ${goal.color}`,
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                transition: "box-shadow 0.18s"
              }}
            >
              <div style={{ fontSize: "2.4rem", marginBottom: 7 }}>
                {goal.emoji}
              </div>
              <h2 style={{
                color: goal.color,
                background: `linear-gradient(70deg, ${goal.color} 68%, var(--primary) 130%)`,
                fontFamily: "var(--font-playful)",
                fontWeight: 700,
                letterSpacing: 1.4,
                margin: 0,
                fontSize: "1.28rem",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                {goal.name}
              </h2>
              <div className="card-desc" style={{
                color: "var(--text-dark)",
                fontWeight: 600,
                fontSize: "1.11rem",
                marginTop: 11,
                marginBottom: 13
              }}>
                Saved: ${goal.saved} / ${goal.target}
              </div>
              {/* Progress bar */}
              <div style={{
                width: "100%",
                height: 19,
                background: "var(--surface-alt)",
                borderRadius: 11,
                border: `2px solid ${goal.color}`,
                margin: "9px 0 11px 0",
                boxShadow: "0 1px 6px var(--accent-gold)25"
              }}>
                <div style={{
                  height: 17,
                  borderRadius: 10,
                  width: `${(goal.saved / goal.target) * 100}%`,
                  background: `linear-gradient(95deg, ${goal.color} 60%, var(--accent-gold) 105%)`,
                  transition: "width 0.4s cubic-bezier(.41,1.36,.68,1.0)"
                }} />
              </div>
              {/* Add Money/Delete */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: 9,
                marginTop: 8
              }}>
                <button
                  className="btn btn-large"
                  style={{
                    background: goal.saved < goal.target ?
                      "linear-gradient(90deg, var(--primary) 62%, var(--accent-teal) 111%)" :
                      "#aaa",
                    color: goal.saved < goal.target ? "var(--text-light)" : "#eee",
                    fontWeight: 800,
                    border: "none",
                    borderRadius: 9,
                    fontSize: "1.03rem",
                    padding: "7px 16px",
                    cursor: goal.saved < goal.target ? "pointer" : "not-allowed",
                    opacity: goal.saved < goal.target ? 1 : 0.7,
                    boxShadow: "0 2px 12px 0 var(--primary)12",
                    transition: "background 0.15s"
                  }}
                  type="button"
                  aria-label={`Add money to ${goal.name}`}
                  onClick={() => handleAddMoney(goal.id)}
                  disabled={goal.saved >= goal.target}
                >
                  {goal.saved < goal.target
                    ? <>Add&nbsp;<span style={{ fontWeight: 900 }}>$5</span> 🐷</>
                    : <>Goal Reached! 🎉</>
                  }
                </button>
                <button
                  className="btn"
                  style={{
                    background: "#eaeaea",
                    color: "#f24a4a",
                    fontSize: "1.04rem",
                    fontWeight: 700,
                    border: "none",
                    borderRadius: 8,
                    padding: "7px 12px",
                    marginLeft: 2,
                    transition: "background 0.15s"
                  }}
                  type="button"
                  aria-label={`Delete ${goal.name}`}
                  onClick={() => handleDelete(goal.id)}
                >
                  <span role="img" aria-label="delete">🗑️</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Add new goal */}
        <div style={{
          maxWidth: 370,
          margin: "35px auto 8px auto",
          textAlign: "center"
        }}>
          {!showAdd ? (
            <button
              className="btn btn-large"
              style={{
                background: "linear-gradient(90deg, var(--accent-1) 52%, var(--primary) 110%)",
                color: "var(--text-light)",
                borderRadius: 17,
                fontWeight: 800,
                fontSize: "1.19rem",
                margin: "0 auto",
                boxShadow: "0 2px 12px var(--accent-1)19",
                padding: "16px 27px",
                marginBottom: 5
              }}
              aria-label="Add New Goal"
              onClick={() => setShowAdd(true)}
            >
              <span style={{ fontSize: "1.35rem", marginRight: 6 }}>➕</span> Add New Goal
            </button>
          ) : (
            <form
              style={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                gap: 13,
                alignItems: "center",
                background: "var(--surface-alt)",
                borderRadius: 14,
                boxShadow: "0 2px 14px var(--accent-purple)11",
                padding: "17px 9px"
              }}
              onSubmit={handleAddGoal}
              autoComplete="off"
            >
              <div style={{ width: "100%" }}>
                <label htmlFor="goal-name" style={{
                  display: "block",
                  fontWeight: 600,
                  color: "var(--primary)",
                  fontSize: "1.06rem",
                  marginBottom: 7,
                  textAlign: "left"
                }}>
                  Goal Name:
                </label>
                <input
                  id="goal-name"
                  value={newGoalName}
                  onChange={e => setNewGoalName(e.target.value)}
                  maxLength={27}
                  type="text"
                  placeholder="Eg, LEGO Set"
                  style={{
                    width: "97%",
                    border: "2px solid var(--primary)",
                    borderRadius: 10,
                    fontSize: "1.12rem",
                    padding: "8px 9px",
                    outline: "none",
                    fontWeight: 500,
                    background: "var(--surface-contrast)",
                    color: "var(--text-dark)"
                  }}
                  required
                  autoFocus
                />
              </div>
              <div style={{ width: "100%" }}>
                <label htmlFor="goal-target" style={{
                  display: "block",
                  fontWeight: 600,
                  color: "var(--primary)",
                  fontSize: "1.06rem",
                  marginBottom: 7,
                  textAlign: "left"
                }}>
                  Goal Amount ($):
                </label>
                <input
                  id="goal-target"
                  value={newGoalTarget}
                  onChange={e => setNewGoalTarget(e.target.value.replace(/[^0-9.]/g, ""))}
                  type="text"
                  placeholder="Eg, 25.00"
                  style={{
                    width: "97%",
                    border: "2px solid var(--accent-1)",
                    borderRadius: 10,
                    fontSize: "1.12rem",
                    padding: "8px 9px",
                    outline: "none",
                    fontWeight: 500,
                    background: "var(--surface-contrast)",
                    color: "var(--text-dark)"
                  }}
                  inputMode="decimal"
                  pattern="^[0-9]*[.]?[0-9]{0,2}$"
                  required
                />
              </div>
              {addError &&
                <div style={{ color: "var(--accent-1)", fontWeight: 700, fontSize: "1.01rem", minHeight: 17 }}>
                  {addError}
                </div>
              }
              <div style={{ display: "flex", gap: 11, marginTop: 4 }}>
                <button
                  className="btn"
                  type="submit"
                  style={{
                    background: "linear-gradient(90deg,var(--primary) 66%,var(--accent-1) 107%)",
                    color: "var(--text-light)",
                    fontWeight: 700,
                    borderRadius: 10,
                    fontSize: "1.12rem",
                    padding: "9px 21px"
                  }}
                  aria-label="Save New Goal"
                >Save</button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setShowAdd(false)}
                  style={{
                    background: "#b5babd",
                    color: "#fff",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: "1.12rem",
                    padding: "9px 18px"
                  }}
                  aria-label="Cancel Add Goal"
                >Cancel</button>
              </div>
            </form>
          )}
        </div>
        {/* If no goals - encouragement */}
        {goals.length === 0 && (
          <div style={{
            margin: "35px auto 8px auto",
            color: "var(--primary)",
            fontWeight: 800,
            fontSize: "1.21rem",
            textAlign: "center",
            background: "var(--surface-contrast)",
            borderRadius: 17,
            maxWidth: 330,
            padding: "17px 8px",
            boxShadow: "0 2px 13px var(--primary)22"
          }}>
            <span role="img" aria-label="sparkle">✨</span> Start your first goal!
          </div>
        )}
      </div>
      {/* Animations */}
      <style>
        {`
          @keyframes add-pop {
            0% { transform: scale(0.35); opacity: 0.1;}
            80% { transform: scale(1.1);}
            100% { transform: scale(1);}
          }
          .feature-card.add-anim {
            animation: add-pop 0.68s cubic-bezier(.21,2,.36,1.13) both;
          }
        `}
      </style>
    </div>
  );
}

export default HomeDashboard;
