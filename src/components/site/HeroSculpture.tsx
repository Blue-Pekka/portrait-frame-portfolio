import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, PresentationControls, RoundedBox } from "@react-three/drei";
import type { Group } from "three";

const METAL = { color: "#ff4b17", metalness: 1, roughness: 0.14, envMapIntensity: 1.6 } as const;

function Sculpture({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const inner = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current || !inner.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.6 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-y * 0.35 - group.current.rotation.x) * 0.05;
    if (!reduced) {
      inner.current.rotation.y += delta * 0.18;
      inner.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        {/* Core: a thick knotted conduit */}
        <mesh castShadow>
          <torusKnotGeometry args={[0.95, 0.3, 220, 36, 2, 3]} />
          <meshStandardMaterial {...METAL} />
        </mesh>
        {/* Gimbal rings */}
        <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[1.75, 0.045, 24, 160]} />
          <meshStandardMaterial {...METAL} color="#111111" roughness={0.2} />
        </mesh>
        <mesh rotation={[0.2, Math.PI / 2.2, 0.6]}>
          <torusGeometry args={[1.95, 0.025, 16, 160]} />
          <meshStandardMaterial {...METAL} color="#d9d9d9" roughness={0.1} />
        </mesh>
        {/* Machined plates — the "robotic" read */}
        <RoundedBox args={[0.9, 0.18, 0.55]} radius={0.06} smoothness={6} position={[1.35, 0.55, 0.2]} rotation={[0.4, 0.2, -0.6]}>
          <meshStandardMaterial {...METAL} />
        </RoundedBox>
        <RoundedBox args={[0.6, 0.6, 0.16]} radius={0.06} smoothness={6} position={[-1.3, -0.65, 0.35]} rotation={[0.3, 0.8, 0.4]}>
          <meshStandardMaterial {...METAL} />
        </RoundedBox>
        <RoundedBox args={[0.32, 1.1, 0.32]} radius={0.08} smoothness={6} position={[-0.2, 1.45, -0.3]} rotation={[0.2, 0, 0.9]}>
          <meshStandardMaterial {...METAL} color="#1a1a1a" roughness={0.25} />
        </RoundedBox>
        <mesh position={[0.9, -1.2, 0.5]}>
          <sphereGeometry args={[0.22, 48, 48]} />
          <meshStandardMaterial {...METAL} color="#e8e8e8" roughness={0.05} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroSculpture({ onContextLost }: { onContextLost?: () => void } = {}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full" data-cursor="Drag">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            onContextLost?.();
          });
        }}
        fallback={null}
        aria-label="Interactive 3D sculpture — drag to rotate"
        role="img"
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <PresentationControls global={false} cursor={false} snap polar={[-0.5, 0.5]} azimuth={[-1, 1]} speed={1.4}>
          <Float speed={reduced ? 0 : 1.6} rotationIntensity={reduced ? 0 : 0.35} floatIntensity={reduced ? 0 : 0.8}>
            <Sculpture reduced={reduced} />
          </Float>
        </PresentationControls>
        {/* Studio light strips → crisp black/white reflections like brushed chrome */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={4} position={[0, 4, -6]} scale={[12, 1.2, 1]} />
          <Lightformer form="rect" intensity={3} position={[-5, 1, -2]} rotation-y={Math.PI / 2} scale={[8, 0.6, 1]} />
          <Lightformer form="rect" intensity={3} position={[5, -1, -2]} rotation-y={-Math.PI / 2} scale={[8, 0.9, 1]} />
          <Lightformer form="rect" intensity={2} position={[0, -4, 3]} rotation-x={Math.PI / 2} scale={[10, 0.5, 1]} />
          <Lightformer form="ring" color="#ffb08a" intensity={2} position={[2, 2, 5]} scale={2} />
        </Environment>
      </Canvas>
    </div>
  );
}
