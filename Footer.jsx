import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '2rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      marginTop: '4rem',
      color: 'var(--text-muted)',
      fontSize: '0.875rem'
    }}>
      <p>&copy; {new Date().getFullYear()} Alona Martin. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
