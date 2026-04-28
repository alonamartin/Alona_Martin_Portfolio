import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, RoundedBox, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ─── Rubik's Cube Standard Colors ────────────────────────────────────────────
const FACE_COLORS = {
  U: '#FFFFFF', // White  – Up
  D: '#FFD500', // Yellow – Down
  F: '#009B48', // Green  – Front
  B: '#0046AD', // Blue   – Back
  L: '#FF5800', // Orange – Left
  R: '#B71234', // Red    – Right
  X: '#1A1A1A', // Black  – internal face (invisible)
};

const Cubie = React.memo(React.forwardRef(function Cubie({ position }, ref) {
  const [px, py, pz] = position;

  // Determine sticker colors. FACE_COLORS.X is black for internal faces.
  const faceColors = useMemo(() => ({
    px: px === 1 ? FACE_COLORS.R : FACE_COLORS.X,
    nx: px === -1 ? FACE_COLORS.L : FACE_COLORS.X,
    py: py === 1 ? FACE_COLORS.U : FACE_COLORS.X,
    ny: py === -1 ? FACE_COLORS.D : FACE_COLORS.X,
    pz: pz === 1 ? FACE_COLORS.F : FACE_COLORS.X,
    nz: pz === -1 ? FACE_COLORS.B : FACE_COLORS.X,
  }), [px, py, pz]);

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.96, 0.96, 0.96]} />
      <meshStandardMaterial attach="material-0" color={faceColors.px} roughness={0.2} metalness={0.1} />
      <meshStandardMaterial attach="material-1" color={faceColors.nx} roughness={0.2} metalness={0.1} />
      <meshStandardMaterial attach="material-2" color={faceColors.py} roughness={0.2} metalness={0.1} />
      <meshStandardMaterial attach="material-3" color={faceColors.ny} roughness={0.2} metalness={0.1} />
      <meshStandardMaterial attach="material-4" color={faceColors.pz} roughness={0.2} metalness={0.1} />
      <meshStandardMaterial attach="material-5" color={faceColors.nz} roughness={0.2} metalness={0.1} />
    </mesh>
  );
}));

// ─── Slow-auto-rotate helper ──────────────────────────────────────────────────
function AutoRotate({ groupRef, enabled }) {
  useFrame((_, delta) => {
    if (enabled && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.15;
    }
  });
  return null;
}

