import React from 'react';
import { motion } from 'framer-motion';
import { Code, Languages, Mic, Cpu, Music, Play, Palette, PenIcon } from 'lucide-react';
import RubiksCube from "./RubiksCube";
import PianoKeyboard from "./PianoKeyboard";
const Skills = () => {
  const skills = [
    { name: "Public Speaking", icon: <Mic size={18} /> },
    { name: "Web Designing", icon: <Code size={18} /> },
    { name: "Cube Solving", icon: <Cpu size={18} /> },
    { name: "Keyboard", icon: <Music size={18} /> },
    { name: "Dancing", icon: <Play size={18} /> },
    { name: "Creative Writing", icon: <PenIcon size={18} /> }
  ];
  

  const languages = [
    { name: "English", code: "EN" },
    { name: "French", code: "FR" },
    { name: "Malayalam", code: "ML" },
    { name: "Hindi", code: "HI" }  
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="section" style={{ overflow: 'hidden' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '4rem', 
        alignItems: 'center' 
      }} className="skills-grid-container">
        
        <style>
          {`
            @media (min-width: 1024px) {
              .skills-grid-container {
                grid-template-columns: 1fr 300px !important; 
              }
            }
          `}
        </style>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Skills & Interests</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {skills.map((skill, idx) => (
                <motion.div key={idx} variants={itemVariants} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--accent-blue)' }}>{skill.icon}</span>
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Languages</h2>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {languages.map((lang, idx) => (
                <motion.div key={idx} variants={itemVariants} style={{ background: 'rgba(249, 115, 22, 0.05)', padding: '1.5rem', borderRadius: '16px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--accent-orange)' }}>{lang.code}</div>
                  <div>{lang.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '16px', 
          width: '100%',
          maxWidth: '300px', 
          margin: '0 auto'
        }}>
          <div style={{ width: '100%' }}>
            <RubiksCube />
          </div>

          <div style={{ 
            width: '100%', 
            transform: 'scale(0.75)', 
            transformOrigin: 'top center',
            marginTop: '-30px' 
          }}>
            <PianoKeyboard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;