"use client";

import { Github, Linkedin, ArrowUp } from "lucide-react";
import { Link } from "react-scroll";

const quickLinks = [
    { name: "About", to: "about" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
];

export default function Footer() {
    return (
        <footer className="w-full bg-black/60 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Sreephaneesha</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Full Stack Developer &amp; AI/ML Enthusiast building digital experiences that merge creativity with technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.to}
                                        smooth={true}
                                        duration={500}
                                        className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Connect</h4>
                        <div className="flex gap-3">
                            <a
                                href="https://github.com/phaneesh29"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 text-gray-400 hover:text-white"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/sreephaneesh-kanugovi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 text-gray-400 hover:text-white"
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Sreephaneesha Kanugovi. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-600 mt-2 md:mt-0">
                        Built with Next.js, Three.js &amp; ❤️
                    </p>
                    <Link
                        to="hero"
                        smooth={true}
                        duration={500}
                        className="mt-4 md:mt-0 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-gray-400 hover:text-white border border-white/10"
                    >
                        <ArrowUp size={16} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