// ─── Core cube group with scramble / solve logic ──────────────────────────────
function CubeScene({ scrambleTrigger, solveTrigger, onStatusChange }) {
  const groupRef = useRef();
  const cubiesRef = useRef([]);
  const isAnimating = useRef(false);
  const moveHistory = useRef([]);
  const [autoRotate, setAutoRotate] = useState(true);

  // 27 cubie positions: x,y,z each ∈ {-1,0,1}
  const positions = useMemo(() => {
    const pos = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++)
          pos.push([x, y, z]);
    return pos;
  }, []);

  // ── Animate one layer rotation ────────────────────────────────────────────
  const animateLayer = useCallback((axis, layer, clockwise, durationMs = 280) => {
    return new Promise(resolve => {
      if (!groupRef.current) { resolve(); return; }

      const angle = (clockwise ? 1 : -1) * (Math.PI / 2);
      const pivot = new THREE.Group();
      groupRef.current.add(pivot);

      // Collect cubies that belong to this layer
      const moving = [];
      cubiesRef.current.forEach(cubie => {
        if (!cubie) return;
        // Use local position to determine if cubie is in the rotating layer
        const coord = Math.round(cubie.position[axis]);
        if (coord === layer) moving.push(cubie);
      });

      moving.forEach(c => pivot.attach(c));

      const startTime = performance.now();
      let rafId;

      const step = (now) => {
        const t = Math.min((now - startTime) / durationMs, 1);
        // easeInOutQuad
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        pivot.rotation[axis] = angle * ease;

        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          pivot.rotation[axis] = angle;
          pivot.updateMatrixWorld();
          moving.forEach(c => {
            groupRef.current.attach(c);
            // Snap position & rotation to nearest integer / 90° to avoid float drift
            c.position.set(
              Math.round(c.position.x),
              Math.round(c.position.y),
              Math.round(c.position.z),
            );
          });
          groupRef.current.remove(pivot);
          resolve();
        }
      };

      rafId = requestAnimationFrame(step);
    });
  }, []);

  // ── Scramble ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (scrambleTrigger === 0) return;
    if (isAnimating.current) return;

    const axes = ['x', 'y', 'z'];
    const layers = [-1, 0, 1];
    const NUM_MOVES = 18;

    const run = async () => {
      isAnimating.current = true;
      setAutoRotate(false);
      onStatusChange('Scrambling…');
      moveHistory.current = [];

      for (let i = 0; i < NUM_MOVES; i++) {
        const axis = axes[Math.floor(Math.random() * 3)];
        const layer = layers[Math.floor(Math.random() * 3)];
        const cw = Math.random() > 0.5;
        moveHistory.current.push({ axis, layer, clockwise: cw });
        await animateLayer(axis, layer, cw, 220);
      }

      onStatusChange('Scrambled');
      isAnimating.current = false;

      // Auto-solve after short pause
      setTimeout(() => solveTrigger.current(), 800);
    };

    run();
  }, [scrambleTrigger]);

  // ── Solve (exposed via ref callback) ─────────────────────────────────────
  useEffect(() => {
    solveTrigger.current = async () => {
      if (isAnimating.current || moveHistory.current.length === 0) return;
      isAnimating.current = true;
      onStatusChange('Solving…');

      const hist = [...moveHistory.current].reverse();
      for (const move of hist) {
        await animateLayer(move.axis, move.layer, !move.clockwise, 260);
      }
      moveHistory.current = [];
      onStatusChange('Solved!');
      isAnimating.current = false;
      setAutoRotate(true);
    };
  });

  return (
    <>
      {/* Lighting ---------------------------------------------------------- */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 12, 8]} intensity={1.4} castShadow />
      <directionalLight position={[-6, -6, -6]} intensity={0.4} />
      <pointLight position={[0, 6, 6]} intensity={0.6} color="#ffffff" />

      {/* The Rubik's Cube -------------------------------------------------- */}
      <group ref={groupRef}>
        {positions.map((pos, idx) => (
          <Cubie
            key={idx}
            position={pos}
            ref={el => { cubiesRef.current[idx] = el; }}
          />
        ))}
      </group>

      {/* Gentle idle auto-rotation */}
      <AutoRotate groupRef={groupRef} enabled={autoRotate} />

      {/* Interactive orbit controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={12}
        enableDamping
        dampingFactor={0.08}
        autoRotate={false}
      />
    </>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────
export default function RubiksCube() {
  const [scrambleTrigger, setScrambleTrigger] = useState(0);
  const [status, setStatus] = useState('Idle');
  const solveRef = useRef(() => { });

  const isBusy = status === 'Scrambling…' || status === 'Solving…';

  return (
    <div style={{ width: '100%', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', height: '100%', cursor: 'grab' }}>
        <Canvas shadows gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[5, 4.5, 5]} fov={45} />
          <CubeScene
            scrambleTrigger={scrambleTrigger}
            solveTrigger={solveRef}
            onStatusChange={setStatus}
          />
        </Canvas>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Status: <span style={{ color: 'var(--accent-orange)' }}>{status}</span>
        </div>
        <button
          disabled={isBusy}
          onClick={() => {
            if (!isBusy) setScrambleTrigger(prev => prev + 1);
          }}
          style={{
            background: 'transparent',
            border: '2px solid var(--card-border)',
            color: 'var(--text-main)',
            padding: '0.8rem 2.5rem',
            borderRadius: '12px',
            cursor: isBusy ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            opacity: isBusy ? 0.5 : 1
          }}
        >
          Scramble
        </button>
      </div>
    </div>
  );
}
