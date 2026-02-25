"use client";

import React, { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import * as THREE from "three";

const DataNetwork = ({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) => {
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    const { points, colors, lines } = useMemo(() => {
        const numPoints = 250;
        const maxRadius = 2.4;
        const pts: THREE.Vector3[] = [];

        // Generate points inside sphere
        for (let i = 0; i < numPoints; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = Math.cbrt(Math.random()) * maxRadius;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            pts.push(new THREE.Vector3(x, y, z));
        }

        const pointPositions = new Float32Array(numPoints * 3);
        const pointColors = new Float32Array(numPoints * 3);
        const color1 = new THREE.Color("#2dd4bf"); // Teal
        const color2 = new THREE.Color("#818cf8"); // Indigo
        const color3 = new THREE.Color("#c084fc"); // Purple

        pts.forEach((p, i) => {
            pointPositions[i * 3] = p.x;
            pointPositions[i * 3 + 1] = p.y;
            pointPositions[i * 3 + 2] = p.z;

            // Mix colors based on position
            const mixRatio = (p.y / maxRadius + 1) / 2;
            const mixedColor = mixRatio > 0.5
                ? color2.clone().lerp(color1, (mixRatio - 0.5) * 2)
                : color3.clone().lerp(color2, mixRatio * 2);

            pointColors[i * 3] = mixedColor.r;
            pointColors[i * 3 + 1] = mixedColor.g;
            pointColors[i * 3 + 2] = mixedColor.b;
        });

        // Generate connections between nearby points
        const linePositions: number[] = [];
        const connectionDistance = 0.9;

        for (let i = 0; i < numPoints; i++) {
            for (let j = i + 1; j < numPoints; j++) {
                const dist = pts[i].distanceTo(pts[j]);
                if (dist < connectionDistance) {
                    linePositions.push(
                        pts[i].x, pts[i].y, pts[i].z,
                        pts[j].x, pts[j].y, pts[j].z
                    );
                }
            }
        }

        return {
            points: pointPositions,
            colors: pointColors,
            lines: new Float32Array(linePositions)
        };
    }, []);

    const targetRotation = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        timeRef.current += delta;
        targetRotation.current.y = mouse.current.x * 0.5;
        targetRotation.current.x = mouse.current.y * 0.2;

        if (groupRef.current) {
            // Smooth rotation towards mouse
            groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
            groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;

            // Constant slow spin
            groupRef.current.rotation.y += 0.002;
            groupRef.current.rotation.z += 0.001;

            // Subtle floating effect
            groupRef.current.position.y = Math.sin(timeRef.current * 0.5) * 0.1;
        }

        if (glowRef.current) {
            const pulse = 2.45 + Math.sin(timeRef.current * 1.5) * 0.05;
            glowRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Connection Lines */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[lines, 3]} itemSize={3} count={lines.length / 3} array={lines} />
                </bufferGeometry>
                <lineBasicMaterial color="#818cf8" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </lineSegments>

            {/* Network Nodes (Particles) */}
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[points, 3]} itemSize={3} count={points.length / 3} array={points} />
                    <bufferAttribute attach="attributes-color" args={[colors, 3]} itemSize={3} count={colors.length / 3} array={colors} />
                </bufferGeometry>
                <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} sizeAttenuation={true} />
            </points>

            {/* Dense Central Core */}
            <mesh>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshBasicMaterial color="#c084fc" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Outer Atmospheric Glow */}
            <Sphere ref={glowRef} args={[1, 64, 64]} scale={2.45}>
                <meshBasicMaterial color="#2dd4bf" transparent opacity={0.02} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
            </Sphere>
        </group>
    );
};

export default function Hero() {
    const mouseRef = useRef({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }, []);

    return (
        <section
            id="hero"
            className="relative w-full h-screen mx-auto flex items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* 3D Globe */}
            <div className="absolute right-[-10%] top-0 h-full w-full md:w-[65%] z-10 opacity-60 md:opacity-100 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5.8], fov: 45 }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                    <pointLight position={[-4, 2, 4]} intensity={0.8} color="#2dd4bf" />
                    <DataNetwork mouse={mouseRef} />
                </Canvas>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col justify-center h-full w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-sm md:text-base font-mono text-purple-400 mb-4 tracking-wider"
                    >
                        &#47;&#47; Welcome to my portfolio
                    </motion.p>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                        Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500">Sreephaneesha</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                        A passionate <span className="font-semibold text-white">Full Stack Developer</span> and <span className="font-semibold text-white">AI/ML Enthusiast</span>.
                        Building digital experiences that merge creativity with technology.
                    </p>

                    <div className="flex gap-4">
                        <a
                            href="/resume/resume_sreephaneesha.pdf"
                            download
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 px-6 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            <span className="mr-2">Download Resume</span>
                            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:border-white/30"
                        >
                            Contact Me
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
