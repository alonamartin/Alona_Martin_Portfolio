import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section" style={{ textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Mail className="text-accent" size={32} />
          <h2 style={{ margin: 0 }}>Get In Touch</h2>
        </div>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem auto' }}>
          Feel free to reach out if you share an interest in science, have a cool project, or just want to say hello!
        </p>

        <a 
          href="mailto:alonamartinthayyil@gmail.com"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'var(--accent-blue)',
            color: '#fff',
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            fontSize: '1.125rem',
            fontWeight: 500,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.5)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 40px -10px rgba(59, 130, 246, 0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(59, 130, 246, 0.5)';
          }}
        >
          <Send size={20} />
          alonamartinthayyil@gmail.com
        </a>
      </motion.div>
    </section>
  );
};

export default Contact;
