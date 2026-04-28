import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Atom } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      id="home" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
        paddingTop: '80px'
      }}
    >

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 10, maxWidth: '800px', padding: '0 2rem' }}
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            marginBottom: '2rem',
            color: 'var(--accent-blue)',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500
          }}
        >
          <Atom size={16} /> Student | Science Enthusiast
        </motion.div>

        <h1 style={{ marginBottom: '1.5rem' }}>
          Hello, I'm <span className="gradient-accent">Alona Martin</span>
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-muted)', 
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          Exploring the universe through curiosity, science, and continuous learning.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <a 
            href="#about"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-muted)'
            }}
          >
            <span style={{ fontSize: '0.875rem' }}>Discover more</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
