"use client";

import { motion } from "framer-motion";

const infoCards = [
    {
        title: "Co-Created with Mastering Audio Engineers",
        description: "Co-created with world-renowned mastering audio engineers, these headphones deliver studio-level precision—preserving every nuance, every note, exactly as the artist intended."
    },
    {
        title: "Ultra-clear calls, from anywhere",
        description: "A six-microphone AI beamforming system isolates your voice from background noise, ensuring you’re always heard—even when others are talking. Need to mute? Simply tap your headphones."
    },
    {
        title: "Long Battery Life and Convenient Charging",
        description: "With up to 30 hours of battery life, these headphones ensure you’re powered for even the longest trips. When you’re running low, plug in the USB charging cable and keep listening, with both Bluetooth & audio cable supported. Charge for 3 minutes and you’ll get up to 3 hours of playback."
    }
];

export default function TopFeatures() {
    return (
        <div className="w-full bg-[#050505] relative z-20 pt-32 pb-32 border-t border-white/5 shadow-[0_-20px_50px_rgba(5,5,5,1)]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-24 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-sony-cyan/70 bg-clip-text text-transparent pb-1">
                        Unmatched Performance
                    </h2>
                    <p className="text-lg text-white/70 leading-relaxed">
                        Engineered for excellence in every environment. From studio-grade clarity to all-day power.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {infoCards.map((card, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.15,
                                type: "spring",
                                bounce: 0.4
                            }}
                            key={card.title}
                            className="bg-[#0A0A0C] border border-white/5 rounded-2xl p-8 hover:border-white/10 hover:bg-[#0D0D10] hover:shadow-[0_0_40px_rgba(255,255,255,0.06)] transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="text-xs font-semibold tracking-widest text-sony-blue uppercase mb-4 opacity-70 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(0,80,255,0.8)] transition-all">
                                WH-1000XM6
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">
                                {card.title}
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed relative z-10">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
