import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const photos = [
  { src: "/photos/profile.jpeg", label: "Our memories 💖", main: true },
  { src: "/photos/surprise.jpg", label: "Surprise moment 🌸" },
  { src: "/photos/WhatsApp%20Image%202026-06-29%20at%2011.57.10%20PM.jpeg", label: "Sweet memories 😊" },
  { src: "/photos/WhatsApp%20Image%202026-06-29%20at%2011.59.47%20PM%20(1).jpeg", label: "Forever friends ✨" },
];

const quizQuestions = [
  {
    question: "Which emoji would crash Vaishuu's birthday party if it could?",
    options: ["🎂", "🦄", "🍭", "🕺"],
    correct: 0,
  },
  {
    question: "Why does the card say Vaishuu is the real party snack?",
    options: ["Because she sparkles", "Because she steals the cake", "Because everyone smiles around her", "Because balloons bow to her"],
    correct: 2,
  },
  {
    question: "What joke should the gift box tell when opened?",
    options: ["Why did the cake blush?", "Because the candles were lit!", "Because the balloons popped in style", "Because the cake said 'let's party!'"],
    correct: 1,
  },
];

const messages = [
  { emoji: "🎂", text: "Happiest Birthday di Vaishnavii ❤️" },
  { emoji: "🌸", text: "May your day be as beautiful and radiant as your smile!" },
  { emoji: "✨", text: "Wishing you a life full of laughter, love, and endless happiness 🌟" },
  { emoji: "💖", text: "You deserve every single good thing this world has to offer, Vaishuu!" },
  { emoji: "🎀", text: "Be happy forever, stay blessed forever, and shine like the star you are! 🌠" },
  { emoji: "🦋", text: "So grateful to have you in my life. Here's to many more adventures together! 🥂" },
];

const balloonData = [
  { id: 1, left: "12%", delay: "0s" },
  { id: 2, left: "28%", delay: "0.3s" },
  { id: 3, left: "45%", delay: "0.6s" },
  { id: 4, left: "62%", delay: "0.2s" },
  { id: 5, left: "78%", delay: "0.5s" },
];

