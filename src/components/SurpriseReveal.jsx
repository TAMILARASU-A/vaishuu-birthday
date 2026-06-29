import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function SurpriseReveal({ onReveal }) {
  const [clicked, setClicked] = useState(false);
  const [passcodeMode, setPasscodeMode] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [errorMessage, setErrorMessage] = useState("");
  const [passcodeSuccess, setPasscodeSuccess] = useState(false);
  const [floatingItems] = useState(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji: ["🎀", "🌸", "✨", "🎂", "💖", "🎊", "🌷", "🦋", "⭐"][i % 9],
      left: Math.random() * 90 + "%",
      delay: Math.random() * 4 + "s",
      duration: (Math.random() * 4 + 5) + "s",
      size: Math.random() * 18 + 14 + "px",
    }))
  );

  const handleReveal = () => {
    if (passcodeSuccess) return;
    setClicked(true);
    setPasscodeMode(true);
    confetti({ particleCount: 180, spread: 100, origin: { y: 0.6 }, colors: ["#FF6B9D", "#FFD700", "#C77DFF", "#FFB3CC", "#fff"] });
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 }, colors: ["#FF6B9D", "#FFD700", "#C77DFF"] }), 300);
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 }, colors: ["#FF6B9D", "#FFD700", "#C77DFF"] }), 300);
  };

  const handlePasscodeSubmit = () => {
    if (passcodeSuccess) return;
    const normalized = passcodeInput.trim().toLowerCase();
    if (normalized === "thango" || normalized === "thangoo") {
      setPasscodeSuccess(true);
      setErrorMessage("Correct! Opening your surprise... 🎉");
      setTimeout(onReveal, 1200);
      return;
    }

    const remaining = attemptsLeft - 1;
    setAttemptsLeft(remaining);

    if (remaining <= 0) {
      setErrorMessage("Nope! The clue is below — try again with the nickname.");
    } else {
      setErrorMessage(`Nope! Try another name. ${remaining} ${remaining === 1 ? "try" : "tries"} left.`);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", position: "relative",
      background: "linear-gradient(135deg, #fff0f6 0%, #ffe8f5 50%, #f3e0ff 100%)",
      overflow: "hidden"
    }}>
      {/* Floating emojis */}
      {floatingItems.map(item => (
        <span key={item.id} style={{
          position: "absolute", left: item.left, fontSize: item.size,
          animation: `floatUp ${item.duration} ${item.delay} infinite ease-in-out`,
          opacity: 0.7, pointerEvents: "none", bottom: "-30px",
        }}>{item.emoji}</span>
      ))}

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { opacity: 1; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,107,157,0.4); }
          50% { transform: scale(1.06); box-shadow: 0 0 0 20px rgba(255,107,157,0); }
        }
        @keyframes giftBounce {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ textAlign: "center", zIndex: 10, padding: "2rem", animation: "fadeSlideIn 1s ease" }}>
        <div style={{ fontSize: "7rem", animation: "giftBounce 2s ease-in-out infinite", display: "block", marginBottom: "1.5rem" }}>🎁</div>

        <h1 style={{
          fontFamily: "'Dancing Script', cursive", fontSize: "clamp(2rem, 6vw, 3.5rem)",
          color: "#E8447A", marginBottom: "0.75rem", lineHeight: 1.2
        }}>Someone's waiting for you…</h1>

        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.1rem", color: "#9b59b6", marginBottom: "2.5rem", fontWeight: 600 }}>
          A special surprise is hidden inside 🌸
        </p>

        {!passcodeMode ? (
          <button
            onClick={handleReveal}
            style={{
              background: "linear-gradient(135deg, #FF6B9D, #E8447A)",
              color: "white", border: "none", borderRadius: "50px",
              padding: "1rem 3rem", fontSize: "1.2rem", fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Nunito', sans-serif",
              animation: "pulse 2s infinite",
              transition: "all 0.3s ease",
              letterSpacing: "1px",
            }}
          >
            ✨ Open Your Surprise!
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1rem", color: "#5a2f71", margin: 0, fontWeight: 600 }}>
              Enter my cute nick name to unlock the surprise.
            </p>
            <input
              value={passcodeInput}
              onChange={(e) => {
                setPasscodeInput(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="Type your nickname"
              style={{
                width: "100%", maxWidth: "320px",
                padding: "0.95rem 1rem", borderRadius: "999px",
                border: "2px solid #f3c1e4", outline: "none",
                fontSize: "1rem", fontFamily: "'Nunito', sans-serif",
                textAlign: "center"
              }}
            />
            <button
              onClick={handlePasscodeSubmit}
              disabled={passcodeSuccess}
              style={{
                background: passcodeSuccess ? "#ddd" : "linear-gradient(135deg, #FF6B9D, #E8447A)",
                color: "white", border: "none", borderRadius: "50px",
                padding: "0.95rem 2rem", fontSize: "1rem", fontWeight: 700,
                cursor: passcodeSuccess ? "default" : "pointer",
                fontFamily: "'Nunito', sans-serif",
                transition: "all 0.3s ease",
                letterSpacing: "1px",
              }}
            >
              {passcodeSuccess ? "🎉 Access granted" : "Submit nickname"}
            </button>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.95rem", color: "#70286a", minHeight: "1.2rem", margin: 0 }}>
              {errorMessage}
            </p>
            {attemptsLeft <= 0 && !passcodeSuccess && (
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.95rem", color: "#a34343", margin: 0 }}>
                Clue: Thango nu sonnatha open aaven 😂
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
