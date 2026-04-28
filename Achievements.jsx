import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    "Cultural Champion – HS '25",
    "General Proficiency Winner (2017–19) and (2022-2025)",
    "District Level Kalolsavam – Hindi Recitation A Grade",
    "USS'24 Scholarship Winner",
    "Attendee - WebForge 2.0 at RSET ",
    "Rare Gems Contest'26 - Mathrubhumi Consolation Prize Winner "
  ];

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 15 }
    }
  };

  return (
    <section id="achievements" className="section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Trophy className="text-orange" size={32} />
          </motion.div>
          <h2 style={{ margin: 0 }}>Achievements & Experience</h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                borderColor: "rgba(249, 115, 22, 0.3)"
              }}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                transition: 'all 0.3s ease',
                cursor: 'default',
                backdropFilter: 'blur(5px)'
              }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'rgba(249, 115, 22, 0.1)',
                  padding: '0.5rem',
                  borderRadius: '10px',
                  color: 'var(--accent-orange)',
                  flexShrink: 0
                }}
              >
                <Star size={20} />
              </motion.div>
              <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.5', color: 'var(--text-main)' }}>
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Achievements;
