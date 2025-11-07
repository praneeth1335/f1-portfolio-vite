import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const PHRASES = [
  "Full Stack Developer",
  "MERN Stack Engineer",
  "Performance Optimizer",
  "ML Enthusiast",
  "F1 Fanatic",
];

const TYPING = 70; // ms per char
const DELETING = 40; // ms per char
const HOLD = 1400; // ms paused at full phrase

const Hero = () => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const run = () => {
      const phrase = PHRASES[idx];
      if (!deleting) {
        if (text.length < phrase.length) {
          setText(phrase.slice(0, text.length + 1));
          timerRef.current = setTimeout(run, TYPING);
        } else {
          // hold then start deleting
          timerRef.current = setTimeout(() => {
            setDeleting(true);
            timerRef.current = setTimeout(run, DELETING);
          }, HOLD);
        }
      } else {
        if (text.length > 0) {
          setText(phrase.slice(0, text.length - 1));
          timerRef.current = setTimeout(run, DELETING);
        } else {
          setDeleting(false);
          setIdx((p) => (p + 1) % PHRASES.length);
          timerRef.current = setTimeout(run, TYPING);
        }
      }
    };
    timerRef.current = setTimeout(run, TYPING);
    return () => clearTimeout(timerRef.current);
  }, [idx, text, deleting]);

  return (
    <section className="section" id="grid">
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            POLE POSITION // P1
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Bodapati Sai Praneeth
          </motion.h1>

          <div className="typing-container">
            <span className="typed-text">
              {text}
              <motion.span
                className="cursor"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              >
                |
              </motion.span>
            </span>
          </div>

          <motion.p
            className="tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Engineering high-performance digital solutions. From complex backend
            logic to pixel-perfect frontends, I build with speed and precision.
          </motion.p>

          <motion.div
            className="btn-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="#garage"
              className="btn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-flag-checkered" />
              View The Garage
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn-outline"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-headset" />
              Team Radio
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.img
            src="https://placehold.co/400x400/141414/00D2BE?text=BSP"
            alt="Bodapati Praneeth"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
