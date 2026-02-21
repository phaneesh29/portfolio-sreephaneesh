"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";

const navLinks = [
    { name: "About", href: "about" },
    { name: "Experience", href: "experience" },
    { name: "Projects", href: "projects" },
    { name: "Contact", href: "contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navLinks.map(l => l.href);
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Floating glass navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? "pt-3 px-4" : "pt-4 px-6"
                    }`}
            >
                <div
                    className={`w-full max-w-5xl transition-all duration-500 rounded-2xl ${scrolled
                        ? "bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]"
                        : "bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]"
                        }`}
                >
                    {/* Top highlight line — simulates glass edge reflection */}
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />

                    <div className="px-5 py-3 flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="hero"
                            smooth={true}
                            duration={500}
                            className="cursor-pointer group flex items-center gap-2.5"
                        >
                            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                                <span className="relative z-10">S</span>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <div className="hidden sm:flex flex-col">
                                <span className="font-bold text-sm text-white leading-tight tracking-wide">
                                    Sreephaneesha
                                </span>
                                <span className="text-[10px] text-gray-500 leading-tight tracking-widest uppercase">
                                    Developer
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav — glass pill links */}
                        <div className="hidden md:flex items-center">
                            <div className="flex items-center gap-0.5 bg-white/[0.04] rounded-xl p-1 border border-white/[0.06]">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 + index * 0.06 }}
                                    >
                                        <Link
                                            to={link.href}
                                            smooth={true}
                                            duration={500}
                                            spy={true}
                                            className={`relative px-4 py-1.5 rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-300 ${activeSection === link.href
                                                ? "text-white"
                                                : "text-gray-400 hover:text-gray-200"
                                                }`}
                                        >
                                            {activeSection === link.href && (
                                                <motion.div
                                                    layoutId="navGlow"
                                                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-fuchsia-500/15 to-cyan-500/20 border border-white/10 shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                                                    style={{ zIndex: -1 }}
                                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                                />
                                            )}
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social icons */}
                            <div className="ml-3 pl-3 border-l border-white/[0.08] flex items-center gap-1">
                                <a
                                    href="https://github.com/phaneesh29"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-300"
                                >
                                    <Github size={15} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/sreephaneesh-kanugovi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-300"
                                >
                                    <Linkedin size={15} />
                                </a>
                            </div>
                        </div>

                        {/* Mobile toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu — full glass overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

                        {/* Menu panel */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative mx-4 mt-20 bg-white/[0.06] backdrop-blur-2xl rounded-2xl border border-white/[0.12] shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden"
                        >
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                            <div className="p-4 space-y-1">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + index * 0.05 }}
                                    >
                                        <Link
                                            to={link.href}
                                            smooth={true}
                                            duration={500}
                                            onClick={() => setIsOpen(false)}
                                            className={`block px-4 py-3 rounded-xl text-base font-medium cursor-pointer transition-all ${activeSection === link.href
                                                ? "text-white bg-gradient-to-r from-purple-500/15 to-cyan-500/10 border border-white/10"
                                                : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <div className="flex gap-2 pt-3 mt-2 border-t border-white/[0.08]">
                                    <a href="https://github.com/phaneesh29" target="_blank" rel="noopener noreferrer" className="p-2.5 text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-xl transition-all border border-white/[0.06]">
                                        <Github size={18} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/sreephaneesh-kanugovi" target="_blank" rel="noopener noreferrer" className="p-2.5 text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-xl transition-all border border-white/[0.06]">
                                        <Linkedin size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
