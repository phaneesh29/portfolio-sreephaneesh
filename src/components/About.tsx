"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Layout,
    Server,
    Terminal,
    Cpu,
    Bot,
    Blocks
} from "lucide-react";

export default function About() {
    const skills = [
        { name: "Languages", icon: <Code2 className="text-blue-400" />, items: ["C", "Python", "JavaScript", "TypeScript"] },
        { name: "Frontend", icon: <Layout className="text-pink-400" />, items: ["ReactJS", "Next.js", "Tailwind CSS", "HTML/CSS", "Framer Motion"] },
        { name: "Backend", icon: <Server className="text-green-400" />, items: ["NodeJS", "Express", "Socket.io", "WebSockets", "WebRTC"] },
        { name: "Database", icon: <Database className="text-yellow-400" />, items: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"] },
        { name: "Tools", icon: <Terminal className="text-purple-400" />, items: ["Git", "Linux", "VS Code", "Vercel", "Gemini API"] },
        { name: "Core", icon: <Cpu className="text-red-400" />, items: ["DSA", "OOPs", "OS", "CN"] },
    ];

    const interests = [
        {
            icon: <Bot className="w-8 h-8" />,
            title: "AI Agents",
            description: "Building autonomous AI agents that can reason, plan, and execute complex tasks — from code generation to research workflows.",
            gradient: "from-violet-500 to-fuchsia-500"
        },
        {
            icon: <Blocks className="w-8 h-8" />,
            title: "Model Context Protocol (MCP)",
            description: "Exploring MCP to connect AI models with external tools, APIs, and data sources — enabling richer, context-aware AI applications.",
            gradient: "from-cyan-500 to-blue-500"
        }
    ];

    return (
        <section id="about" className="py-20 bg-black/30 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 mb-12">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            I am a Computer Science enthusiast currently pursuing my B.Tech in CSE (AI &amp; ML) at PES University.
                            I have a strong foundation in <span className="text-white font-semibold">Data Structures and Algorithms</span> and full-stack development.
                            My passion lies in building scalable web applications and exploring the intersection of AI and software engineering.
                            I&apos;m deeply interested in <span className="text-white font-semibold">AI Agents</span> and the <span className="text-white font-semibold">Model Context Protocol (MCP)</span> — building systems where AI can autonomously interact with tools and data sources.
                        </p>
                    </div>

                    {/* AI Interests Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {interests.map((interest, index) => (
                            <motion.div
                                key={interest.title}
                                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="group relative bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${interest.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                <div className="relative z-10">
                                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${interest.gradient} mb-4`}>
                                        <span className="text-white">{interest.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{interest.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{interest.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Skills Grid */}
                    <h3 className="text-2xl font-bold mb-6 text-center text-gray-200">Skills &amp; Technologies</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-purple-500/50 transition-colors"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-white/5 rounded-lg">
                                        {skill.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skill.items.map((item) => (
                                        <span key={item} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
