// ✅ CLEAN GARAGE WITHOUT SOUND
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/portfolioData";

const ease = [0.22, 1, 0.36, 1];

const Garage = () => {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () => projectsData.filter((p) => filter === "all" || p.tyre === filter),
    [filter]
  );

  return (
    <section className="section" id="garage">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          The Garage: Projects
        </motion.h2>

        {/* Tyre filters */}
        <motion.div
          className="tyre-filter"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
        >
          {["all", "soft", "medium", "hard"].map((tyre) => (
            <motion.button
              key={tyre}
              id={`filter-${tyre}`}
              type="button"
              className={`tyre-btn ${filter === tyre ? "active" : ""}`}
              onClick={() => setFilter(tyre)}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                scale: filter === tyre ? 1.08 : 1,
                y: filter === tyre ? -4 : 0,
              }}
              transition={{ duration: 0.35, ease }}
            >
              {tyre.charAt(0).toUpperCase() + tyre.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Selector grid */}
        <motion.div
          className="projects-grid smooth-layout selector-grid"
          layout="position"
          transition={{ layout: { duration: 0.6, ease } }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.article
                key={project.title}
                className={`f1-card project-card selector-card tyre-${project.tyre}`}
                layout
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.98,
                  filter: "blur(4px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, amount: 0.25 }}
                exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(3px)" }}
                transition={{ duration: 0.45, ease, delay: idx * 0.04 }}
                whileHover={{ y: -8, scale: 1.02, rotateX: 2 }}
              >
                <div className="tyre-band" />

                <div className="selector-hero">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="selector-img"
                    draggable={false}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4, ease }}
                  />
                  <div className="selector-reflection" />
                </div>

                <div className="f1-card-content selector-content">
                  <div className="selector-top">
                    <h4 className="selector-title">{project.title}</h4>
                    <span
                      className={`selector-compound cap tyre-${project.tyre}`}
                    >
                      {project.tyre}
                    </span>
                  </div>

                  <p className="selector-desc">{project.description}</p>

                  <div className="selector-actions">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="drs-btn"
                    >
                      <span className="drs-panel">
                        <i className="fas fa-bolt" />
                        VIEW PROJECT
                      </span>
                    </a>

                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="pit-tool"
                    >
                      <i className="fab fa-github" />
                      <span>Repo</span>
                    </a>
                  </div>
                </div>

                <div className="garage-floor-glow" />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Garage;
