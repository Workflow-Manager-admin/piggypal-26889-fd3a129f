import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * ParentalDashboard: Interactive chore assignment and completion approval simulation.
 *
 * Lets a parent:
 *   - Assign a custom chore (eg. "Clean room")
 *   - Set a coin reward
 *   - Simulate "Approve" (or "Deny") after child marks chore as done
 *   - Includes kid-friendly, fun animations/feedback on approval
 *
 * (No persistence -- pure UI demo/minigame)
 */
function ParentalDashboard() {
  // Form state
  const [chore, setChore] = useState("");
  const [coins, setCoins] = useState("");
  const [assignDone, setAssignDone] = useState(false); // after assigning
  const [choreDone, setChoreDone] = useState(false); // child completed
  const [approval, setApproval] = useState(null); // null=not acted, 'approved', 'denied'
  const [resetting, setResetting] = useState(false);

  // Handle form input changes
  const handleChoreChange = (e) => {
    setChore(e.target.value);
    setAssignDone(false);
    setChoreDone(false);
    setApproval(null);
  };

  const handleCoinsChange = (e) => {
    // Allow only numbers, max 2 digits (0-99)
    let val = e.target.value.replace(/[^0-9]/g, "");
    if (val.length > 2) val = val.slice(0, 2);
    setCoins(val);
    setAssignDone(false);
    setChoreDone(false);
    setApproval(null);
  };

  // Assign a new chore (simulate send to child)
  const handleAssign = (e) => {
    e.preventDefault();
    if (!chore.trim() || !coins.trim() || isNaN(parseInt(coins)) || parseInt(coins) <= 0) {
      setAssignDone(false);
      return;
    }
    setAssignDone(true);
    setChoreDone(false);
    setApproval(null);
  };

  // Parent: approve/deny upon "child's completion"
  const handleApproval = (status) => {
    setApproval(status); // status: 'approved' | 'denied'
  };

  // "Child" marks the chore as done (for simulation)
  const handleChildDone = () => {
    setChoreDone(true);
    setApproval(null);
  };

  // Reset to assign another
  const handleReset = () => {
    setResetting(true);
    setTimeout(() => {
      setChore("");
      setCoins("");
      setAssignDone(false);
      setChoreDone(false);
      setApproval(null);
      setResetting(false);
    }, 340); // Time for a little playful shake-out animation (optional)
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "54px auto",
        background: "linear-gradient(110deg, var(--accent-2) 68%, var(--accent-purple) 99%)",
        borderRadius: 36,
        boxShadow: "0 2px 18px 0 var(--accent-2)1a",
        padding: "38px 18px 34px 18px",
        textAlign: "center",
        border: "3.5px solid var(--accent-2)",
        minHeight: 440,
        transition: resetting ? "transform 0.3s" : undefined,
        transform: resetting ? "scale(0.92) rotate(-7deg)" : "none",
        opacity: resetting ? 0.7 : 1
      }}
    >
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>👨‍👩‍👧</div>
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
          textShadow: "0 2px 7px var(--background)"
        }}
      >
        Parental Dashboard
      </h2>

      {/* If no chore assigned yet, show assignment form */}
      {!assignDone ? (
        <form
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            alignItems: "center"
          }}
          onSubmit={handleAssign}
          autoComplete="off"
        >
          <div style={{ width: "100%" }}>
            <label
              htmlFor="chore-desc"
              style={{
                display: "block",
                fontWeight: 600,
                color: "var(--text-dark)",
                fontSize: "1.07rem",
                marginBottom: 6,
                textAlign: "left"
              }}
            >
              Assign a Chore
            </label>
            <input
              id="chore-desc"
              value={chore}
              onChange={handleChoreChange}
              maxLength={34}
              autoFocus
              type="text"
              placeholder="Eg, Clean your room"
              style={{
                width: "100%",
                border: "2px solid #FFD600",
                borderRadius: 8,
                fontSize: "1.12rem",
                padding: "8px 11px",
                outline: "none",
                fontWeight: 500,
                background: "#1A1A1A",
                color: undefined
              }}
              required
            />
          </div>
          <div style={{ width: "100%" }}>
            <label
              htmlFor="coin-reward"
              style={{
                display: "block",
                fontWeight: 600,
                color: "var(--text-dark)",
                fontSize: "1.07rem",
                marginBottom: 6,
                textAlign: "left"
              }}
            >
              Coin Reward
            </label>
            <input
              id="coin-reward"
              value={coins}
              onChange={handleCoinsChange}
              inputMode="numeric"
              type="text"
              placeholder="Eg, 2"
              style={{
                width: "100%",
                border: "2px solid #FF6F61",
                borderRadius: 8,
                fontSize: "1.12rem",
                padding: "8px 11px",
                outline: "none",
                fontWeight: 500,
              }}
              required
            />
          </div>
          <button
            className="btn btn-large"
            type="submit"
            style={{
              background:
                chore.trim() && coins.trim() && parseInt(coins) > 0
                  ? "linear-gradient(90deg,#20CFCF 60%,#FF6F61 90%)"
                  : "#b5babd",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.12rem",
              letterSpacing: 0.75,
              border: "none",
              borderRadius: 10,
              marginTop: 8,
              opacity:
                chore.trim() && coins.trim() && parseInt(coins) > 0
                  ? 1
                  : 0.7,
              cursor:
                chore.trim() && coins.trim() && parseInt(coins) > 0
                  ? "pointer"
                  : "not-allowed",
              boxShadow: "0 2px 8px 0 #20CFCF19",
            }}
            disabled={
              !chore.trim() ||
              !coins.trim() ||
              isNaN(parseInt(coins)) ||
              parseInt(coins) <= 0
            }
            aria-label="Assign Chore"
          >
            Assign Chore
          </button>
        </form>
      ) : (
        // Chore has been assigned - simulate a child view and parent approval
        <div
          style={{
            marginTop: 26,
            transition: "opacity 0.18s, filter 0.22s",
            opacity: resetting ? 0.1 : 1,
          }}
        >
          <div style={{ fontWeight: 700, color: "#FF6F61", fontSize: "1.19rem", marginBottom: 5 }}>
            Chore Assigned!
          </div>
          {/* Chore summary card */}
          <div
            style={{
              background: "var(--surface)",
              borderRadius: 16,
              padding: "16px 8px",
              margin: "0 auto 18px auto",
              color: "var(--text-dark)",
              boxShadow: "0 2px 12px 0 #FFD60017",
              maxWidth: 300,
              animation: "chore-pop 0.42s cubic-bezier(.3,1.6,.22,1.04) both"
            }}
          >
            <span style={{ color: "#A259F7", fontSize: "0.97rem", fontWeight: 600, letterSpacing: 0.7 }}>
              📝 Chore:{" "}
            </span>
            <span style={{ fontWeight: 700, color: "#FF6F61" }}>{chore}</span>
            <br />
            <span style={{ color: "#FFD600", fontSize: "1.11em", fontWeight: 600, letterSpacing: 0.6 }}>
              🪙 Reward:{" "}
            </span>
            <span style={{ color: "#20CFCF", fontWeight: 700, fontSize: "1.15em" }}>
              {parseInt(coins)} coin{parseInt(coins) > 1 ? "s" : ""}
            </span>
          </div>

          {/* Simulate if the child has completed or not */}
          {!choreDone ? (
            <button
              className="btn btn-large"
              style={{
                marginTop: 3,
                background: "linear-gradient(80deg,#FFD600 65%,#A259F7 100%)",
                color: "#FF6F61",
                fontWeight: 800,
                fontSize: "1.07rem",
                border: "none",
                borderRadius: 10,
                letterSpacing: 0.7,
                padding: "12px 16px"
              }}
              onClick={handleChildDone}
              aria-label="Child: Mark Chore Done"
            >
              Mark as Done (Child)
            </button>
          ) : (
            <div>
              {/* Parent approval step */}
              {!approval ? (
                <div>
                  <div style={{ fontWeight: 600, color: "#A259F7", margin: "17px 0 11px 0" }}>
                    Review: Child marked chore as <span style={{ fontWeight: 900, color: "#20CFCF" }}>Done</span>!
                  </div>
                  <button
                    className="btn btn-large"
                    style={{
                      background: "linear-gradient(98deg,#20CFCF 62%,#FFD600 94%)",
                      color: "#fff",
                      fontWeight: 700,
                      marginRight: 9,
                      fontSize: "1.10rem",
                      border: "none",
                      borderRadius: 10,
                      padding: "10px 20px"
                    }}
                    onClick={() => handleApproval("approved")}
                    aria-label="Approve Chore"
                  >
                    <span role="img" aria-label="approve" style={{ marginRight: 4 }}>✅</span>
                    Approve
                  </button>
                  <button
                    className="btn btn-large"
                    style={{
                      background: "linear-gradient(91deg,#FF6F61 67%,#A259F7 90%)",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1.10rem",
                      marginLeft: 3,
                      border: "none",
                      borderRadius: 10,
                      padding: "10px 20px"
                    }}
                    onClick={() => handleApproval("denied")}
                    aria-label="Deny Chore"
                  >
                    <span role="img" aria-label="deny" style={{ marginRight: 4 }}>🚫</span>
                    Deny
                  </button>
                </div>
              ) : approval === "approved" ? (
                <div
                  style={{
                    marginTop: 22,
                    animation: "approval-pop 0.45s cubic-bezier(.21,2.0,.36,1.13) both",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <div
                    style={{
                      fontSize: 58,
                      marginBottom: 8,
                      filter: "drop-shadow(0 5px 17px #20CFCFaa)"
                    }}
                    aria-label="approval success"
                  >
                    🎉💸
                  </div>
                  <div style={{
                    color: "#20CFCF",
                    fontWeight: 900,
                    fontSize: "1.32rem",
                    marginBottom: 2,
                  }}>
                    Chore Approved!
                  </div>
                  <div style={{
                    color: "var(--text-dark)",
                    background: "var(--surface)",
                    padding: "9px 18px",
                    borderRadius: 11,
                    marginBottom: 13,
                    fontSize: "1.09rem",
                    boxShadow: "0 4px 22px 0 rgba(32,207,207,0.11)"
                  }}>
                    {parseInt(coins)} coin{parseInt(coins) > 1 ? "s" : ""} sent to your child’s piggy bank 🐷
                  </div>
                  <button
                    className="btn"
                    style={{
                      background: "linear-gradient(91deg,#FFD600 54%,#20CFCF 90%)",
                      color: "#fff",
                      fontWeight: 800,
                      marginTop: 2,
                      fontSize: "1.02rem",
                      border: "none",
                      borderRadius: 10,
                      padding: "7px 18px"
                    }}
                    onClick={handleReset}
                  >
                    Assign Another Chore
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    marginTop: 22,
                    animation: "approval-pop 0.45s cubic-bezier(.21,2.0,.36,1.13) both",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <div
                    style={{
                      fontSize: 48,
                      marginBottom: 8,
                      filter: "drop-shadow(0 4px 11px #FF6F61aa)"
                    }}
                    aria-label="approval denied"
                  >
                    😞🚫
                  </div>
                  <div style={{
                    color: "#FF6F61",
                    fontWeight: 800,
                    fontSize: "1.24rem",
                    marginBottom: 2,
                  }}>
                    Chore Denied
                  </div>
                  <div style={{
                    color: "var(--text-dark)",
                    background: "var(--surface)",
                    padding: "9px 18px",
                    borderRadius: 11,
                    marginBottom: 11,
                    fontSize: "1.01rem",
                    boxShadow: "0 2px 12px 0 #FF6F6119"
                  }}>
                    No coins awarded. Remind your child to complete it properly!
                  </div>
                  <button
                    className="btn"
                    style={{
                      background: "linear-gradient(91deg,#20CFCF 54%,#FFD600 90%)",
                      color: "#fff",
                      fontWeight: 800,
                      marginTop: 2,
                      fontSize: "1.02rem",
                      border: "none",
                      borderRadius: 10,
                      padding: "7px 18px"
                    }}
                    onClick={handleReset}
                  >
                    Assign Another Chore
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Animations - keyframes */}
      <style>
        {`
        @keyframes chore-pop {
          0% { transform: scale(0.81); opacity: 0.1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes approval-pop {
          0% { transform: scale(0.4); opacity: 0; }
          74% { transform: scale(1.18); opacity: 1; }
          88% { transform: scale(0.89);}
          100% { transform: scale(1);}
        }
        `}
      </style>
      {/* Helper text for playful onboarding */}
      {!assignDone && (
        <div
          style={{
            marginTop: 18,
            color: "#20CFCF",
            fontWeight: 400,
            fontSize: "1.06rem"
          }}
        >
          Assign your child a fun chore and set a coin reward.<br />Simulate “mark done” and try approving or denying!
        </div>
      )}
      {!assignDone && (chore.trim() || coins.trim()) &&
        (!chore.trim() || !coins.trim() || isNaN(parseInt(coins)) || parseInt(coins) <= 0) && (
          <div style={{ color: "#A259F7", fontWeight: 500, fontSize: "1.01rem", marginTop: 12 }}>
            Please enter a chore and a reward (min 1 coin).
          </div>
      )}
    </div>
  );
}

export default ParentalDashboard;
