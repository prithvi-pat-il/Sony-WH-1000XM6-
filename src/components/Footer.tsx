"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-[#1C1C1E] text-white pt-16 pb-8 border-t border-white/10" id="contact">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Top Links Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
                >

                    {/* Column 1 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-medium mb-2">Find a Store</h4>
                        <div className="flex w-full mb-2 border border-white/20 rounded-md overflow-hidden focus-within:border-white/50 transition-colors bg-[#111]">
                            <div className="flex items-center justify-center pl-3 text-[#ff4c00]">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                    <path d="M2 12h20"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Location"
                                className="bg-transparent border-none outline-none w-full py-2 px-3 text-xs text-white placeholder-white/40"
                            />
                            <button className="bg-[#1f6bdf] hover:bg-[#1a5bc0] text-white px-4 py-2 text-xs font-medium transition-colors">
                                Search
                            </button>
                        </div>
                        <a href="#" className="hover:text-white transition-colors">See Our Locations</a>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-medium mb-2">Support</h4>
                        <a href="#" className="hover:text-white transition-colors">Online Help</a>
                        <a href="#" className="hover:text-white transition-colors">Track Repair Status</a>
                        <a href="#" className="hover:text-white transition-colors">Locate Service Centres</a>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-medium mb-2">In the news</h4>
                        <a href="#" className="hover:text-white transition-colors">Press Center</a>
                    </div>

                    {/* Column 4 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-medium mb-2">Contact Us</h4>
                        <a href="#" className="hover:text-white transition-colors">Newsletter Subscriptions</a>
                        <a href="#" className="hover:text-white transition-colors">Contact Us</a>
                    </div>

                </motion.div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-8">

                    <button className="bg-[#222] hover:bg-[#333] border border-white/10 text-white px-6 py-2 rounded-sm text-xs font-medium transition-colors">
                        India
                    </button>

                    <div className="flex flex-col items-start lg:items-end gap-6 w-full">
                        <div className="flex flex-wrap gap-4 text-xs">
                            <a href="#" className="hover:text-white transition-colors">Company Info</a>
                            <a href="#" className="hover:text-white transition-colors">E-Waste Management</a>
                            <a href="#" className="hover:text-white transition-colors">Corporate Social Responsibilities</a>
                            <a href="#" className="hover:text-white transition-colors">Careers</a>
                            <a href="#" className="hover:text-white transition-colors">Professional Products & Solutions</a>
                            <a href="#" className="hover:text-white transition-colors">Site Map</a>
                        </div>

                        <div className="flex gap-2">
                            {/* Social Icons Placeholder */}
                            <a href="#" className="w-8 h-8 rounded-sm bg-[#222] hover:bg-[#333] flex items-center justify-center transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-sm bg-[#222] hover:bg-[#333] flex items-center justify-center transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-sm bg-[#222] hover:bg-[#333] flex items-center justify-center transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-sm bg-[#222] hover:bg-[#333] flex items-center justify-center transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                    <polygon fill="#222" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col items-start gap-4">
                    <div className="flex flex-wrap gap-4 text-[10px] font-semibold text-white tracking-widest uppercase">
                        <a href="#" className="hover:text-white/70 transition-colors">TERMS AND CONDITIONS OF WEBSITE USE</a>
                        <a href="#" className="hover:text-white/70 transition-colors">PRIVACY POLICY</a>
                    </div>

                    <button className="bg-white text-black px-3 py-1.5 text-xs font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors rounded-sm">
                        <span>▶</span>
                        Sony Group Portal Site
                    </button>

                    <p className="text-xs text-white/40 mt-2">
                        Copyright © 2025 Sony India. All rights reserved
                    </p>
                </div>
            </div>
        </footer >
    );
}
