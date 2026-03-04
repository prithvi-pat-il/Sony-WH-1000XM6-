"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const FRAME_COUNT = 240;

function StorySection({
    targetRef,
    start,
    end,
    children,
    className = "",
}: {
    targetRef: React.RefObject<HTMLElement>;
    start: number;
    end: number;
    children: React.ReactNode;
    className?: string;
}) {
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const fadeInStart = start;
    const fadeInEnd = start + 0.05;
    const fadeOutStart = end - 0.05;
    const fadeOutEnd = end;

    const opacity = useTransform(
        scrollYProgress,
        [Math.max(0, fadeInStart - 0.05), fadeInStart, fadeOutStart, fadeOutEnd],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [Math.max(0, fadeInStart - 0.05), fadeInStart, fadeOutStart, fadeOutEnd],
        [40, 0, 0, -40]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 md:w-1/2 md:right-auto flex pointer-events-none pb-24 px-6 md:px-12 lg:px-24 ${className}`}
        >
            <div className="pointer-events-auto w-full">{children}</div>
        </motion.div>
    );
}

export default function NoiseCancellingSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    const { scrollYProgress: stickyProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const frameIndex = useTransform(stickyProgress, [0, 1], [1, FRAME_COUNT]);

    // Load all images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `/chipset/ezgif-frame-${paddedIndex}.jpg`;
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
            if (canvasRef.current && sectionRef.current) {
                // Ensure canvas matches its container size
                const isMobile = window.innerWidth < 768;
                canvasRef.current.width = isMobile ? window.innerWidth : window.innerWidth / 2;
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
    }, [images]);

    return (
        <div ref={sectionRef} className="relative h-[400vh] w-full bg-[#050505] z-30" id="noise-cancelling">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row">

                {/* Left side background wrapper for desktop */}
                <div className="hidden md:block w-1/2 h-full bg-[#050505] z-10 relative">
                    <div className="absolute top-0 bottom-0 right-0 w-48 bg-gradient-to-l from-transparent to-[#050505] z-20 pointer-events-none" />
                </div>

                {/* Right side canvas area */}
                <div className="w-full h-full md:w-1/2 absolute md:relative top-0 right-0 z-0 flex items-center justify-center bg-[#050505] md:bg-transparent">
                    <canvas ref={canvasRef} className="w-full h-full block" />
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#050505] to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10" />
                </div>

                {/* 0 - 33% : Plate 1 (QN3 Info) */}
                <StorySection targetRef={sectionRef} start={0} end={0.33} className="items-center justify-start z-20">
                    <div className="text-left bg-[#0A0A0C]/80 md:bg-transparent p-8 md:p-0 rounded-2xl backdrop-blur-md md:backdrop-blur-none border border-white/5 md:border-none">
                        <div className="text-xs font-semibold tracking-widest text-sony-blue uppercase mb-4 opacity-100">
                            WH-1000XM6
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-sony-cyan/70 bg-clip-text text-transparent pb-1">
                            HD Noise Canceling Processor QN3
                        </h2>
                        <p className="text-lg text-white/80 leading-relaxed mb-4 font-medium max-w-lg">
                            The Brain Inside the Silence.
                        </p>
                        <p className="text-base text-white/60 leading-relaxed max-w-md">
                            The HD Noise Canceling Processor QN3 is 7x faster than the QN1 (found in our WH-1000XM5 headphones), optimizing 12 microphones in real time—for better noise cancellation, sound quality, and call clarity.
                        </p>
                    </div>
                </StorySection>

                {/* 33 - 66% : Plate 2 */}
                <StorySection targetRef={sectionRef} start={0.33} end={0.66} className="items-center justify-start z-20">
                    <div className="text-left bg-[#0A0A0C]/80 md:bg-transparent p-8 md:p-0 rounded-2xl backdrop-blur-md md:backdrop-blur-none border border-white/5 md:border-none">
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white max-w-lg">
                            Faster. Smarter. Flawless.
                        </h3>
                        <p className="text-base text-white/70 leading-relaxed max-w-md mb-4">
                            Analyzing frequencies in real-time, every single soundwave is calculated and inverted before it ever reaches your ear.
                        </p>
                    </div>
                </StorySection>

                {/* 66 - 100% : Plate 3 */}
                <StorySection targetRef={sectionRef} start={0.66} end={1.0} className="items-center justify-start z-20">
                    <div className="text-left bg-[#0A0A0C]/80 md:bg-transparent p-8 md:p-0 rounded-2xl backdrop-blur-md md:backdrop-blur-none border border-white/5 md:border-none border-l-0 md:border-l-2 md:border-sony-blue md:pl-6">
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white max-w-lg">
                            Pure Audiophile Bliss
                        </h3>
                        <p className="text-base text-white/70 leading-relaxed max-w-md">
                            By eliminating the outside world with unprecedented accuracy, the chipset allows the high-resolution drivers to shine, delivering studio-level precision exactly as the artist intended.
                        </p>
                    </div>
                </StorySection>
            </div>
        </div>
    );
}
