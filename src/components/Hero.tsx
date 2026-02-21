"use client";

import React, { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import * as THREE from "three";

// Create Earth texture on a canvas — blue oceans, green land
function createEarthTexture(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    // Ocean gradient
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGrad.addColorStop(0, "#0c2d6b");
    oceanGrad.addColorStop(0.3, "#1a4a8a");
    oceanGrad.addColorStop(0.5, "#1565C0");
    oceanGrad.addColorStop(0.7, "#1a4a8a");
    oceanGrad.addColorStop(1, "#0c2d6b");
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Helper to draw landmass from lat/lng coords
    const drawLand = (coords: number[][], color: string, stroke?: string) => {
        ctx.beginPath();
        coords.forEach(([lat, lng], i) => {
            const x = ((lng + 180) / 360) * canvas.width;
            const y = ((90 - lat) / 180) * canvas.height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        if (stroke) {
            ctx.strokeStyle = stroke;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    };

    // Continent definitions (lat, lng pairs)
    // North America
    drawLand([
        [72, -168], [70, -140], [68, -130], [60, -140], [58, -152], [55, -165],
        [55, -130], [50, -128], [48, -123], [45, -124], [40, -124], [35, -120],
        [32, -117], [28, -115], [25, -110], [22, -105], [18, -97], [16, -90],
        [15, -87], [18, -88], [20, -87], [22, -85], [20, -90], [25, -80],
        [30, -82], [32, -80], [35, -75], [38, -75], [40, -74], [42, -70],
        [44, -67], [47, -65], [46, -60], [48, -56], [50, -56], [52, -56],
        [55, -60], [58, -62], [62, -64], [65, -60], [68, -55], [72, -60],
        [75, -70], [78, -75], [80, -85], [80, -100], [76, -120], [73, -140],
        [72, -168],
    ], "#2E7D32", "#1B5E20");

    // Greenland
    drawLand([
        [78, -72], [80, -60], [82, -45], [83, -35], [82, -20], [78, -18],
        [76, -20], [72, -22], [70, -25], [68, -30], [65, -38], [62, -42],
        [62, -48], [64, -52], [68, -55], [72, -56], [76, -60], [78, -72],
    ], "#388E3C", "#2E7D32");

    // Central America
    drawLand([
        [18, -97], [16, -96], [15, -92], [14, -90], [12, -87], [10, -84],
        [9, -80], [8, -77], [10, -77], [10, -83], [12, -85], [14, -88],
        [16, -90], [18, -97],
    ], "#388E3C", "#2E7D32");

    // South America
    drawLand([
        [10, -75], [8, -72], [6, -68], [5, -60], [2, -52], [0, -50],
        [-2, -45], [-5, -38], [-8, -35], [-12, -38], [-15, -40], [-18, -40],
        [-22, -42], [-23, -45], [-28, -48], [-32, -52], [-35, -55], [-38, -58],
        [-42, -62], [-46, -66], [-50, -70], [-52, -72], [-54, -70], [-55, -66],
        [-53, -60], [-48, -58], [-42, -60], [-38, -56], [-35, -54], [-30, -50],
        [-25, -48], [-22, -42], [-18, -40], [-12, -77], [-8, -79], [-5, -80],
        [0, -80], [5, -77], [10, -75],
    ], "#2E7D32", "#1B5E20");

    // Europe
    drawLand([
        [70, 28], [68, 15], [65, 12], [60, 5], [58, 8], [56, 8],
        [54, 6], [52, 4], [50, 2], [48, -4], [46, -1], [44, -8],
        [42, -9], [38, -9], [36, -6], [36, 0], [38, 0], [40, 0],
        [42, 3], [44, 8], [45, 12], [44, 15], [42, 15], [40, 20],
        [38, 22], [36, 22], [38, 25], [40, 25], [42, 28], [44, 28],
        [46, 15], [48, 15], [50, 18], [52, 14], [54, 14], [55, 12],
        [56, 16], [58, 18], [60, 20], [62, 18], [63, 20], [65, 25],
        [68, 26], [70, 28],
    ], "#388E3C", "#2E7D32");

    // Scandinavia
    drawLand([
        [58, 5], [60, 5], [62, 5], [65, 12], [68, 15], [70, 20],
        [72, 25], [72, 28], [70, 30], [65, 25], [62, 18], [60, 18],
        [58, 12], [58, 5],
    ], "#43A047", "#2E7D32");

    // Africa
    drawLand([
        [37, -5], [35, -2], [35, 10], [32, 10], [30, 32], [25, 35],
        [20, 38], [15, 42], [12, 44], [10, 42], [5, 42], [2, 42],
        [0, 42], [-5, 40], [-10, 40], [-15, 38], [-20, 35], [-25, 33],
        [-28, 32], [-32, 28], [-35, 20], [-34, 18], [-30, 17], [-25, 15],
        [-20, 12], [-15, 12], [-10, 14], [-5, 10], [0, 10], [5, 2],
        [5, -5], [8, -10], [10, -15], [15, -17], [18, -16], [22, -16],
        [25, -15], [30, -10], [33, -8], [36, -5], [37, -5],
    ], "#2E7D32", "#1B5E20");

    // Asia (main block)
    drawLand([
        [70, 28], [68, 40], [65, 50], [62, 60], [60, 65], [55, 68],
        [50, 70], [48, 68], [45, 65], [42, 60], [40, 55], [38, 48],
        [35, 45], [30, 48], [28, 55], [25, 58], [22, 60], [18, 62],
        [15, 68], [12, 72], [10, 76], [8, 78], [5, 80], [2, 95],
        [1, 104], [-2, 106], [-5, 106], [-8, 110], [-7, 115], [-5, 118],
        [0, 118], [5, 120], [10, 120], [15, 121], [18, 115], [22, 108],
        [25, 105], [28, 100], [30, 96], [25, 92], [22, 88], [22, 85],
        [25, 82], [28, 78], [30, 75], [35, 70], [38, 65], [40, 60],
        [42, 55], [45, 55], [48, 55], [50, 60], [55, 72], [58, 80],
        [60, 90], [62, 100], [65, 110], [68, 120], [70, 130], [70, 140],
        [68, 150], [65, 160], [63, 170], [66, 177], [70, 178], [72, 170],
        [70, 140], [72, 120], [73, 100], [75, 80], [73, 60], [72, 40],
        [70, 28],
    ], "#388E3C", "#2E7D32");

    // India (distinct)
    drawLand([
        [30, 75], [28, 72], [25, 70], [22, 72], [20, 73], [18, 73],
        [15, 75], [12, 76], [10, 77], [8, 77], [8, 78], [10, 80],
        [15, 80], [18, 83], [20, 85], [22, 88], [25, 90], [28, 85],
        [30, 80], [32, 78], [35, 75], [30, 75],
    ], "#4CAF50", "#2E7D32");

    // Japan
    drawLand([
        [45, 140], [42, 143], [38, 141], [35, 137], [33, 132], [34, 130],
        [36, 133], [38, 136], [40, 139], [42, 141], [45, 145], [45, 140],
    ], "#43A047", "#2E7D32");

    // Australia
    drawLand([
        [-12, 132], [-14, 126], [-18, 122], [-22, 114], [-25, 114],
        [-28, 115], [-32, 116], [-35, 117], [-35, 120], [-35, 130],
        [-35, 137], [-38, 145], [-37, 148], [-34, 151], [-30, 153],
        [-27, 153], [-24, 150], [-20, 148], [-18, 146], [-16, 145],
        [-14, 142], [-12, 138], [-12, 136], [-12, 132],
    ], "#388E3C", "#2E7D32");

    // Ice caps - North
    drawLand([
        [85, -180], [85, -90], [85, 0], [85, 90], [85, 180],
        [90, 180], [90, 0], [90, -180], [85, -180],
    ], "#c8e6c9", "#a5d6a7");

    // Ice caps - South (Antarctica simplified)
    drawLand([
        [-70, -180], [-75, -120], [-80, -60], [-85, 0], [-80, 60],
        [-75, 120], [-70, 180], [-70, 120], [-68, 60], [-70, 0],
        [-68, -60], [-70, -120], [-70, -180],
    ], "#e8f5e9", "#c8e6c9");

    return canvas;
}

const Globe = ({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) => {
    const globeRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const ringsRef = useRef<THREE.Group>(null);
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

    useEffect(() => {
        const canvas = createEarthTexture();
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        setTexture(tex);
    }, []);

    // Connection arcs from Bengaluru
    const arcs = useMemo(() => {
        const arcData: THREE.BufferGeometry[] = [];
        const connections = [
            [13, 77, 40, -74],
            [13, 77, 51, -0.1],
            [13, 77, 35, 139],
            [13, 77, 37, -122],
        ];
        connections.forEach(([lat1, lng1, lat2, lng2]) => {
            const points: THREE.Vector3[] = [];
            for (let t = 0; t <= 1; t += 0.015) {
                const lat = lat1 + (lat2 - lat1) * t;
                const lng = lng1 + (lng2 - lng1) * t;
                const phi = ((90 - lat) * Math.PI) / 180;
                const theta = ((lng + 180) * Math.PI) / 180;
                const altitude = 2.02 + Math.sin(t * Math.PI) * 0.4;
                points.push(new THREE.Vector3(
                    -altitude * Math.sin(phi) * Math.cos(theta),
                    altitude * Math.cos(phi),
                    altitude * Math.sin(phi) * Math.sin(theta)
                ));
            }
            arcData.push(new THREE.BufferGeometry().setFromPoints(points));
        });
        return arcData;
    }, []);

    // Bengaluru marker
    const bengaluruPos = useMemo(() => {
        const phi = ((90 - 13) * Math.PI) / 180;
        const theta = ((77 + 180) * Math.PI) / 180;
        return new THREE.Vector3(
            -2.04 * Math.sin(phi) * Math.cos(theta),
            2.04 * Math.cos(phi),
            2.04 * Math.sin(phi) * Math.sin(theta)
        );
    }, []);

    const targetRotation = useRef({ x: 0, y: 0 });

    useFrame((state) => {
        targetRotation.current.y = mouse.current.x * 0.6;
        targetRotation.current.x = mouse.current.y * 0.3;

        if (globeRef.current) {
            globeRef.current.rotation.y += (targetRotation.current.y - globeRef.current.rotation.y) * 0.04;
            globeRef.current.rotation.x += (targetRotation.current.x - globeRef.current.rotation.x) * 0.04;
            globeRef.current.rotation.y += 0.0012;
        }
        if (glowRef.current) {
            const pulse = 2.12 + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
            glowRef.current.scale.setScalar(pulse);
        }
        if (ringsRef.current) {
            ringsRef.current.rotation.z += 0.0015;
        }
    });

    return (
        <group>
            <group ref={globeRef}>
                {/* Earth sphere with texture */}
                <Sphere args={[2, 64, 64]}>
                    {texture ? (
                        <meshStandardMaterial
                            map={texture}
                            roughness={0.7}
                            metalness={0.1}
                        />
                    ) : (
                        <meshStandardMaterial color="#1565C0" roughness={0.7} />
                    )}
                </Sphere>

                {/* Atmosphere rim */}
                <Sphere args={[2.02, 64, 64]}>
                    <meshBasicMaterial
                        color="#42A5F5"
                        transparent
                        opacity={0.06}
                    />
                </Sphere>

                {/* Connection arcs */}
                {arcs.map((geo, i) => (
                    <line key={`arc-${i}`} geometry={geo}>
                        <lineBasicMaterial color="#fbbf24" transparent opacity={0.5} />
                    </line>
                ))}

                {/* Bengaluru marker */}
                <mesh position={bengaluruPos}>
                    <sphereGeometry args={[0.04, 16, 16]} />
                    <meshBasicMaterial color="#ef4444" />
                </mesh>
                <mesh position={bengaluruPos}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshBasicMaterial color="#ef4444" transparent opacity={0.3} />
                </mesh>
            </group>

            {/* Atmospheric glow */}
            <Sphere ref={glowRef} args={[1, 64, 64]} scale={2.12}>
                <meshBasicMaterial color="#1E88E5" transparent opacity={0.05} />
            </Sphere>

            {/* Orbiting ring */}
            <group ref={ringsRef}>
                <mesh rotation={[Math.PI / 2.2, 0, 0.15]}>
                    <ringGeometry args={[2.6, 2.62, 128]} />
                    <meshBasicMaterial color="#90CAF9" transparent opacity={0.1} side={THREE.DoubleSide} />
                </mesh>
            </group>
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
            <div className="absolute right-0 top-0 h-full w-full md:w-[55%] z-10 opacity-50 md:opacity-100 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
                    <pointLight position={[-4, 2, 4]} intensity={0.4} color="#64B5F6" />
                    <pointLight position={[3, -2, -3]} intensity={0.3} color="#81C784" />
                    <Globe mouse={mouseRef} />
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
