import React from "react";
import { motion } from "framer-motion";
import { educationData } from "../data/portfolioData";

const Academy = () => {
  return (
    <section className="section" id="academy">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Race Academy
        </motion.h2>

        <motion.div
          className="education-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className="f1-card education-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="f1-card-content">
                <h3>{edu.degree}</h3>
                <motion.div
                  className="institute"
                  whileHover={{ color: "var(--secondary)" }}
                >
                  {edu.institution}
                </motion.div>
                <div className="date">
                  {edu.date} | {edu.grade}
                </div>
                <ul>
                  <li>{edu.description}</li>
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Academy;
