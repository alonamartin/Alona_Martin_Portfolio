import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '0.75rem 2rem' : '1.5rem 2rem',
        background: scrolled || isOpen ? 'rgba(11, 14, 20, 0.95)' : 'transparent',
        backdropFilter: scrolled || isOpen ? 'blur(15px)' : 'none',
        borderBottom: scrolled || isOpen ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        transition: 'all 0.4s ease',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-heading)', cursor: 'pointer' }}
        className="gradient-text"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          style={{ cursor: 'pointer' }}
        ><motion.div
  whileHover={{ scale: 1.1 }}
  style={{
    cursor: 'pointer',
    height: '55px',
    width: '55px',
    borderRadius: '50%',
    overflow: 'hidden',                 // keeps circle fixed
    border: '2px solid rgba(120,150,255,0.6)',
    boxShadow: '0 0 12px rgba(120,150,255,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <img
    src="/logo.png"
    alt="Logo"
    style={{
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      transform: 'scale(1.6)'          // zoom only the image
    }}
  />
</motion.div>

        </motion.div>      </motion.div>

      {/* Desktop Menu */}
      <ul className="desktop-menu" style={{
        display: 'flex',
        listStyle: 'none',
        gap: '2.5rem',
        margin: 0,
        padding: 0
      }}>
        {navLinks.map((link, index) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
          >
            <motion.a
              href={link.href}
              whileHover={{ scale: 1.1, color: 'var(--accent-blue)' }}
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
              }}
            >
              {link.name}
            </motion.a>
          </motion.li>
        ))}
      </ul>

      {/* Mobile Toggle */}
      <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(11, 14, 20, 0.98)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden'
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-muted)' }}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 992px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
