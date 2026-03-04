"use client";

import { motion } from "framer-motion";

export default function BentoGrid() {
    return (
        <section className="bg-[#050505] py-24 px-6 md:px-12 relative z-20 shadow-[0_-20px_50px_rgba(5,5,5,1)]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">

                    {/* Top Left: Environmentally Conscious */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4,
                        }}
                        className="md:col-span-8 bg-gradient-to-br from-[#0c1f12] to-[#040805] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end border border-white/5 hover:border-white/10 hover:shadow-[0_0_40px_rgba(74,222,128,0.1)] transition-all duration-300"
                    >
                        <div className="absolute top-8 right-8 text-[#4ade80]">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                                <path d="M2 12h20"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Environmentally Conscious</h3>
                            <p className="text-white/60 text-base leading-relaxed max-w-sm">
                                Made with industry-leading recycled plastic materials from automobile parts.
                            </p>
                        </div>
                    </motion.div>

                    {/* Top Right: Plastic-Free Packaging */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4,
                            delay: 0.1
                        }}
                        className="md:col-span-4 bg-[#111111] rounded-3xl p-8 flex flex-col justify-end border border-white/5 hover:border-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)] transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold mb-3 text-white">Plastic-Free Packaging</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            The packaging uses no plastic, designed based on low-toxicity design principles.
                        </p>
                    </motion.div>

                    {/* Bottom Left: Precise Voice Pickup */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4,
                            delay: 0.2
                        }}
                        className="md:col-span-4 bg-[#111111] rounded-3xl p-8 flex flex-col justify-end border border-white/5 hover:border-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.06)] transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold mb-3 text-white">Precise Voice Pickup</h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Beamforming microphones constitute a unique array that isolates your voice.
                        </p>
                    </motion.div>

                    {/* Bottom Right: V1 Integrated Processor */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4,
                            delay: 0.3
                        }}
                        className="md:col-span-8 bg-gradient-to-br from-[#1c182d] to-[#0a0812] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end border border-white/5 hover:border-white/10 hover:shadow-[0_0_40px_rgba(138,43,226,0.1)] transition-all duration-300"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-white">V1 Integrated Processor</h3>
                            <p className="text-white/60 text-base leading-relaxed max-w-sm">
                                Unlocks the full potential of our HD Noise Cancelling Processor QN1.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
