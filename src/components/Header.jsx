import React from "react";
import { motion } from "framer-motion";

const Header = ({
  currentTrack,
  setCurrentTrack,
  silverMode,
  setSilverMode,
}) => {
  const navItems = [
    { href: "#grid", label: "GRID" },
    { href: "#driver", label: "DRIVER" },
    { href: "#career", label: "CAREER" },
    { href: "#podium", label: "PODIUM" },
    { href: "#garage", label: "GARAGE" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container">
        <motion.a
          href="#grid"
          className="logo"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <div>BSP</div>
        </motion.a>

        <nav className="nav-links">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="nav-link"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, color: "var(--secondary)" }}
            >
              {item.label}
            </motion.a>
          ))}

          <motion.select
            className="track-select"
            value={currentTrack}
            onChange={(e) => setCurrentTrack(e.target.value)}
            whileHover={{ scale: 1.05 }}
          >
            <option value="monza">Monza (Speed)</option>
            <option value="monaco">Monaco (Twisty)</option>
            <option value="silverstone">Silverstone (Classic)</option>
          </motion.select>

          <motion.button
            className="theme-toggle"
            onClick={() => setSilverMode(!silverMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className={silverMode ? "fas fa-tint" : "fas fa-star"} />
            {silverMode ? " Petronas Mode" : " Silver Arrow"}
          </motion.button>
        </nav>
      </div>

      {/* Animated Header Border */}
      <motion.div
        className="header-border"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.header>
  );
};

export default Header;
