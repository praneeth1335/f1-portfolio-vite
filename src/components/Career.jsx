import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "../data/portfolioData";

const ease = [0.22, 1, 0.36, 1];
const tyreLabel = (t) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : "Soft");

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98, filter: "blur(4px)" },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay: 0.05 * i, ease },
  }),
};

const glowVariants = {
  rest: { opacity: 0.25 },
  hover: { opacity: 0.8 },
};

const TyreBadge = ({ compound }) => (
  <span className={`tyre-badge tyre-${compound || "soft"}`}>
    <span className={`tyre-dot tyre-${compound || "soft"}`} />
    {tyreLabel(compound)}
  </span>
);

const Career = () => {
  return (
    <section className="section" id="career">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          Career History — Garage Bays
        </motion.h2>

        {/* Dual bays grid */}
        <div className="garage-bays">
          {experienceData.map((exp, i) => (
            <motion.article
              key={`${exp.title}-${i}`}
              className={`garage-bay-card pit-${exp.tyre || "soft"}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              whileHover="hover"
            >
              {/* side neon + underglow */}
              <motion.span
                className="bay-glow"
                variants={glowVariants}
                initial="rest"
                animate="rest"
                whileHover="hover"
                aria-hidden="true"
              />
              <div className="bay-floor-glow" aria-hidden="true" />

              <div className="bay-header">
                <span className="pit-id">
                  PIT {String(i + 1).padStart(2, "0")}
                </span>
                <TyreBadge compound={exp.tyre} />
              </div>

              <h3 className="bay-title">{exp.title}</h3>
              <div className="bay-meta">
                <span className="company">{exp.company}</span>
                <span className="dot">•</span>
                <span className="dates">{exp.date}</span>
              </div>

              <ul className="bay-list">
                {Array.isArray(exp.responsibilities) &&
                  exp.responsibilities.map((r, k) => <li key={k}>{r}</li>)}
              </ul>

              {/* pit lights strip */}
              <div className="bay-lights" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
