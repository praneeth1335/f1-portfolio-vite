import React from "react";
import { motion } from "framer-motion";

const Podium = () => {
  const galleryItems = [
    {
      image:
        "https://images.unsplash.com/photo-1549490349-8643362847b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Project Alpha: Full-Stack MVP",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      caption: "ML Model Deployment",
    },
    {
      image:
        "https://images.unsplash.com/photo-1520085601670-ee14aa5fa386?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      caption: "Hackathon Winner",
    },
    {
      image:
        "https://images.unsplash.com/photo-1550009159-d89000a68d09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Open Source Contribution",
    },
  ];

  return (
    <section className="section" id="podium">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Podium Moments
        </motion.h2>

        <motion.p
          className="tagline"
          style={{ textAlign: "center", marginBottom: "3rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A gallery showcasing key projects and achievements.
        </motion.p>

        <div className="podium-gallery">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className={`gallery-item ${
                index === 0 || index === 3 ? "wide" : ""
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.img
                src={item.image}
                alt={item.caption}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                className="gallery-caption"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.caption}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Podium;
