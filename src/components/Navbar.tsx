"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Noise Cancelling", href: "#noise-cancelling" },
    { name: "Drivers", href: "#driver" },
    { name: "Help", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updateScrolled = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", updateScrolled);
        return () => window.removeEventListener("scroll", updateScrolled);
    }, []);

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/[0.03] backdrop-blur-2xl backdrop-saturate-[150%] border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-[0.2em] text-white">
                    SONY
                </Link>

                <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-medium text-white/70 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        href="#buy"
                        className="text-xs font-medium text-white bg-transparent 
              border border-[#0050FF]/50 hover:border-[#00D6FF]
              hover:shadow-[0_0_15px_rgba(0,214,255,0.3)]
              transition-all duration-300
              px-6 py-1.5 rounded-full"
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}
