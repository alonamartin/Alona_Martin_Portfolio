import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <motion.div
            initial={{ rotate: -20, opacity: 0 }}
            whileInView={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <BookOpen className="text-orange" size={32} />
          </motion.div>
          <h2 style={{ margin: 0 }}>About Me</h2>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: '3.5rem 3rem',
            maxWidth: '850px',
            margin: '0 auto',
            backdropFilter: 'blur(15px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ repeat: Infinity, duration: 8 }}
            style={{
              position: 'absolute',
              top: '-75px',
              right: '-75px',
              width: '200px',
              height: '200px',
              background: 'var(--accent-orange)',
              filter: 'blur(100px)',
              zIndex: -1
            }}
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '2rem' }}
          >
            I am a 10th grade student with a strong interest in pursuing a career in Physics. I am passionate about Science and Mathematics and enjoy exploring the Periodic Table, scientific concepts and understanding how things work.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}
          >
            I am quick to learn new skills and always eager to take on challenges that help me grow academically and personally.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
