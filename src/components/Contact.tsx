"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("");

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("Failed to send message. Please try again.");
            }
        } catch (error) {
            setStatus("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-black/30 text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
                        <p className="text-gray-300 mb-8 text-lg">
                            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <a href="mailto:sreephaneesha2005@gmail.com" className="text-white hover:text-purple-400 transition-colors">
                                        sreephaneesha2005@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Phone</p>
                                    <a href="tel:+917259549529" className="text-white hover:text-blue-400 transition-colors">
                                        +91 72595 49529
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Location</p>
                                    <p className="text-white">Bengaluru, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <a href="https://github.com/phaneesh29" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10">
                                <Github size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/sreephaneesh-kanugovi" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>

                    <form
                        className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                                    placeholder="Your message..."
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                            {status && (
                                <p className={`text-center text-sm ${status.includes("success") ? "text-green-400" : "text-red-400"}`}>
                                    {status}
                                </p>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
