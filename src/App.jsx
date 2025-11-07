import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import LapTracker from "./components/LapTracker";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DriverProfile from "./components/DriverProfile";
import Career from "./components/Career";
import Podium from "./components/Podium";
import Garage from "./components/Garage";
import Academy from "./components/Academy";
import Contact from "./components/Contact";
import "./styles/App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [drsActive, setDrsActive] = useState(false);
  const [silverMode, setSilverMode] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("monza");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / docHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.className = silverMode ? "silver-mode" : "";
  }, [silverMode]);

  useEffect(() => {
    document.body.className = drsActive ? "drs-active" : "";
  }, [drsActive]);

  return (
    <div
      className={`app ${drsActive ? "drs-active" : ""} ${
        silverMode ? "silver-mode" : ""
      }`}
    >
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <div className="speed-lines" style={{ opacity: drsActive ? 1 : 0 }} />

          <LapTracker
            scrollProgress={scrollProgress}
            currentTrack={currentTrack}
            drsActive={drsActive}
          />

          <button
            className="drs-toggle"
            onClick={() => setDrsActive(!drsActive)}
          >
            <span>{drsActive ? "DRS ACTIVE" : "DRS INACTIVE"}</span>
            <div className={`drs-light ${drsActive ? "active" : ""}`} />
          </button>

          <Dashboard scrollProgress={scrollProgress} drsActive={drsActive} />

          <Header
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            silverMode={silverMode}
            setSilverMode={setSilverMode}
          />

          <main>
            <Hero />
            <DriverProfile />
            <Career />
            <Podium />
            <Garage />
            <Academy />
            <Contact />
          </main>

          <footer>
            <div className="container">
              <p>
                &copy; 2025 Bodapati Praneeth | F1 Lap Portfolio. Designed and
                engineered with <i className="fas fa-heart" />.
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
