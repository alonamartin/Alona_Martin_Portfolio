import React, { useEffect, useRef } from 'react';

const ELEMENTS = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Fe', 'Ni', 'Cu', 'Zn', 'Ag', 'Au', 'Hg', 'Pb', 'U'];

const COLORS = [
  '0, 242, 255', // Light Blue
  '188, 19, 254', // Purplish
];

const PeriodicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
        // Start at random y positions
        this.y = Math.random() * height;
        
      }

      reset() {
        this.symbol = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
        this.size = 30 + Math.random() * 10; // Box size
        this.x = Math.random() * width;
        this.y = height + this.size; // Start below bottom
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = - (Math.random() * 0.5 + 0.2); // Upward movement
        this.colorBase = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.opacity = 0.05 + Math.random() * 0.1; // More transparent
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Reset if moved off top
        if (this.y + this.size < 0) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.colorBase}, 0.3)`;

        // Draw Box
        ctx.strokeStyle = `rgba(${this.colorBase}, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);

        // Symbol Text
        ctx.fillStyle = `rgba(${this.colorBase}, ${this.opacity + 0.2})`;
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, this.x, this.y);

        ctx.restore();
      }
    }

    const particles = Array.from({ length: 20 }, () => new Particle());

    const render = () => {
      ctx.fillStyle = 'rgba(10, 10, 12, 0.15)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8
      }}
    />
  );
};

export default PeriodicBackground;