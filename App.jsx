import React from 'react';
import Starfield from './components/Starfield';
import PeriodicBackground from './components/PeriodicBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Starfield />
      <PeriodicBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Achievements />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
