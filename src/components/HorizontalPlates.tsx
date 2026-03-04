"use client";

import { motion } from "framer-motion";

const infoCards = [
    {
        title: "Foldable design & smaller case",
        description: "Crafted for durability and style, the foldable design features precision metalwork and a compact case with a magnetic closure—ready to go wherever you do, in three premium colors: Black, Platinum Silver, and Midnight Blue."
    },
    {
        title: "Tailored Comfort",
        description: "Wider, asymmetrical headband with synthetic leather for all-day comfort, paired with a foldable design perfect for traveling."
    },
    {
        title: "Intuitive Controls",
        description: "Effortlessly adjust the volume, pause music, and switch modes by tapping and swiping on headphones."
    },
    {
        title: "Auto Ambient Sound Mode",
        description: "Balance music and external sounds with Auto Ambient Sound Mode, allowing you to stay aware of your surroundings."
    },
    {
        title: "Sound Connect app",
        description: "Customize noise cancellation, adjust ambient sound, and access personalize EQ settings with the Sony | Sound Connect app."
    }
];

export default function HorizontalPlates() {
    return (
        <div className="w-full bg-[#050505] relative z-20 pt-32 pb-48 border-t border-white/5 shadow-[0_-20px_50px_rgba(5,5,5,1)]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-24 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-sony-cyan/70 bg-clip-text text-transparent pb-1">
                        The Best Noise Cancellation
                    </h2>
                    <p className="text-lg text-white/70 leading-relaxed">
                        Powered by advanced processors and an adaptive microphone system, the WH-1000XM6 headphones deliver real-time noise cancellation for an immersive, distraction-free listening experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {infoCards.map((card, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
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
