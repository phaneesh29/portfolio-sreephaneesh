"use client";

import { motion } from "framer-motion";
import { GraduationCap, Search } from "lucide-react";

const timeline = [
    {
        type: "education",
        title: "B.Tech CSE (AI & ML)",
        org: "PES University, Bengaluru",
        period: "2023 – Present",
        description: "Pursuing a specialization in Artificial Intelligence and Machine Learning with a strong focus on DSA, full-stack development, and deep learning.",
        icon: <GraduationCap className="w-5 h-5" />,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        type: "seeking",
        title: "Actively Seeking Opportunities",
        org: "Open to Full-Stack & AI/ML Roles",
        period: "2025",
        description: "Looking for internship and full-time opportunities in full-stack development, AI/ML engineering, and software development. Passionate about building impactful products.",
        icon: <Search className="w-5 h-5" />,
        gradient: "from-emerald-500 to-teal-500"
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-20 text-white">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-4 text-center">Experience & Education</h2>
                    <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                        My journey through academics and professional roles.
                    </p>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent" />

                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className={`relative flex flex-col md:flex-row items-start gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Content Card */}
                                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                        <div className="group bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/25 transition-all duration-300 ml-14 md:ml-0">
                                            <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r ${item.gradient} text-white mb-3`}>
                                                {item.type === "education" ? "Education" : item.type === "seeking" ? "Open to Work" : "Work"}
                                            </span>
                                            <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                            <p className="text-sm text-purple-300 font-medium mb-1">{item.org}</p>
                                            <p className="text-xs text-gray-500 mb-3">{item.period}</p>
                                            <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>

                                    {/* Timeline Node */}
                                    <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 p-2.5 rounded-full bg-gradient-to-br ${item.gradient} border-4 border-black z-10 shadow-lg`}>
                                        <span className="text-white">{item.icon}</span>
                                    </div>

                                    {/* Spacer for opposite side */}
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
