import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count, animate }: { count: number; animate: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1)
      a.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)], i * 3)
    }
    return a
  }, [count])
  useFrame((_, d) => { if (animate && ref.current) ref.current.rotation.y += d * 0.03 })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={0.03} color="#00CFFF" transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Rig({ children, animate }: { children: React.ReactNode; animate: boolean }) {
  const g = useRef<THREE.Group>(null)
  useFrame(({ pointer }, d) => {
    if (!g.current) return
    const k = 1 - Math.exp(-4 * d)
    g.current.rotation.y = THREE.MathUtils.lerp(g.current.rotation.y, animate ? pointer.x * 0.4 : 0, k)
    g.current.rotation.x = THREE.MathUtils.lerp(g.current.rotation.x, animate ? -pointer.y * 0.25 : 0, k)
  })
  return <group ref={g}>{children}</group>
}

function Planet({ animate, low }: { animate: boolean; low: boolean }) {
  const core = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.Mesh>(null)
  const r1 = useRef<THREE.Mesh>(null)
  const r2 = useRef<THREE.Mesh>(null)
  useFrame((_, d) => {
    if (!animate) return
    if (core.current) core.current.rotation.y += d * 0.15
    if (wire.current) wire.current.rotation.y -= d * 0.1
    if (r1.current) r1.current.rotation.z += d * 0.25
    if (r2.current) r2.current.rotation.z -= d * 0.18
  })
  const seg = low ? 32 : 64
  return (
    <Float speed={animate ? 1.4 : 0} floatIntensity={0.6} rotationIntensity={0.15}>
      <Sphere ref={core} args={[1.5, seg, seg]}>
        <MeshDistortMaterial color="#11142A" emissive="#7955FF" emissiveIntensity={0.35} roughness={0.4} metalness={0.6} distort={animate ? 0.18 : 0} speed={1.2} />
      </Sphere>
      <mesh ref={wire}><icosahedronGeometry args={[1.62, low ? 2 : 3]} /><meshBasicMaterial color="#00CFFF" wireframe transparent opacity={0.22} /></mesh>
      <mesh ref={r1} rotation={[Math.PI / 2.4, 0.3, 0]}><torusGeometry args={[2.3, 0.012, 8, 160]} /><meshBasicMaterial color="#7955FF" /></mesh>
      <mesh ref={r2} rotation={[Math.PI / 2.1, -0.5, 0.4]}><torusGeometry args={[2.8, 0.01, 8, 160]} /><meshBasicMaterial color="#00CFFF" transparent opacity={0.8} /></mesh>
    </Float>
  )
}

export default function HeroScene({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={mobile ? [1, 1.25] : [1, 2]} frameloop={reduced ? 'demand' : 'always'} gl={{ antialias: !mobile, powerPreference: 'high-performance' }} aria-hidden="true">
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#00CFFF" />
      <pointLight position={[-4, -2, 3]} intensity={40} color="#7955FF" />
      <Rig animate={!reduced && !mobile}>
        <Planet animate={!reduced} low={mobile} />
        <Particles count={mobile ? 250 : 900} animate={!reduced} />
      </Rig>
    </Canvas>
  )
}
