import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { skillsData } from "../data/portfolioData";

const DriverProfile = () => {
  const [currentMode, setCurrentMode] = useState("General");
  const [currentGear, setCurrentGear] = useState(5);
  const [rpm, setRpm] = useState(65);
  const [isRotated, setIsRotated] = useState(false);

  const wheelData = {
    General: {
      title: "GENERAL",
      items: ["Welcome!", "Select a mode", "to view skills"],
    },
    Frontend: {
      title: "FRONTEND",
      items: skillsData
        .find((s) => s.title === "Frontend Development")
        .skills.slice(0, 4),
    },
    Backend: {
      title: "BACKEND",
      items: skillsData
        .find((s) => s.title === "Backend Development")
        .skills.slice(0, 4),
    },
    "Data / ML": {
      title: "DATA / ML",
      items: skillsData
        .find((s) => s.title === "Machine Learning / Data Science")
        .skills.slice(0, 4),
    },
    DevOps: {
      title: "DEVOPS",
      items: skillsData
        .find((s) => s.title === "Tools & Platforms")
        .skills.slice(0, 4),
    },
    Tools: {
      title: "DATABASES",
      items: skillsData.find((s) => s.title === "Databases").skills.slice(0, 4),
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRpm((prev) =>
        Math.min(95, Math.max(20, prev + (Math.random() * 6 - 3)))
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const shiftUp = () => setCurrentGear((prev) => Math.min(8, prev + 1));
  const shiftDown = () => setCurrentGear((prev) => Math.max(1, prev - 1));
  const toggleRotation = () => setIsRotated(!isRotated);

  return (
    <section className="section" id="driver">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Driver Profile
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Full Stack Developer & ML Enthusiast</h3>
            <p>
              I'm a passionate Computer Science student at SASTRA University
              with a strong focus on full-stack web development and machine
              learning. With a GPA of 8.9/10, I've consistently demonstrated my
              ability to excel in challenging technical environments.
            </p>
            <p>
              My expertise spans modern web technologies including React,
              Node.js, and Python, allowing me to build scalable and efficient
              applications. I'm particularly interested in creating solutions
              that solve real-world problems through clean code and intuitive
              design.
            </p>
          </motion.div>

          <motion.div
            className="f1-wheel-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="f1-wheel-3d"
              animate={{
                rotateY: isRotated ? 15 : 0,
                rotateX: isRotated ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="wheel-main-body">
                <div className="wheel-top-section">
                  <div className="gear-display">
                    <motion.div
                      className="current-gear"
                      key={currentGear}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentGear}
                    </motion.div>
                    <div className="gear-label">Gear</div>
                  </div>

                  <div className="shift-indicators">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`shift-light ${
                          i < currentGear ? "active" : ""
                        }`}
                      />
                    ))}
                  </div>

                  <div className="rpm-display">
                    <div className="rpm-bar">
                      <motion.div
                        className="rpm-fill"
                        style={{ width: `${rpm}%` }}
                        animate={{
                          background:
                            rpm > 80
                              ? "linear-gradient(90deg, var(--btn-yellow), var(--secondary))"
                              : rpm > 60
                              ? "linear-gradient(90deg, var(--btn-green), var(--btn-yellow))"
                              : "var(--btn-green)",
                        }}
                      />
                    </div>
                    <div className="rpm-label">RPM x1000</div>
                  </div>
                </div>

                <div className="wheel-main-area">
                  <div className="button-cluster left">
                    {["General", "Frontend", "Backend", "Tools"].map((mode) => (
                      <motion.button
                        key={mode}
                        className={`wheel-button ${
                          currentMode === mode ? "active" : ""
                        }`}
                        onClick={() => setCurrentMode(mode)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {mode === "General" ? (
                          <div className="mercedes-star" />
                        ) : (
                          mode.slice(0, 2).toUpperCase()
                        )}
                      </motion.button>
                    ))}
                  </div>

                  <div className="screen-area">
                    <div className="screen-header">
                      <div className="screen-title">
                        {wheelData[currentMode].title}
                      </div>
                      <div className="screen-data">BSP // P1</div>
                    </div>
                    <div className="screen-content">
                      <ul className="screen-list">
                        {wheelData[currentMode].items.map((item, index) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="button-cluster right">
                    {["Data / ML", "DevOps"].map((mode) => (
                      <motion.button
                        key={mode}
                        className={`wheel-button ${
                          currentMode === mode ? "active" : ""
                        }`}
                        onClick={() => setCurrentMode(mode)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {mode.slice(0, 2).toUpperCase()}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="wheel-bottom-section">
                  <div className="paddle-section">
                    <motion.div
                      className="paddle shift-up"
                      onClick={shiftUp}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ▲ UP
                    </motion.div>
                    <div className="paddle">DRS</div>
                  </div>

                  <div className="dial-cluster">
                    {["Data / ML", "DevOps", "Tools"].map((mode) => (
                      <div key={mode} className="dial-container">
                        <motion.div
                          className={`dial ${
                            currentMode === mode ? "active" : ""
                          }`}
                          onClick={() => setCurrentMode(mode)}
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          whileTap={{ scale: 0.9 }}
                        />
                        <div className="dial-label">{mode.split(" ")[0]}</div>
                      </div>
                    ))}
                  </div>

                  <div className="paddle-section">
                    <div className="paddle">OVERTAKE</div>
                    <motion.div
                      className="paddle shift-down"
                      onClick={shiftDown}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ▼ DOWN
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="controls-panel">
              <motion.button
                className="control-btn"
                onClick={toggleRotation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRotated ? "Reset View" : "Rotate View"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DriverProfile;
