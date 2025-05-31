import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * PiggyPal SecuritySharing: Demo PIN unlock and Invite Link Generator
 * 
 * Interactive playful demo where user can:
 *  - Enter a PIN (1234) to "unlock" a feature with fun feedback/animation.
 *  - Click to "generate" a sharing invite code (random string as mock QR link).
 * Uses PiggyPal branding, color, and fun feedback.
 */
function SecuritySharing() {
  // PIN state and feedback
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState("");
  const [pinSuccessAnim, setPinSuccessAnim] = useState(false);

  // Invite link state and feedback
  const [invite, setInvite] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [codeAnim, setCodeAnim] = useState(false);

  // Handle PIN input change and lock logic
  const handlePinChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, ""); // restrict to numbers
    setPin(val.slice(0, 4));
    setPinError("");
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pin === "1234") {
      setUnlocked(true);
      setPinError("");
      setPinSuccessAnim(true);
      setTimeout(() => setPinSuccessAnim(false), 870);
    } else {
      setPinError("Oops, try 1234 to unlock! 🐖🔒");
      setPin("");
    }
  };

  // Handle invite code generation
  const handleGenerateInvite = () => {
    // Mock random string as invite link
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 8; ++i) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setInvite(`https://piggy.pal/invite/${code}`);
    setShowInvite(true);
    setCodeAnim(true);
    setTimeout(() => setCodeAnim(false), 1000);
  };

  // Reset
  const handleReset = () => {
    setPin("");
    setUnlocked(false);
    setPinError("");
    setPinSuccessAnim(false);
    setInvite("");
    setShowInvite(false);
    setCodeAnim(false);
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '54px auto',
      background: 'linear-gradient(120deg, #20CFCF 68%, #A259F7 105%)',
      borderRadius: 36,
      boxShadow: "0 2px 18px 0 rgba(32,207,207,0.08)",
      padding: '38px 18px 34px 18px',
      textAlign: 'center',
      border: '3.5px solid #A259F7',
      minHeight: 440,
      position: "relative"
    }}>
      <div style={{ fontSize: "3.2rem", marginBottom: 8 }}>
        {unlocked ? "🔓" : "🔒"}
      </div>
      <h2 style={{
        color: "#20CFCF",
        fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
        fontWeight: 700,
        background: "linear-gradient(60deg,#A259F7,#20CFCF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "2.2rem",
        margin: 0,
        letterSpacing: 1.5
      }}>
        Security & Sharing
      </h2>
      {/* PIN unlock area */}
      {!unlocked ? (
        <form
          autoComplete="off"
          onSubmit={handleUnlock}
          style={{
            margin: "32px auto 0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 13,
            padding: "0 2px"
          }}
        >
          <label htmlFor="pin-entry" style={{
            fontWeight: 700,
            color: "#20CFCF",
            fontFamily: "inherit",
            fontSize: "1.08rem",
            letterSpacing: 0.7
          }}>
            Enter PIN to Unlock
          </label>
          <input
            id="pin-entry"
            value={pin}
            onChange={handlePinChange}
            type="password"
            minLength={4}
            maxLength={4}
            inputMode="numeric"
            pattern="^[0-9]{4}$"
            autoFocus
            style={{
              width: "110px",
              fontSize: "1.3rem",
              textAlign: "center",
              fontWeight: 700,
              letterSpacing: 8,
              border: "2.5px solid #A259F7",
              borderRadius: 11,
              padding: "8px 8px",
              outline: "none",
              background: "#fff",
              color: "#20CFCF",
              boxShadow: "0 2px 7px 0 #A259F72c",
              marginBottom: 6
            }}
            aria-label="Enter 4-digit PIN"
            disabled={unlocked}
          />
          <button
            className="btn btn-large"
            type="submit"
            style={{
              background: "linear-gradient(90deg,#A259F7 45%,#20CFCF 110%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.09rem",
              border: "none",
              borderRadius: 10,
              letterSpacing: 0.8,
              boxShadow: "0 2px 6px 0 #20CFCF22",
              marginTop: 2,
              minWidth: 110,
              opacity: pin.length === 4 ? 1 : 0.7,
              cursor: pin.length === 4 ? "pointer" : "not-allowed",
              transition: "background 0.16s"
            }}
            disabled={pin.length !== 4}
            aria-label="Unlock with PIN"
          >
            Unlock
          </button>
          {pinError && (
            <div style={{
              color: "#FF6F61",
              fontWeight: 700,
              fontSize: "1.02rem",
              marginTop: 3,
              minHeight: 18
            }}>
              {pinError}
            </div>
          )}
        </form>
      ) : (
        <div style={{
          margin: "35px 0 0 0",
          animation: pinSuccessAnim ? "unlock-pop 0.87s cubic-bezier(.29,1.8,.29,1.05) both" : "none"
        }}>
          <div style={{
            fontSize: 40,
            marginBottom: 5,
            color: "#FFD600",
            textShadow: "0 2px 12px #FFD60099"
          }}>
            🎉
          </div>
          <div style={{
            fontWeight: 800,
            color: "#20CFCF",
            fontSize: "1.23rem",
            background: "#fffefb",
            borderRadius: 12,
            margin: "0 auto 8px auto",
            display: "inline-block",
            boxShadow: "0 1px 11px #FFD60044",
            padding: "15px 27px"
          }}>
            Feature Unlocked!
          </div>
          <div style={{
            color: "#A259F7",
            fontWeight: 700,
            fontSize: "1.1rem",
            margin: "0 0 7px 0"
          }}>
            Welcome to PiggyPal<br />Safe & Fun Sharing! 🐷🔓
          </div>
          <button
            className="btn"
            style={{
              marginTop: 8,
              background: "linear-gradient(92deg,#FFD600 62%,#20CFCF 94%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.06rem",
              border: "none",
              borderRadius: 10,
              padding: "9px 22px"
            }}
            onClick={handleReset}
            type="button"
          >
            Lock Again
          </button>
        </div>
      )}

      {/* Mock Invite/QR Code area */}
      <div style={{
        margin: unlocked ? "38px 0 0 0" : "36px 0 0 0",
        borderTop: '2.2px dashed #FFD600',
        paddingTop: 27
      }}>
        <div style={{
          color: "#A259F7",
          fontWeight: 600,
          fontSize: "1.15rem",
          marginBottom: 12,
          letterSpacing: 0.6
        }}>
          Want to share with family or friends?
        </div>
        <button
          className="btn btn-large"
          style={{
            background: "linear-gradient(90deg,#FFD600 48%,#A259F7 110%)",
            color: "#222",
            fontWeight: 800,
            fontSize: "1.10rem",
            border: "none",
            borderRadius: 10,
            boxShadow: "0 2px 7px 0 #FFD60014",
            margin: "3px 0 0 0",
            padding: "13px 25px",
            letterSpacing: 0.8
          }}
          onClick={handleGenerateInvite}
          type="button"
          aria-label="Generate invite link"
          tabIndex={0}
        >
          Generate Invite Link&nbsp; <span aria-label="link" role="img">🔗</span>
        </button>
        {showInvite && (
          <div style={{
            marginTop: 17,
            background: "#fffdf7",
            color: "#A259F7",
            padding: "16px 8px 13px 8px",
            borderRadius: 12,
            boxShadow: "0 3px 15px 0 #FFD6001b, 0 1.5px 6px #A259F74a",
            animation: codeAnim ? "invite-pop 1s cubic-bezier(.27,1.0,.48,0.88) both" : "none"
          }}>
            <div style={{ fontWeight: 600, color: "#20CFCF", fontSize: "1.07rem", letterSpacing: 0.7, marginBottom: 1 }}>
              Your Invite Link
            </div>
            <div style={{
              fontWeight: 800,
              fontFamily: "'Fredoka One','Comic Sans MS',sans-serif",
              fontSize: "1.18rem",
              color: "#A259F7",
              margin: "7px 0 10px 0",
              wordBreak: "break-all"
            }}>
              {invite}
            </div>
            <div>
              <span role="img" aria-label="qr">📸</span> Show this to a friend!
            </div>
            <button
              className="btn"
              style={{
                background: "linear-gradient(91deg,#A259F7 46%,#20CFCF 99%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.01rem",
                border: "none",
                borderRadius: 8,
                padding: "7px 16px",
                marginTop: 9
              }}
              onClick={() => setShowInvite(false)}
              type="button"
            >
              Hide Invite
            </button>
          </div>
        )}
      </div>
      {/* Animation styles */}
      <style>
        {`
        @keyframes unlock-pop {
          0% { transform: scale(0.53); opacity: 0; }
          74% { transform: scale(1.18); opacity: 1; }
          94% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        @keyframes invite-pop {
          0% { transform:scale(0.75); opacity: 0.1;}
          71% { transform:scale(1.12); opacity: 1;}
          90% { transform:scale(0.94);}
          100% { transform:scale(1);}
        }
        `}
      </style>
      {/* Helper text */}
      <div style={{
        marginTop: 22,
        color: "#20CFCF",
        fontWeight: 400,
        fontSize: "1.08rem"
      }}>
        This is a demo! In the real PiggyPal, your PIN would keep your money safe and invite links would let trusted people add to your goal!<br />Try unlocking and sharing now.
      </div>
    </div>
  );
}

export default SecuritySharing;