export default function BirthdayCard() {
  const [visible, setVisible] = useState([]);
  const [cakeClicks, setCakeClicks] = useState(0);
  const [poppedBalloons, setPoppedBalloons] = useState([]);
  const [theme, setTheme] = useState("pink");
  const sectionRefs = useRef([]);
  const audioRef = useRef(null);

  const poppedCount = poppedBalloons.length;
  const themeStyles = theme === "gold" ? {
    bg: "linear-gradient(180deg, #fff8eb 0%, #fff2d0 50%, #fff8eb 100%)",
    heroGradient: "linear-gradient(135deg, #FFD700, #F7D06C, #FFC23B, #FFD700)",
    heroText: "#B36B00",
    heroSubtitle: "#A56F18",
    heroCardBg: "linear-gradient(135deg, #FFD700, #F7D06C, #FFC23B, #FFD700)",
    heroCardShadow: "0 18px 40px rgba(255, 192, 0, 0.2)",
    sectionBg: "rgba(255,250,235,0.85)",
    cardShadow: "0 4px 20px rgba(255,190,77,0.2)",
    footerBg: "linear-gradient(135deg, #FFE59C22, #FFD70022, #FFD6A222)",
    toggleBg: "#FFB700",
    toggleText: "#3b1f00",
    buttonShadow: "0 10px 25px rgba(255,193,7,0.2)",
    accent: "#FFD700"
  } : {
    bg: "linear-gradient(180deg, #fff0f6 0%, #f8e8ff 50%, #fff0f6 100%)",
    heroGradient: "linear-gradient(135deg, #FF6B9D, #FFD700, #C77DFF, #FF6B9D)",
    heroText: "#E8447A",
    heroSubtitle: "#C77DFF",
    heroCardBg: "linear-gradient(135deg, #FF6B9D, #FFD700, #C77DFF, #FF6B9D)",
    heroCardShadow: "0 18px 40px rgba(255,107,157,0.18)",
    sectionBg: "rgba(255,255,255,0.65)",
    cardShadow: "0 4px 20px rgba(255,107,157,0.15)",
    footerBg: "linear-gradient(135deg, #FF6B9D22, #C77DFF22, #FFD70022)",
    toggleBg: "#FFD700",
    toggleText: "#4d1a60",
    buttonShadow: "0 10px 25px rgba(255,173,51,0.2)",
    accent: "#FF6B9D"
  };
  const messageBorderColors = theme === "gold"
    ? ["#FFD700", "#D8AB3F", "#F7D06C", "#FFD700", "#D8AB3F", "#F7D06C"]
    : ["#FF6B9D", "#C77DFF", "#FFD700", "#FF6B9D", "#C77DFF", "#FFD700"];
  const photoBorderColors = theme === "gold"
    ? ["#FFD700", "#F7D06C", "#FFB73C"]
    : ["#FF6B9D", "#C77DFF", "#FFD700"];
  const [giftOpen, setGiftOpen] = useState(false);
  const [giftRevealed, setGiftRevealed] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleQuizAnswer = (optionIndex) => {
    if (selectedAnswer !== null || quizCompleted) return;
    const isCorrect = optionIndex === quizQuestions[currentQuizIndex].correct;
    if (isCorrect) setQuizScore((score) => score + 1);
    setSelectedAnswer(optionIndex);

    setTimeout(() => {
      if (currentQuizIndex < quizQuestions.length - 1) {
        setCurrentQuizIndex((index) => index + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.8 }, colors: ["#FF6B9D", "#FFD700", "#C77DFF"] });
      }
    }, 900);
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const isPopped = (id) => poppedBalloons.includes(id);
  const popBalloon = (id) => {
    if (isPopped(id)) return;
    setPoppedBalloons((prev) => [...prev, id]);
    confetti({ particleCount: 35, spread: 45, origin: { y: 0.8 }, colors: ["#FF6B9D", "#FFD700", "#C77DFF"] });
  };

  useEffect(() => {
    // Autoplay birthday song
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked by browser - user will need to interact to play
        console.log("Autoplay blocked. Birthday song will play on user interaction.");
      });
    }

    // Confetti on mount
    setTimeout(() => {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ["#FF6B9D", "#FFD700", "#C77DFF", "#FFB3CC"] });
    }, 400);

    // Intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((v) => [...v, entry.target.dataset.id]);
          }
        });
      },
      { threshold: 0.15 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCakeClick = () => {
    const count = cakeClicks + 1;
    setCakeClicks(count);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 }, colors: ["#FF6B9D", "#FFD700", "#C77DFF"] });

    // Additional confetti bursts for more celebration
    if (count === 2) {
      setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.3 }, colors: ["#FF6B9D", "#FFD700", "#C77DFF", "#FFB3CC"] }), 200);
    }
    if (count >= 3) {
      setTimeout(() => confetti({ particleCount: 150, spread: 120, colors: ["#FF6B9D", "#FFD700", "#C77DFF", "#FFB3CC", "#E8447A"] }), 100);
      setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { x: 0.2, y: 0.5 }, colors: ["#FF6B9D", "#FFD700"] }), 300);
      setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { x: 0.8, y: 0.5 }, colors: ["#C77DFF", "#FFB3CC"] }), 500);
    }
  };

  const handleGiftClick = () => {
    if (giftOpen) return;
    setGiftOpen(true);
    setGiftRevealed(true);
    confetti({ particleCount: 80, spread: 120, origin: { y: 0.6 }, colors: ["#FFD700", "#FF6B9D", "#C77DFF"] });
  };

  const isVisible = (id) => visible.includes(String(id));

  return (
    <div className={`theme-${theme}`} style={{ minHeight: "100vh", background: themeStyles.bg, backgroundSize: "200% 200%", backgroundPosition: "0% 50%", animation: "gradientShift 25s ease-in-out infinite", position: "relative", overflow: "hidden" }}>
      {/* Background Birthday Song */}
      <audio
        ref={audioRef}
        src="/audio/the_mountain-happy-birthday-508020.mp3"
        autoPlay
        loop
        style={{ display: "none" }}
      />

      {/* Animated background glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 68%)", top: "10%", left: "5%", filter: "blur(14px)", animation: "bubbleDrift 20s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,157,0.18) 0%, transparent 70%)", top: "40%", right: "-5%", filter: "blur(18px)", animation: "bubbleDrift 24s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(199,125,255,0.18) 0%, transparent 72%)", bottom: "12%", left: "18%", filter: "blur(16px)", animation: "bubbleDrift 22s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,223,102,0.2) 0%, transparent 74%)", bottom: "5%", right: "15%", filter: "blur(12px)", animation: "bubbleDrift 18s ease-in-out infinite reverse" }} />
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes heartbeat { 0%,100% { transform: scale(1); } 14% { transform: scale(1.15); } 28% { transform: scale(1); } 42% { transform: scale(1.1); } 56% { transform: scale(1); } }
        @keyframes ribbonWave { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes sparkle { 0%,100% { opacity: 1; transform: scale(1) rotate(0deg); } 50% { opacity: 0.6; transform: scale(1.3) rotate(180deg); } }
        @keyframes photoFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes borderGlow { 0%,100% { box-shadow: 0 0 20px #FF6B9D44, 0 0 40px #FFD70022; } 50% { box-shadow: 0 0 30px #FF6B9D88, 0 0 60px #FFD70044; } }
        
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes glow { 0%,100% { text-shadow: 0 0 5px #FF6B9D, 0 0 10px #FFD700; } 50% { text-shadow: 0 0 15px #FF6B9D, 0 0 20px #FFD700, 0 0 30px #C77DFF; } }
        @keyframes float { 0%, 100% { transform: translateY(-10px) translateX(0px); } 25% { transform: translateY(-30px) translateX(5px); } 50% { transform: translateY(-50px) translateX(0px); } 75% { transform: translateY(-30px) translateX(-5px); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes swing { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        @keyframes wobble { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        @keyframes radiusShift { 0%,100% { border-radius: 50% 40% 50% 40%; } 25% { border-radius: 40% 50% 40% 50%; } 50% { border-radius: 50% 50% 40% 40%; } 75% { border-radius: 50% 40% 50% 40%; } }

        .msg-card:hover { transform: translateY(-8px) scale(1.03) rotateY(5deg); transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 15px 40px rgba(255,107,157,0.35) !important; }
        .msg-card { box-shadow: 0 4px 20px rgba(255,107,157,0.15) !important; }
        .photo-thumb:hover { transform: scale(1.1) rotate(3deg); transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 15px 40px rgba(255,107,157,0.4) !important; filter: brightness(1.1); }
        .cake-btn:hover { transform: scale(1.3) rotate(30deg) !important; filter: drop-shadow(0 0 15px #FFD700); }
        
        .emoji-float { animation: float 4s ease-in-out infinite; }
        .hearts { animation: swing 2s ease-in-out infinite; }
        .rotate-slow { animation: rotate 20s linear infinite; }
        .balloon {
          position: absolute;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.3s ease;
          animation: balloonFloat 6s ease-in-out infinite;
          border: 3px solid rgba(255,255,255,0.7);
          box-shadow: 0 10px 30px rgba(199,125,255,0.2);
          background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 70%);
        }
        .balloon:hover { transform: scale(1.05); }
        .balloon.popped { animation: balloonPop 0.4s forwards; cursor: default; opacity: 0; }
        .gift-box {
          position: relative;
          width: 120px;
          height: 110px;
          margin: 0 auto 1rem;
          border-radius: 18px 18px 26px 26px;
          background: #ff5f9b;
          box-shadow: 0 18px 40px rgba(255, 95, 155, 0.2);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .gift-box.gold { background: #ffd700; box-shadow: 0 18px 40px rgba(255, 183, 0, 0.2); }
        .gift-box:hover { transform: translateY(-3px); }
        .gift-ribbon {
          position: absolute;
          top: 0; left: 50%; width: 24px; height: 100%;
          background: #fff;
          transform: translateX(-50%);
        }
        .gift-cross {
          position: absolute;
          left: 0; top: 50%; width: 100%; height: 24px;
          background: #fff;
          transform: translateY(-50%);
        }
        .gift-lid {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 36px;
          background: #ff3f86;
          border-bottom: 4px solid #f7bfd2;
          transform-origin: top center;
          transition: transform 0.35s ease;
        }
        .gift-box.gold .gift-lid { background: #ffcc00; border-bottom: 4px solid #ffe35a; }
        .gift-box.open .gift-lid { transform: rotateX(-75deg); }
        .gift-note {
          position: absolute;
          bottom: 12px; left: 50%; transform: translateX(-50%);
          width: 90%; padding: 0.85rem 0.9rem;
          background: rgba(255,255,255,0.95);
          border-radius: 16px;
          box-shadow: 0 12px 25px rgba(33, 15, 41, 0.12);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .gift-box.open .gift-note { opacity: 1; transform: translateY(0); }
        .gift-note p { margin: 0; font-weight: 700; color: #3d0d45; }
        .gift-box.gold .gift-note { background: rgba(255,255,255,0.95); }
        @keyframes balloonFloat { 0% { transform: translateY(0); } 50% { transform: translateY(-18px); } 100% { transform: translateY(0); } }
        @keyframes balloonPop { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(1.6); } }
        @keyframes bubbleDrift { 0% { transform: translate(0, 0) scale(1); opacity: 0.8; } 50% { transform: translate(18px, -24px) scale(1.08); opacity: 0.95; } 100% { transform: translate(0, 0) scale(1); opacity: 0.8; } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ textAlign: "center", padding: "4rem 1.5rem 3rem", position: "relative", overflow: "hidden" }}>
        <button
          type="button"
          onClick={() => setTheme(theme === "pink" ? "gold" : "pink")}
          style={{
            position: "absolute",
            top: "1.3rem",
            right: "1.5rem",
            padding: "0.9rem 1rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background: themeStyles.toggleBg,
            color: themeStyles.toggleText,
            fontWeight: 700,
            boxShadow: themeStyles.buttonShadow,
            zIndex: 10
          }}
        >
          {theme === "pink" ? "Gold Sparkle Mode" : "Pink Party Mode"}
        </button>
        {/* Animated background orbs */}
        <div style={{
          position: "absolute", top: "-10%", left: "-5%", width: "200px", height: "200px",
          background: "radial-gradient(circle, rgba(255,107,157,0.2) 0%, transparent 70%)",
          borderRadius: "50%", animation: "float 8s ease-in-out infinite", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "-5%", width: "250px", height: "250px",
          background: "radial-gradient(circle, rgba(199,125,255,0.2) 0%, transparent 70%)",
          borderRadius: "50%", animation: "float 10s ease-in-out infinite 2s", pointerEvents: "none"
        }} />

        {/* Sparkle decorations with enhanced animation */}
        {["✨", "🌸", "💫", "🎀", "⭐", "🌷"].map((e, i) => (
          <span key={i} style={{
            position: "absolute", fontSize: "1.5rem",
            top: `${10 + (i * 13) % 60}%`, left: i % 2 === 0 ? `${5 + i * 5}%` : `${75 + i * 3}%`,
            animation: `sparkle ${2 + i * 0.4}s ${i * 0.3}s infinite ease-in-out, float ${4 + i}s ${i * 0.5}s ease-in-out infinite`,
            pointerEvents: "none",
            filter: "drop-shadow(0 0 8px rgba(255,107,157,0.6))"
          }}>{e}</span>
        ))}

        <h1 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          background: themeStyles.heroGradient,
          backgroundSize: "300%",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "shimmer 4s linear infinite",
          lineHeight: 1.2, marginBottom: "0.5rem",
          textShadow: "0 0 30px rgba(255,155,66,0.25)",
          letterSpacing: "2px"
        }}>
          Happy Birthday
        </h1>
        <h2 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          color: themeStyles.heroText,
          marginBottom: "0.5rem",
          animation: "glow 3s ease-in-out infinite",
          letterSpacing: "1px"
        }}>
          Vaishuu 🎀
        </h2>
        <p style={{ color: themeStyles.heroSubtitle, fontSize: "1rem", fontWeight: 600, letterSpacing: "2px", marginBottom: "2rem", animation: "pulse 3s ease-in-out infinite" }}>
          — with all the love in the world —
        </p>

        {/* Main photo */}
        <div style={{
          width: "clamp(200px, 40vw, 260px)", height: "clamp(200px, 40vw, 260px)",
          margin: "0 auto 1.5rem",
          borderRadius: "50%",
          padding: "5px",
          background: themeStyles.heroCardBg,
          backgroundSize: "300%",
          animation: "shimmer 3s linear infinite, borderGlow 2s ease-in-out infinite",
          boxShadow: themeStyles.heroCardShadow,
          cursor: "pointer", transition: "all 0.3s ease"
        }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05) rotate(5deg)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}>
          <img
            src={photos[0].src}
            alt="Vaishnavi"
            style={{
              width: "100%", height: "100%",
              borderRadius: "50%", objectFit: "cover",
              border: "4px solid #fff5f8",
              animation: "photoFloat 4s ease-in-out infinite"
            }}
          />
        </div>

        <div style={{ fontSize: "4.5rem", cursor: "pointer", display: "inline-block", transition: "all 0.2s ease" }}
          className="cake-btn"
          onClick={handleCakeClick} title="Click me!">🎂</div>
        <div
          className={`gift-box ${theme === "gold" ? "gold" : ""} ${giftOpen ? "open" : ""}`}
          onClick={handleGiftClick}
          title="Open the gift"
          style={{ marginTop: "1.25rem" }}
        >
          <div className="gift-lid" />
          <div className="gift-ribbon" />
          <div className="gift-cross" />
          <div className="gift-note">
            <p>{giftOpen ? "Surprise! Happy Birthday 💝" : "Click to open your gift"}</p>
          </div>
        </div>
        {cakeClicks > 0 && (
          <p style={{ color: "#E8447A", fontWeight: 700, marginTop: "0.5rem", fontSize: "0.95rem", animation: "bounce 0.6s ease-out" }}>
            {cakeClicks === 1 ? "Make a wish! 🌟" : cakeClicks === 2 ? "Another wish! 💖" : "So many wishes! ✨🎉"}
          </p>
        )}
      </section>

      {/* ── BALLOON POP ACTIVITY ── */}
      <section style={{ padding: "2rem 1.5rem 3rem", maxWidth: "700px", margin: "0 auto", position: "relative", background: "rgba(255,255,255,0.65)", borderRadius: "28px", boxShadow: "0 18px 40px rgba(199,125,255,0.12)", border: "1px solid rgba(255,255,255,0.75)" }}>
        <h3 style={{ fontFamily: "'Dancing Script', cursive", textAlign: "center", fontSize: "2rem", color: "#E8447A", marginBottom: "0.75rem" }}>
          Pop the party balloons 🎈
        </h3>
        <p style={{ textAlign: "center", color: "#6b3578", marginBottom: "1.5rem", fontWeight: 600, letterSpacing: "0.5px" }}>
          Click the balloons to pop them and make the celebration sparkle!
        </p>
        <div style={{ position: "relative", height: "200px", margin: "0 auto 1rem", maxWidth: "720px" }}>
          {balloonData.map((balloon) => (
            <button
              key={balloon.id}
              type="button"
              onClick={() => popBalloon(balloon.id)}
              disabled={isPopped(balloon.id)}
              className={`balloon${isPopped(balloon.id) ? " popped" : ""}`}
              style={{ left: balloon.left, top: "30px", animationDelay: balloon.delay, opacity: isPopped(balloon.id) ? 0 : 1 }}
            >
              🎈
            </button>
          ))}
          {poppedCount === balloonData.length && (
            <div style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              padding: "1rem 1.25rem",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 20px 50px rgba(137, 45, 161, 0.18)",
              border: "1px solid rgba(255,255,255,0.9)",
              textAlign: "center",
              maxWidth: "320px"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎁</div>
              <p style={{ margin: 0, fontWeight: 700, color: "#7a2977" }}>Surprise unlocked!</p>
              <p style={{ margin: "0.35rem 0 0", color: "#5f3276", fontSize: "0.95rem" }}>
                You popped all the balloons — here’s your special birthday surprise!
              </p>
            </div>
          )}
        </div>
        {poppedCount === balloonData.length && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <div style={{
              width: "100%",
              maxWidth: "320px",
              borderRadius: "24px",
              padding: "1rem",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 20px 45px rgba(133, 56, 150, 0.2)",
              animation: "scaleIn 0.35s ease-out"
            }}>
              <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#7a2977", lineHeight: 1.6 }}>
                மிகவும் இனிய பிறந்த நாள் வாழ்த்துகள், வைஷு!
              </p>
            </div>
          </div>
        )}
        <p style={{ textAlign: "center", color: "#9452b1", fontWeight: 700, marginBottom: 0 }}>
          {poppedCount === balloonData.length ? "All popped! Great job! 🎉" : `${poppedCount} of ${balloonData.length} popped`}
        </p>
      </section>

      {/* ── BIRTHDAY MESSAGE CARDS ── */}
      <section style={{ padding: "2rem 1.5rem 3rem", maxWidth: "700px", margin: "0 auto", position: "relative" }}>
        <div style={{
          position: "absolute", top: "-50px", left: "50%", transform: "translateX(-50%)",
          fontSize: "3rem", animation: "bounce 2s ease-in-out infinite"
        }}>💌</div>

        <h3 ref={el => sectionRefs.current[0] = el} data-id="0"
          style={{
            fontFamily: "'Dancing Script', cursive", textAlign: "center",
            fontSize: "2.2rem", color: "#E8447A", marginBottom: "2rem",
            opacity: isVisible("0") ? 1 : 0,
            transform: isVisible("0") ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
            animation: isVisible("0") ? "glow 4s ease-in-out infinite" : "none",
            letterSpacing: "1px"
          }}>
          A little message from the heart 💌
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {messages.map((msg, i) => (
            <div key={i}
              ref={el => sectionRefs.current[i + 1] = el} data-id={i + 1}
              className="msg-card"
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "1.2rem 1.5rem",
                boxShadow: "0 4px 20px rgba(255,107,157,0.15)",
                borderLeft: "4px solid",
                borderColor: ["#FF6B9D", "#C77DFF", "#FFD700", "#FF6B9D", "#C77DFF", "#FFD700"][i % 6],
                opacity: isVisible(String(i + 1)) ? 1 : 0,
                transform: isVisible(String(i + 1)) ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
                display: "flex", alignItems: "flex-start", gap: "1rem",
                cursor: "default"
              }}>
              <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{msg.emoji}</span>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.05rem", lineHeight: 1.6, color: "#3D1A47", fontWeight: 600, margin: 0 }}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHOTO MEMORIES ── */}
      <section style={{ padding: "2rem 1.5rem 4rem", maxWidth: "700px", margin: "0 auto", position: "relative" }}>
        <div style={{
          position: "absolute", top: "-50px", left: "50%", transform: "translateX(-50%)",
          fontSize: "3rem", animation: "swing 3s ease-in-out infinite"
        }}>🌸</div>

        <h3
          ref={el => sectionRefs.current[messages.length + 1] = el}
          data-id={messages.length + 1}
          style={{
            fontFamily: "'Dancing Script', cursive", textAlign: "center",
            fontSize: "2.2rem", color: "#C77DFF", marginBottom: "2rem",
            opacity: isVisible(String(messages.length + 1)) ? 1 : 0,
            transform: isVisible(String(messages.length + 1)) ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
            animation: isVisible(String(messages.length + 1)) ? "glow 4s ease-in-out infinite" : "none",
            letterSpacing: "1px"
          }}>
          Our beautiful memories 🌸
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {photos.slice(1).map((photo, i) => (
            <div key={i}
              ref={el => sectionRefs.current[messages.length + 2 + i] = el}
              data-id={messages.length + 2 + i}
              className="photo-thumb"
              style={{
                borderRadius: "20px", overflow: "hidden",
                boxShadow: "0 6px 25px rgba(255,107,157,0.25)",
                border: "3px solid",
                borderColor: photoBorderColors[i],
                opacity: isVisible(String(messages.length + 2 + i)) ? 1 : 0,
                transform: isVisible(String(messages.length + 2 + i)) ? "scale(1)" : "scale(0.85)",
                transition: `all 0.6s ease ${i * 0.15}s`,
                cursor: "pointer",
                animation: `photoFloat ${3 + i * 0.5}s ${i * 0.5}s ease-in-out infinite`
              }}>
              <img src={photo.src} alt={photo.label} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} />
              <div style={{
                background: "linear-gradient(0deg, rgba(255,107,157,0.9) 0%, transparent 100%)",
                padding: "0.5rem", textAlign: "center",
                color: "white", fontWeight: 700, fontSize: "0.75rem"
              }}>
                {photo.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUIZ SECTION ── */}
      <section style={{ padding: "2rem 1.5rem 4rem", maxWidth: "760px", margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: "-35px", right: "20px", fontSize: "2.5rem", opacity: 0.25 }}>🧠</div>
        <h3
          ref={el => sectionRefs.current[messages.length + photos.slice(1).length + 2] = el}
          data-id={messages.length + photos.slice(1).length + 2}
          style={{
            fontFamily: "'Dancing Script', cursive", textAlign: "center",
            fontSize: "2.2rem", color: "#C77DFF", marginBottom: "1.75rem",
            opacity: isVisible(String(messages.length + photos.slice(1).length + 2)) ? 1 : 0,
            transform: isVisible(String(messages.length + photos.slice(1).length + 2)) ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
            animation: isVisible(String(messages.length + photos.slice(1).length + 2)) ? "glow 4s ease-in-out infinite" : "none",
            letterSpacing: "1px"
          }}>
          Quick Quiz: How well do you know this card?
        </h3>

        <div style={{
          background: themeStyles.sectionBg,
          borderRadius: "30px",
          boxShadow: themeStyles.cardShadow,
          padding: "2rem",
          border: "2px solid rgba(255,255,255,0.8)",
          position: "relative"
        }}>
          {quizCompleted ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: themeStyles.heroText, marginBottom: "1rem" }}>
                You scored {quizScore} / {quizQuestions.length}!
              </p>
              <p style={{ fontSize: "0.95rem", color: "#5c2f73", marginBottom: "1.5rem" }}>
                Nice work! Tap below to play again.
              </p>
              <button
                onClick={resetQuiz}
                style={{
                  background: themeStyles.heroGradient,
                  color: "white",
                  border: "none",
                  borderRadius: "999px",
                  padding: "0.9rem 2rem",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: themeStyles.buttonShadow
                }}>
                Play again
              </button>
            </div>
          ) : (
            <>
              <p style={{ fontSize: "1rem", color: themeStyles.heroSubtitle, marginBottom: "1.5rem", fontWeight: 600, textAlign: "center" }}>
                Choose the answer that feels right, then watch the quiz move on automatically.
              </p>
              <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
                <p style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  Question {currentQuizIndex + 1} of {quizQuestions.length}
                </p>
                <p style={{ fontSize: "1.2rem", color: "#3D1A47", margin: 0 }}>
                  {quizQuestions[currentQuizIndex].question}
                </p>
              </div>
              <div style={{ display: "grid", gap: "0.85rem" }}>
                {quizQuestions[currentQuizIndex].options.map((option, optionIndex) => {
                  const isSelected = selectedAnswer === optionIndex;
                  const isCorrect = optionIndex === quizQuestions[currentQuizIndex].correct;
                  const revealStyle = selectedAnswer !== null && (isSelected || isCorrect)
                    ? {
                      background: isCorrect ? "#D1FFD8" : "#FFD6DE",
                      borderColor: isCorrect ? "#4CAF50" : "#E8447A",
                      color: "#3D1A47"
                    }
                    : {};

                  return (
                    <button
                      key={option}
                      onClick={() => handleQuizAnswer(optionIndex)}
                      disabled={selectedAnswer !== null}
                      style={{
                        width: "100%",
                        padding: "1rem 1.2rem",
                        borderRadius: "18px",
                        border: "2px solid rgba(255,255,255,0.8)",
                        background: "white",
                        color: "#3D1A47",
                        fontSize: "1rem",
                        fontWeight: 700,
                        cursor: selectedAnswer !== null ? "default" : "pointer",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                        ...revealStyle
                      }}>
                      {option}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        textAlign: "center", padding: "3rem 1rem",
        background: themeStyles.footerBg,
        borderTop: "3px dashed #FFB3CC",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "10%", left: "10%", fontSize: "2rem",
          animation: "float 6s ease-in-out infinite", opacity: 0.4
        }}>🎂</div>
        <div style={{
          position: "absolute", bottom: "20%", right: "15%", fontSize: "2rem",
          animation: "swing 4s ease-in-out infinite", opacity: 0.4
        }}>🎀</div>

        <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.8rem", color: "#E8447A", marginBottom: "0.5rem", animation: "glow 3s ease-in-out infinite", letterSpacing: "1px" }}>
          With loads of love 💖
        </p>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "#9b59b6", fontWeight: 700, fontSize: "1rem", animation: "pulse 2.5s ease-in-out infinite" }}>
          🎀 Made with ❤️ especially for you, Vaishuu 🎀
        </p>
        <div style={{ fontSize: "2rem", marginTop: "1.5rem", letterSpacing: "8px", animation: "wobble 3s ease-in-out infinite" }}>
          🌸✨🎀✨🌸
        </div>
      </footer>
    </div>
  );
}

