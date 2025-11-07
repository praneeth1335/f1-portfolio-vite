import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Lap rules (REAL timing):
 * - A lap STARTS when you enter the "start zone" near top (< 0.05).
 * - A lap COMPLETES when you cross into the "end zone" near bottom (> 0.95)
 *   AFTER having started that lap.
 * - Lap count increments infinitely.
 * - Best updates only if current lap time is faster (lower).
 */

const START_ZONE = 0.05;
const END_ZONE = 0.95;

const fmtTime = (ms) => {
  if (ms == null) return "--.---";
  const totalMs = Math.max(0, Math.round(ms));
  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const millis = totalMs % 1000;
  return `${minutes}:${String(seconds).padStart(2, "0")}.${String(
    millis
  ).padStart(3, "0")}`;
};

const Dashboard = ({ scrollProgress, drsActive }) => {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [lapCount, setLapCount] = useState(0);
  const [bestLapMs, setBestLapMs] = useState(null);

  // live sector from scroll position
  const sector = useMemo(() => {
    const s = Math.floor(Math.min(Math.max(scrollProgress, 0), 1) * 3) + 1;
    return `S${Math.min(3, Math.max(1, s))}`;
  }, [scrollProgress]);

  // timers + edge tracking
  const lastProgressRef = useRef(0);
  const lapStartedRef = useRef(false);
  const lapStartTimeRef = useRef(null);

  // clock
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Lap state machine
  useEffect(() => {
    const prev = lastProgressRef.current;
    const curr = scrollProgress;

    // Enter start zone -> arm a new lap (if not already armed)
    if (curr < START_ZONE && !lapStartedRef.current) {
      lapStartedRef.current = true;
      lapStartTimeRef.current = performance.now();
    }

    // Completed when crossing into end zone after having started
    if (curr > END_ZONE && lapStartedRef.current) {
      lapStartedRef.current = false;
      const lapEnd = performance.now();
      const dur = lapEnd - (lapStartTimeRef.current ?? lapEnd);

      setLapCount((c) => c + 1);
      setBestLapMs((best) => (best == null || dur < best ? dur : best));
      lapStartTimeRef.current = null;
    }

    lastProgressRef.current = curr;
  }, [scrollProgress]);

  return (
    <motion.div
      className="f1-dashboard"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="dash-item">
        <span className="dash-label">SECTOR</span>
        <motion.span
          key={sector}
          className="current-sector"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {sector}
        </motion.span>
      </div>

      <div className="dash-item">
        <span className="dash-label">LAP</span>
        <motion.span
          key={lapCount}
          className="lap-count"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {String(lapCount).padStart(2, "0")}
        </motion.span>
        /∞
      </div>

      <div className="dash-item">
        <span className="dash-label">FL</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={bestLapMs ?? "none"}
            className={`fastest-lap-time ${bestLapMs != null ? "new-fl" : ""}`}
            initial={{ scale: 1.1, color: "#8a2be2" }}
            animate={{ scale: 1, color: "var(--primary)" }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
            title={bestLapMs == null ? "Set a lap to record FL" : "Fastest Lap"}
          >
            {fmtTime(bestLapMs)}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="dash-item">
        <span className="dash-label">LIVE</span>
        <motion.span
          className="current-time"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentTime}
        </motion.span>
      </div>

      <AnimatePresence>
        {drsActive && (
          <motion.div
            className="drs-indicator"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            DRS ACTIVATED
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
