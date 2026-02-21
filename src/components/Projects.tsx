"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Folder, Bot, Brain, MessageSquare, BookOpen, MapPin, CalendarCheck } from "lucide-react";

const projects = [
    {
        title: "Sales Genie — AI SDR Assistant",
        description: "AI-powered Sales Development Rep that automates lead research, personalized email drafting, and follow-up sequences. Built during Yukti Manthan AI Hackathon.",
        tech: ["MERN", "Gemini API", "Tailwind", "AI Automation"],
        link: "https://ai-sdr-black.vercel.app",
        github: "https://github.com/phaneesh29/Sales_Genie",
        icon: <Bot className="w-6 h-6 text-white" />,
        color: "from-violet-500 to-fuchsia-500",
        category: "AI / Full-Stack"
    },
    {
        title: "Work Planner — Task Manager",
        description: "Production-ready task management app with JWT auth, automated email reminders via cron jobs, and a modern dark-themed dashboard.",
        tech: ["Next.js 14", "MongoDB", "JWT", "Nodemailer", "Cron"],
        link: "#",
        github: "https://github.com/phaneesh29/work-planner",
        icon: <CalendarCheck className="w-6 h-6 text-white" />,
        color: "from-amber-500 to-orange-600",
        category: "Full-Stack"
    },
    {
        title: "Learnify — LMS Platform",
        description: "A feature-rich Learning Management System with role-based access control, course browsing, progress tracking, and learning path management.",
        tech: ["React", "JavaScript", "RBAC", "REST API"],
        link: "#",
        github: "https://github.com/phaneesh29/leanify-client-web",
        icon: <BookOpen className="w-6 h-6 text-white" />,
        color: "from-emerald-500 to-teal-500",
        category: "Full-Stack / EdTech"
    },
    {
        title: "Real-Time Chat App",
        description: "Instant messaging application with JWT authentication, real-time WebSocket communication, and a sleek DaisyUI interface for seamless conversations.",
        tech: ["MERN", "Socket.io", "DaisyUI", "JWT"],
        link: "https://mern-chat-app-kohl-three.vercel.app",
        github: "https://github.com/phaneesh29/mern-chat-app",
        icon: <MessageSquare className="w-6 h-6 text-white" />,
        color: "from-sky-500 to-blue-600",
        category: "Full-Stack"
    },
    {
        title: "Blogiie — Blog Platform",
        description: "Full-stack blogging platform with user authentication, rich text editing, and a clean, distraction-free reading experience.",
        tech: ["MERN", "MongoDB", "JWT", "Express"],
        link: "https://blogie-two.vercel.app",
        github: "https://github.com/phaneesh29/blogiie",
        icon: <Brain className="w-6 h-6 text-white" />,
        color: "from-pink-500 to-rose-500",
        category: "Full-Stack"
    },
    {
        title: "Lokat — Location Tracker",
        description: "Real-time location sharing and tracking application with secure geographic data transmission, built with a MERN backend and interactive maps.",
        tech: ["MERN", "Maps API", "Real-time", "WebSocket"],
        link: "#",
        github: "https://github.com/phaneesh29/lokat",
        icon: <MapPin className="w-6 h-6 text-white" />,
        color: "from-indigo-500 to-cyan-500",
        category: "Full-Stack"
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-4 text-center">Featured Projects</h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        A selection of projects I&apos;ve built — from AI-powered tools to full-stack web &amp; mobile apps.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1"
                            >
                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                {/* Top gradient bar */}
                                <div className={`h-1 w-full bg-gradient-to-r ${project.color}`} />

                                <div className="p-6 h-full flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 bg-gradient-to-br ${project.color} rounded-lg opacity-80`}>
                                            {project.icon}
                                        </div>
                                        <div className="flex gap-2">
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                                                <Github size={20} />
                                            </a>
                                            {project.link !== "#" && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Category badge */}
                                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 inline-block w-fit px-2 py-0.5 rounded-full bg-gradient-to-r ${project.color} text-white`}>
                                        {project.category}
                                    </span>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs font-medium px-2.5 py-1 bg-white/5 rounded-md text-gray-300 border border-white/5">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* View All on GitHub */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <a
                            href="https://github.com/phaneesh29"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                        >
                            <Github size={18} />
                            View All Projects on GitHub
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
