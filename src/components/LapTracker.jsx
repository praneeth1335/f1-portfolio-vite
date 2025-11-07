import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const TRACK_PATHS = {
  monza:
    "M 30 20 C 30 50, 50 70, 30 100 C 30 130, 10 150, 30 180 C 30 210, 50 230, 30 260",
  monaco:
    "M 30 20 C 30 40, 50 60, 30 80 C 30 100, 10 120, 30 140 C 30 160, 50 180, 30 200 C 30 220, 10 240, 30 260",
  silverstone:
    "M 30 20 C 30 60, 50 80, 30 120 C 30 160, 10 180, 30 200 C 30 220, 50 240, 30 260",
};

const LapTracker = ({ scrollProgress, currentTrack, drsActive }) => {
  const d = TRACK_PATHS[currentTrack] || TRACK_PATHS.monza;

  const pathRef = useRef(null);
  const [totalLength, setTotalLength] = useState(1000);

  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        setTotalLength(len || 1000);
      } catch {}
    }
  }, [d]);

  // Compute the exact coordinate along the path for the dot
  const point = useMemo(() => {
    const el = pathRef.current;
    if (!el) return { x: 30, y: 20 };
    const l = Math.min(Math.max(scrollProgress, 0), 1) * totalLength;
    try {
      const { x, y } = el.getPointAtLength(l);
      return { x, y };
    } catch {
      return { x: 30, y: 20 };
    }
  }, [scrollProgress, totalLength]);

  const dashOffset = useMemo(
    () => totalLength * (1 - Math.min(Math.max(scrollProgress, 0), 1)),
    [scrollProgress, totalLength]
  );

  return (
    <div className="lap-tracker" aria-hidden="true">
      <svg viewBox="0 0 60 300" preserveAspectRatio="xMidYMid meet">
        <path className="lap-path-bg" d={d} />
        <motion.path
          ref={pathRef}
          className="lap-path"
          d={d}
          style={{
            strokeDasharray: totalLength,
            strokeDashoffset: dashOffset,
          }}
          transition={{ duration: 0.08 }}
        />
        <motion.circle
          className={`car-marker ${drsActive ? "drs-active" : ""}`}
          r="4"
          cx={point.x}
          cy={point.y}
          animate={{ cx: point.x, cy: point.y }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        />
      </svg>
    </div>
  );
};

export default LapTracker;
