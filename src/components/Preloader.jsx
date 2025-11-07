import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [light, setLight] = useState(0);
  const [phase, setPhase] = useState("lights");
  const audioRef = useRef(null);
  const [unlocked, setUnlocked] = useState(false);

  // Prepare sound
  useEffect(() => {
    const a = new Audio("/assets/audio/engine-medium.mp3");
    a.volume = 0.7;
    audioRef.current = a;
  }, []);

  // ✅ First user action unlocks sound
  useEffect(() => {
    const unlock = () => {
      if (!audioRef.current) return;
      audioRef.current
        .play()
        .then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setUnlocked(true);
          window.removeEventListener("click", unlock);
          window.removeEventListener("touchstart", unlock);
        })
        .catch(() => {});
    };

    window.addEventListener("click", unlock);
    window.addEventListener("touchstart", unlock);

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  // light logic + play sound
  useEffect(() => {
    const id = setInterval(() => {
      setLight((p) => {
        if (p >= 4) {
          clearInterval(id);

          setTimeout(() => {
            if (unlocked && audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {});
            }
            setPhase("flag");
          }, 350);

          setTimeout(() => setPhase("done"), 1150);
          setTimeout(() => onComplete(), 1500);
          return 4;
        }
        return p + 1;
      });
    }, 450);
    return () => clearInterval(id);
  }, [unlocked, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="lights-out"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="preloader-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Start Your Engines
          </motion.div>

          <div className="lights-container">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className={`light ${i <= light ? "on" : ""}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: i <= light ? 1.2 : 0.9 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>

          {phase === "flag" && (
            <motion.div
              className="flag-wipe"
              initial={{ y: "100%" }}
              animate={{ y: "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="flag-tile" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
