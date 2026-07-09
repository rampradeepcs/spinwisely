"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, Float } from "@react-three/drei";
import { useRef, type RefObject } from "react";
import * as THREE from "three";

const BRAND = "#ed3237";

/* Reusable materials */
function metal(color: string, roughness = 0.35, metalness = 0.9) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

/** Procedural servo motor + drive controller — the SpinLyfeX MAXX assembly. */
function ServoAssembly({ progress }: { progress: RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  const bodyMat = metal("#54555d", 0.34, 0.92);
  const darkMat = metal("#2c2d33", 0.5, 0.8);
  const shaftMat = metal("#dfe2e8", 0.12, 1);
  const finMat = metal("#5f606a", 0.42, 0.85);
  const brandMat = new THREE.MeshStandardMaterial({
    color: BRAND,
    roughness: 0.3,
    metalness: 0.4,
    emissive: new THREE.Color(BRAND),
    emissiveIntensity: 0.35,
  });

  useFrame((state, delta) => {
    const p = progress.current ?? 0;
    if (!group.current || !inner.current) return;

    // Scroll-driven rotation + a gentle idle spin (rests at a 3/4 hero angle)
    const targetRotY = 0.6 + p * Math.PI * 2.1 + state.clock.elapsedTime * 0.1;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetRotY,
      6,
      delta,
    );
    // Tilt reveals the front flange as you scroll
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      -0.18 + p * 0.5,
      5,
      delta,
    );

    // Zoom: assembly scales up subtly, controller separates from motor
    const s = 0.82 + p * 0.34;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 5, delta));
    inner.current.position.x = THREE.MathUtils.damp(
      inner.current.position.x,
      p * 1.4,
      5,
      delta,
    );
  });

  return (
    <group ref={group} rotation={[-0.18, 0.6, 0]} position={[0, -0.55, 0]} scale={0.82}>
      {/* ---- Servo motor ---- */}
      <group position={[-0.9, 0, 0]}>
        {/* main cylindrical body */}
        <mesh material={bodyMat} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.72, 0.72, 2.2, 48]} />
        </mesh>
        {/* cooling ridges */}
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh
            key={i}
            material={darkMat}
            position={[-0.9 + i * 0.22, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <torusGeometry args={[0.73, 0.02, 8, 40]} />
          </mesh>
        ))}
        {/* front flange (square mounting plate) */}
        <mesh material={darkMat} position={[1.16, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <boxGeometry args={[0.16, 1.7, 1.7]} />
        </mesh>
        <mesh material={bodyMat} position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.55, 0.62, 0.28, 40]} />
        </mesh>
        {/* shaft */}
        <mesh material={shaftMat} position={[1.7, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.7, 24]} />
        </mesh>
        {/* mounting bolts on flange */}
        {[
          [0.62, 0.62],
          [-0.62, 0.62],
          [0.62, -0.62],
          [-0.62, -0.62],
        ].map(([y, z], i) => (
          <mesh key={i} material={shaftMat} position={[1.22, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.2, 12]} />
          </mesh>
        ))}
        {/* rear terminal box */}
        <mesh material={darkMat} position={[-0.7, 0.72, 0]} castShadow>
          <boxGeometry args={[0.6, 0.35, 0.5]} />
        </mesh>
        {/* brand ring accent */}
        <mesh material={brandMat} position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.74, 0.045, 12, 48]} />
        </mesh>
      </group>

      {/* ---- Drive / motion controller (separates on scroll) ---- */}
      <group ref={inner} position={[1.5, 0.05, 0]}>
        <mesh material={finMat} castShadow>
          <boxGeometry args={[0.7, 2.0, 0.95]} />
        </mesh>
        {/* heat-sink fins */}
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} material={darkMat} position={[-0.36, 0, -0.4 + i * 0.13]}>
            <boxGeometry args={[0.06, 1.9, 0.05]} />
          </mesh>
        ))}
        {/* HMI face plate */}
        <mesh material={new THREE.MeshStandardMaterial({ color: "#0c0c0f", roughness: 0.2, metalness: 0.3 })} position={[0.37, 0.35, 0]}>
          <boxGeometry args={[0.04, 0.9, 0.62] as [number, number, number]} />
        </mesh>
        {/* HMI screen glow */}
        <mesh position={[0.4, 0.4, 0]}>
          <planeGeometry args={[0.5, 0.34]} />
          <meshStandardMaterial
            color={"#0a2a3a"}
            emissive={new THREE.Color("#1a9fd4")}
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* brand strip */}
        <mesh material={brandMat} position={[0.37, -0.85, 0]}>
          <boxGeometry args={[0.05, 0.12, 0.7]} />
        </mesh>
        {/* connectors */}
        {[-0.6, -0.4, -0.2].map((y, i) => (
          <mesh key={i} material={metal("#4a7d3a", 0.6, 0.4)} position={[0.37, y, 0]}>
            <boxGeometry args={[0.06, 0.12, 0.5]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Rig({ progress }: { progress: RefObject<number> }) {
  useFrame((state, delta) => {
    const p = progress.current ?? 0;
    // dolly camera in slightly as user scrolls
    const targetZ = 8.4 - p * 1.9;
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 4, delta);
    // subtle parallax to pointer
    const px = state.pointer.x * 0.4;
    const py = state.pointer.y * 0.25;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, px, 3, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 0.2 + py, 3, delta);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene({ progress }: { progress: RefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.2, 8.4], fov: 40 }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.35;
      }}
    >
      {/* Lights */}
      <ambientLight intensity={0.7} />
      <spotLight
        position={[6, 8, 6]}
        angle={0.5}
        penumbra={1}
        intensity={3.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#ffffff"
      />
      <directionalLight position={[-4, 3, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-6, -2, -4]} intensity={2.2} color={BRAND} />
      <pointLight position={[4, -3, 4]} intensity={1.2} color="#8ec5ff" />
      <pointLight position={[0, 4, 3]} intensity={1} color="#ffffff" />

      <Rig progress={progress} />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <ServoAssembly progress={progress} />
      </Float>

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.5}
        scale={12}
        blur={2.6}
        far={4}
        color="#000000"
      />

      {/* Procedural environment (no network fetch) for metal reflections */}
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 4, -6]} scale={[12, 8, 1]} color="#ffffff" />
        <Lightformer intensity={2} position={[-5, 1, 2]} scale={[8, 8, 1]} color="#ff8a8d" />
        <Lightformer intensity={1.6} position={[5, -2, 3]} scale={[8, 8, 1]} color="#9cc9ff" />
        <Lightformer intensity={1.4} position={[0, 5, 3]} scale={[10, 3, 1]} color="#ffffff" />
        <Lightformer intensity={1} position={[0, -5, 1]} scale={[12, 5, 1]} color="#55555f" />
      </Environment>
    </Canvas>
  );
}
