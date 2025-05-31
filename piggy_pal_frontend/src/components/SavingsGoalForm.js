import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Interactive form for entering a savings goal (name, amount) with playful branding.
 * Shows a confirmation message upon "saving" (local state only, no persistence).
 */
function SavingsGoalForm() {
  // State for form
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [saved, setSaved] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Handler for input changes
  const handleNameChange = (e) => {
    setGoalName(e.target.value);
    setSaved(false);
    setShowDetails(false);
  };

  const handleAmountChange = (e) => {
    // Allow only numbers and decimals (restrict input)
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setGoalAmount(val);
    setSaved(false);
    setShowDetails(false);
  };

  // Save the goal (only updates local state)
  const handleSave = (e) => {
    e.preventDefault();
    // Optionally basic validation
    if (!goalName.trim() || !goalAmount.trim() || isNaN(parseFloat(goalAmount))) {
      setSaved(false);
      setShowDetails(false);
      return;
    }
    setSaved(true);
    setShowDetails(true);
  };

  // Reset form for new goal
  const handleNewGoal = () => {
    setGoalName("");
    setGoalAmount("");
    setSaved(false);
    setShowDetails(false);
  };

  // Core playful card container re-uses the existing card style
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "54px auto",
        background: "linear-gradient(120deg, var(--accent-2) 74%, var(--primary) 94%)",
        borderRadius: 36,
        boxShadow: "0 2px 18px 0 var(--primary)18",
        padding: "38px 18px 34px 18px",
        textAlign: "center",
        border: "3.5px solid var(--primary)",
      }}
    >
      <div style={{ fontSize: "3.2rem", marginBottom: 8, color: "var(--secondary)", textShadow: "0 1.5px 7px var(--background)" }}>🎯</div>
      <h2
        style={{
          color: "var(--text-dark)",
          fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
          fontWeight: 700,
          background: "unset",
          WebkitBackgroundClip: "unset",
          WebkitTextFillColor: "unset",
          fontSize: "2.2rem",
          margin: 0,
          letterSpacing: 1.5,
          textShadow: "0 2px 8px var(--background)80"
        }}
      >
        Savings Goal
      </h2>
      {/* Feedback or form content */}
      {saved && showDetails ? (
        <div style={{ marginTop: 28, color: "var(--text-dark)", fontWeight: 800, fontSize: "1.7rem", textShadow: "0 2px 9px var(--background)60" }}>
          Goal Saved! 🎉
          <div
            style={{
              margin: "24px auto 14px auto",
              padding: "16px 10px",
              borderRadius: 17,
              background: "var(--background)",
              color: "var(--text-dark)",
              fontWeight: 500,
              fontSize: "1.12rem",
              boxShadow: "0 2px 9px var(--secondary)32"
            }}
          >
            <span style={{ fontWeight: 700, color: "var(--secondary)" }}>
              {goalName}
            </span>
            <span
              style={{
                margin: "0 7px",
                color: "var(--primary)",
                fontWeight: 700,
                fontSize: "1.05em"
              }}
            >
              – ${parseFloat(goalAmount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <button
            className="btn btn-large"
            style={{
              marginTop: 12,
              background: "var(--secondary)",
              color: "var(--text-dark)",
            }}
            onClick={handleNewGoal}
            type="button"
            aria-label="Add Another Goal"
          >
            Add Another Goal
          </button>
        </div>
      ) : (
        <form
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            alignItems: "center",
          }}
          onSubmit={handleSave}
          autoComplete="off"
        >
          <div style={{ width: "100%" }}>
            <label
              htmlFor="goal-name"
              style={{
                display: "block",
                fontWeight: 600,
                color: "var(--text-dark)",
                fontSize: "1.07rem",
                marginBottom: 7,
                textAlign: "left",
              }}
            >
              Goal Name
            </label>
            <input
              id="goal-name"
              value={goalName}
              onChange={handleNameChange}
              maxLength={28}
              type="text"
              placeholder="Eg, New Skateboard"
              style={{
                width: "100%",
                border: "2px solid var(--secondary)",
                borderRadius: 9,
                fontSize: "1.12rem",
                padding: "8px 11px",
                outline: "none",
                fontWeight: 500,
                background: "var(--surface)",
                color: "var(--text-dark)"
              }}
              required
              autoFocus
            />
          </div>
          <div style={{ width: "100%" }}>
            <label
              htmlFor="goal-amount"
              style={{
                display: "block",
                fontWeight: 600,
                color: "var(--text-dark)",
                fontSize: "1.07rem",
                marginBottom: 7,
                textAlign: "left",
              }}
            >
              Goal Amount ($)
            </label>
            <input
              id="goal-amount"
              value={goalAmount}
              inputMode="decimal"
              pattern="^[0-9]*[.]?[0-9]{0,2}$"
              onChange={handleAmountChange}
              type="text"
              placeholder="Eg, 50.00"
              style={{
                width: "100%",
                border: "2px solid var(--primary)",
                borderRadius: 9,
                fontSize: "1.12rem",
                padding: "8px 11px",
                outline: "none",
                fontWeight: 500,
                background: "var(--surface)",
                color: "var(--text-dark)"
              }}
              required
            />
          </div>
          <button
            className="btn btn-large"
            style={{
              marginTop: 7,
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: 0.7,
              background:
                goalName.trim() && goalAmount.trim() && !isNaN(parseFloat(goalAmount))
                  ? "linear-gradient(90deg,var(--accent-2) 53%,var(--primary) 98%)"
                  : "#b5babd",
              color: "var(--text-dark)",
              border: "none",
              padding: "10px 24px",
              borderRadius: 9,
              cursor:
                goalName.trim() && goalAmount.trim() && !isNaN(parseFloat(goalAmount))
                  ? "pointer"
                  : "not-allowed",
              opacity:
                goalName.trim() && goalAmount.trim() && !isNaN(parseFloat(goalAmount))
                  ? 1
                  : 0.75,
              boxShadow: "0 2px 8px 0 var(--accent-2)1a",
              transition: "background 0.22s, opacity 0.15s",
            }}
            type="submit"
            aria-label="Save Goal"
            disabled={
              !goalName.trim() ||
              !goalAmount.trim() ||
              isNaN(parseFloat(goalAmount))
            }
          >
            Save Goal
          </button>
        </form>
      )}
      {/* Helper text */}
      {!saved && (
        <div
          style={{
            marginTop: 19,
            color: "var(--text-dark)",
            fontWeight: 400,
            fontSize: "1.10rem",
            textShadow: "0 1.5px 3px var(--background)"
          }}
        >
          Set a new savings goal to start saving smarter!
        </div>
      )}
      {/* Minimal error message */}
      {!saved && (goalName.trim() || goalAmount.trim()) &&
        (!goalName.trim() || !goalAmount.trim() || isNaN(parseFloat(goalAmount))) && (
        <div style={{ color: "var(--secondary)", fontWeight: 700, fontSize: "1.01rem", marginTop: 12, textShadow: "0 1.5px 2.5px var(--background)" }}>
          Please enter a goal name and a valid amount.
        </div>
      )}
    </div>
  );
}

export default SavingsGoalForm;
