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
        background: "linear-gradient(120deg, #FF6F61 74%, #20CFCF 94%)",
        borderRadius: 36,
        boxShadow: "0 2px 18px 0 rgba(32,207,207,0.10)",
        padding: "38px 18px 34px 18px",
        textAlign: "center",
        border: "3.5px solid #20CFCF",
      }}
    >
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>🎯</div>
      <h2
        style={{
          color: "#FF6F61",
          fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
          fontWeight: 700,
          background: "linear-gradient(70deg,#FF6F61 60%,#20CFCF 115%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "2.2rem",
          margin: 0,
          letterSpacing: 1.5,
        }}
      >
        Savings Goal
      </h2>
      {/* Feedback or form content */}
      {saved && showDetails ? (
        <div style={{ marginTop: 28, color: "#20CFCF", fontWeight: 800, fontSize: "1.7rem" }}>
          Goal Saved! 🎉
          <div
            style={{
              margin: "24px auto 14px auto",
              padding: "16px 10px",
              borderRadius: 17,
              background: "#fff8",
              color: "#1A1A1A",
              fontWeight: 500,
              fontSize: "1.12rem",
            }}
          >
            <span style={{ fontWeight: 700, color: "#FF6F61" }}>
              {goalName}
            </span>
            <span
              style={{
                margin: "0 7px",
                color: "#A259F7",
                fontWeight: 700,
                fontSize: "1.05em",
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
              color: "#fff",
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
                color: "#FF6F61",
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
                border: "2px solid #FF6F61",
                borderRadius: 9,
                fontSize: "1.12rem",
                padding: "8px 11px",
                outline: "none",
                fontWeight: 500,
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
                color: "#20CFCF",
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
                border: "2px solid #20CFCF",
                borderRadius: 9,
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
            style={{
              marginTop: 7,
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: 0.7,
              background:
                goalName.trim() && goalAmount.trim() && !isNaN(parseFloat(goalAmount))
                  ? "linear-gradient(90deg,#FF6F61 53%,#20CFCF 98%)"
                  : "#b5babd",
              color: "#fff",
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
              boxShadow: "0 2px 8px 0 rgba(255, 111, 97, 0.10)",
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
            color: "#333",
            fontWeight: 400,
            fontSize: "1.10rem",
          }}
        >
          Set a new savings goal to start saving smarter!
        </div>
      )}
      {/* Minimal error message */}
      {!saved && (goalName.trim() || goalAmount.trim()) &&
        (!goalName.trim() || !goalAmount.trim() || isNaN(parseFloat(goalAmount))) && (
        <div style={{ color: "#A259F7", fontWeight: 500, fontSize: "1.01rem", marginTop: 12 }}>
          Please enter a goal name and a valid amount.
        </div>
      )}
    </div>
  );
}

export default SavingsGoalForm;
