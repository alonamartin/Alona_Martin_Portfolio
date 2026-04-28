import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="section">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: 'spring', damping: 20 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <GraduationCap className="text-accent" size={32} />
          </motion.div>
          <h2 style={{ margin: 0 }}>Education</h2>
        </div>
        
        <motion.div 
          whileHover={{ 
            y: -10,
            boxShadow: "0px 20px 40px rgba(59, 130, 246, 0.2)",
            borderColor: "rgba(59, 130, 246, 0.4)"
          }}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            backdropFilter: 'blur(10px)'
          }}
          className="education-card"
        >
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              background: 'var(--accent-blue)',
            }}
          ></motion.div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Rajagiri Higher Secondary School
          </h3>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Kalamassery
          </p>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontSize: '0.875rem',
              color: 'var(--text-muted)'
            }}
          >
            <Calendar size={16} className="text-accent" />
            2014 – Present
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Education;
