"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 168;

function StorySection({
    targetRef,
    start,
    end,
    children,
    className = "",
    stayVisible = false,
}: {
    targetRef: React.RefObject<HTMLElement>;
    start: number;
    end: number;
    children: React.ReactNode;
    className?: string;
    stayVisible?: boolean;
}) {
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const fadeInStart = start;
    const fadeOutStart = stayVisible ? end : end - 0.05;
    const fadeOutEnd = stayVisible ? end : end;

    const opacity = useTransform(
        scrollYProgress,
        [Math.max(0, fadeInStart - 0.05), fadeInStart, fadeOutStart, fadeOutEnd],
        [0, 1, 1, stayVisible ? 1 : 0]
    );

    const y = useTransform(
        scrollYProgress,
        [Math.max(0, fadeInStart - 0.05), fadeInStart, fadeOutStart, fadeOutEnd],
        [40, 0, 0, stayVisible ? 0 : -40]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 flex pointer-events-none pb-24 px-6 md:px-12 lg:px-24 z-20 ${className}`}
        >
            <div className="pointer-events-auto w-full flex flex-col items-center md:items-stretch md:block max-w-full">
                {children}
            </div>
        </motion.div>
    );
}

export default function StoryLayers() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Animate canvas frames from 0 to 0.85 so it finishes before the user scrolls past the container
    const frameIndex = useTransform(scrollYProgress, [0, 0.85], [1, FRAME_COUNT]);

    // Load all images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `/headphone-animation/ezgif-frame-${paddedIndex}.jpg`;
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    const drawFrame = (index: number) => {
        if (!canvasRef.current || images.length === 0) return;

        let currentFrame = index - 1;
        if (currentFrame < 0) currentFrame = 0;
        if (currentFrame >= FRAME_COUNT) currentFrame = FRAME_COUNT - 1;

        const ctx = canvasRef.current.getContext("2d");
        const img = images[currentFrame];

        if (ctx && img && img.complete) {
            const canvas = canvasRef.current;

            // Calculate aspect ratio covering
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        }
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        drawFrame(Math.round(latest));
    });

    // Handle Resize & Initial Draw
    useEffect(() => {
        const resizeCanvas = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                drawFrame(Math.round(frameIndex.get()));
            }
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Draw first frame once loaded
        if (images.length > 0) {
            if (images[0].complete) {
                drawFrame(Math.round(frameIndex.get()));
            } else {
                images[0].onload = () => drawFrame(Math.round(frameIndex.get()));
            }
        }

        return () => window.removeEventListener("resize", resizeCanvas);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

    return (
        <div ref={containerRef} className="relative h-[800vh] w-full bg-[#050505] z-10" id="overview">

            {/* The canvas representing the headphone animation is now sticky inside this container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-[#050505]">
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#050505]">
                    <canvas ref={canvasRef} className="w-full h-full block" />
                </div>

                {/* Content Layers on top of the Sticky Canvas */}
                <div className="absolute inset-0 z-10 w-full">
                    {/* 0 - 45% : Hero & Engineering (Simultaneous Left/Right) */}
                    <StorySection targetRef={containerRef} start={0.0} end={0.45} className="items-center justify-center">
                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-24 h-full md:h-auto overflow-y-auto md:overflow-visible">
                            {/* Hero (Left) */}
                            <div className="text-center md:text-left w-full md:w-1/2 max-w-lg bg-transparent md:self-center mt-12 md:mt-0">
                                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-2xl">
                                    Sony WH-1000XM6
                                </h1>
                                <p className="text-lg sm:text-xl md:text-3xl font-medium text-white/90 mb-3 drop-shadow-md">Silence, perfected.</p>
                                <p className="text-sm sm:text-base text-white/90 max-w-lg leading-relaxed shadow-black drop-shadow-md border-l-2 border-sony-blue pl-4 bg-black/40 md:bg-black/20 p-3 md:p-2 rounded-r-lg mx-auto md:mx-0">
                                    Flagship wireless noise cancelling, re-engineered for a world that never stops.
                                </p>
                            </div>

                            {/* Engineering Reveal (Right) */}
                            <div className="text-center md:text-left w-full md:w-1/2 max-w-lg bg-transparent drop-shadow-2xl md:self-center mb-12 md:mb-0">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 bg-gradient-to-b from-white to-sony-cyan/70 bg-clip-text text-transparent pb-1 drop-shadow-xl">
                                    Precision-engineered for silence.
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed drop-shadow-md border-l-2 border-sony-blue pl-4 bg-black/40 md:bg-black/20 p-3 rounded-r-lg mx-auto md:mx-0 text-left">
                                        Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
                                    </p>
                                    <p className="text-sm sm:text-base text-white/90 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pl-4 text-left">
                                        Every component is tuned for balance, power, and comfort—hour after hour.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </StorySection>

                    {/* 45 - 90% : Noise Cancelling & Sound (Simultaneous Left/Right) */}
                    <StorySection targetRef={containerRef} start={0.45} end={0.90} className="items-center justify-center">
                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-24 h-full md:h-auto overflow-y-auto md:overflow-visible">
                            {/* Noise Cancelling (Left) */}
                            <div className="text-center md:text-left w-full md:w-1/2 max-w-lg bg-transparent md:self-center mt-12 md:mt-0">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 bg-gradient-to-b from-white to-sony-cyan/70 bg-clip-text text-transparent pb-1 drop-shadow-xl md:border-l-2 md:border-sony-blue md:pl-4">
                                    Adaptive noise cancelling, redefined.
                                </h2>
                                <div className="space-y-3 sm:space-y-4">
                                    <ul className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed space-y-3 drop-shadow-md pb-2 bg-black/40 md:bg-transparent p-4 md:p-0 rounded-lg text-left inline-block">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-sony-cyan/70 shadow-[0_0_10px_rgba(0,214,255,0.8)] mt-2 shrink-0" />
                                            <span>Multi-microphone array listens in every direction.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-sony-cyan/70 shadow-[0_0_10px_rgba(0,214,255,0.8)] mt-2 shrink-0" />
                                            <span>Real-time noise analysis adjusts to your environment.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-sony-cyan/70 shadow-[0_0_10px_rgba(0,214,255,0.8)] mt-2 shrink-0" />
                                            <span>Your music stays pure—planes, trains, and crowds fade away.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Sound & Upscaling (Right) */}
                            <div className="text-center md:text-left w-full md:w-1/2 max-w-lg bg-transparent md:self-center mb-12 md:mb-0">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 bg-gradient-to-b from-white to-sony-cyan/70 bg-clip-text text-transparent pb-1 drop-shadow-xl md:border-l-2 md:border-white/40 md:pl-4">
                                    Immersive, lifelike sound.
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed drop-shadow-md bg-black/40 md:bg-transparent p-3 md:p-0 rounded-lg text-left md:pl-0">
                                        High-performance drivers unlock detail, depth, and texture in every track.
                                    </p>
                                    <p className="text-sm sm:text-base text-white/90 leading-relaxed drop-shadow-md md:pl-4 text-left p-3 md:p-0">
                                        AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </StorySection>

                    {/* 90 - 100% : Reassembly & CTA */}
                    <StorySection targetRef={containerRef} start={0.90} end={1.0} stayVisible={true} className="items-end justify-center pb-[10vh]">
                        <div className="text-center p-8 relative w-full max-w-2xl bg-transparent mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] text-white">
                                Hear everything. Feel nothing else.
                            </h2>
                            <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 max-w-lg mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                                WH-1000XM6. Designed for focus, crafted for comfort.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a href="#buy" className="px-10 py-4 text-lg bg-sony-blue hover:bg-[#003db3] text-white font-medium rounded-full shadow-[0_0_20px_rgba(0,80,255,0.4)] hover:shadow-[0_0_30px_rgba(0,80,255,0.7)] transition-all duration-300 transform hover:scale-105 pointer-events-auto">
                                    Buy Now
                                </a>
                            </div>
                            <p className="mt-8 text-sm text-white/70 uppercase tracking-widest font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] border-t border-white/10 pt-6">
                                Engineered for airports, offices, and everything in between.
                            </p>
                        </div>
                    </StorySection>
                </div>
            </div>
        </div>
    );
}
