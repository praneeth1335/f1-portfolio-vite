import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Team Radio
        </motion.h2>

        <motion.div
          className="contact-panel"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          <div className="contact-grid">
            {/* ==========================
                LEFT SIDE (FORM)
            =========================== */}
            <div className="contact-form">
              <div className="contact-topbar">
                <span className="contact-pill">COMMS</span>
                <span className="contact-led" />
              </div>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="contact-form-inner"
              >
                {/* Web3Forms Access Key */}
                <input
                  type="hidden"
                  name="access_key"
                  value="cdee27ae-74a6-4b35-bd15-7394676eb3a8"
                />

                {/* Redirect on success */}
                <input type="hidden" name="redirect" value="success.html" />

                {/* Anti-spam honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  style={{ display: "none" }}
                />

                <label className="contact-label">Driver</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />

                <label className="contact-label">Channel</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />

                <label className="contact-label">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  required
                />

                <motion.button
                  type="submit"
                  className="btn contact-submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send To Box <i className="fas fa-paper-plane" />
                </motion.button>
              </form>
            </div>

            {/* ==========================
                RIGHT SIDE (CHANNEL LINKS)
            =========================== */}
            <div className="contact-channels">
              <h3 className="contact-title">Broadcast Channels</h3>
              <p className="contact-copy">
                Open a line with the pit wall. Quick, clear, race-winning comms.
              </p>

              <div className="contact-links">
                <motion.a
                  href="tel:+918712135034"
                  className="channel"
                  whileHover={{ x: 6 }}
                >
                  <i className="fas fa-phone" /> +91 87121 35034
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/bodapatisaipraneeth"
                  target="_blank"
                  className="channel"
                  whileHover={{ x: 6 }}
                >
                  <i className="fab fa-linkedin-in" /> /in/bodapatisaipraneeth
                </motion.a>

                <motion.a
                  href="https://github.com/praneeth1335"
                  target="_blank"
                  className="channel"
                  whileHover={{ x: 6 }}
                >
                  <i className="fab fa-github" /> /praneeth1335
                </motion.a>
              </div>

              {/* Spectrum animation (kept from radio theme) */}
              <div className="contact-spectrum" aria-hidden="true">
                {[...Array(40)].map((_, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.04}s` }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
