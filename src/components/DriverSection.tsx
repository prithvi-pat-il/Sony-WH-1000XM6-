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
            className={`absolute inset-0 flex pointer-events-none pb-24 px-6 md:px-12 lg:px-24 ${className}`}
        >
            <div className="pointer-events-auto">{children}</div>
        </motion.div>
    );
}

export default function DriverSection() {
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
            img.src = `/driver/ezgif-frame-${paddedIndex}.jpg`;
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

            // Use Math.min to contain the image perfectly without any cropping
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.min(hRatio, vRatio);

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
                // Canvas takes up the full viewport now for centered non-cropped display
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
    }, [images]);

    return (
        <div ref={sectionRef} className="relative h-[400vh] w-full bg-[#050505] z-30" id="driver">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Background canvas area (Centered and full width) */}
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#050505]">
                    <canvas ref={canvasRef} className="w-full h-full block" />
                </div>

                {/* Overlaid Plate 1 (Left Aligned) */}
                <StorySection targetRef={sectionRef} start={0} end={0.25} className="items-center justify-start z-20 md:pr-[50%]">
                    <div className="text-left p-8 relative w-full max-w-lg bg-transparent">
                        <div className="text-xs font-semibold tracking-widest text-sony-blue uppercase mb-4 opacity-100 flex items-center gap-2 drop-shadow-md">
                            <span>WH-1000XM6</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-sony-blue" />
                            <span>Specs</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-sony-cyan/70 bg-clip-text text-transparent pb-1 drop-shadow-xl">
                            🎧 Driver Details
                        </h2>
                        <h3 className="text-xl text-white font-semibold mb-2 drop-shadow-md">Driver Unit:</h3>
                        <p className="text-lg text-white/90 leading-relaxed font-medium drop-shadow-md">
                            30 mm dynamic drivers for rich and detailed sound reproduction.
                        </p>
                    </div>
                </StorySection>

                {/* Overlaid Plate 2 (Right Aligned) */}
                <StorySection targetRef={sectionRef} start={0.25} end={0.50} className="items-center justify-end z-20 md:pl-[50%]">
                    <div className="text-left p-8 relative w-full max-w-lg bg-transparent">
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white drop-shadow-xl">
                            Dynamic Performance
                        </h3>
                        <h4 className="text-xl text-white font-semibold mb-2 drop-shadow-md">Driver Type:</h4>
                        <p className="text-base md:text-lg text-white/90 leading-relaxed border-l-2 border-sony-blue pl-4 drop-shadow-md bg-black/20 p-2 rounded-r-lg">
                            Dynamic driver with neodymium magnet delivering balanced audio across frequencies.
                        </p>
                    </div>
                </StorySection>

                {/* Overlaid Plate 3 (Left Aligned) */}
                <StorySection targetRef={sectionRef} start={0.50} end={0.75} className="items-center justify-start z-20 md:pr-[50%]">
                    <div className="text-left p-8 relative w-full max-w-lg bg-transparent">
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white border-l-2 border-sony-blue pl-4 drop-shadow-xl">
                            Unparalleled Range
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xl text-white font-semibold mb-3 drop-shadow-md">Frequency Response:</h4>
                                <ul className="text-base md:text-lg text-white/90 leading-relaxed space-y-3 drop-shadow-md">
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-sony-cyan/70 shadow-[0_0_10px_rgba(0,214,255,0.8)]" />
                                        <span><strong className="text-white">Wired mode (active):</strong> 4 Hz–40 kHz</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-sony-cyan/70 shadow-[0_0_10px_rgba(0,214,255,0.8)]" />
                                        <span><strong className="text-white">Bluetooth:</strong> 20 Hz–40 kHz (LDAC)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </StorySection>

                {/* Overlaid Plate 4 (Right Aligned) */}
                <StorySection targetRef={sectionRef} start={0.75} end={1.0} className="items-center justify-end z-20 md:pl-[50%]">
                    <div className="text-left p-8 relative w-full max-w-lg bg-transparent">
                        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white border-l-2 border-white/40 pl-4 drop-shadow-xl">
                            Precision Details
                        </h3>
                        <div className="space-y-4 mb-6 pt-2">
                            <p className="text-lg text-white/90 drop-shadow-md">
                                <strong className="text-white">Impedance:</strong> Approx. 48 Ω (active), 16 Ω (passive).
                            </p>
                            <p className="text-lg text-white/90 drop-shadow-md">
                                <strong className="text-white">Sensitivity:</strong> ~103 dB /mW.
                            </p>
                        </div>
                        <p className="text-base text-white/90 leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            These high-quality 30 mm drivers ensure powerful bass, clear mids, and detailed highs for an immersive listening experience.
                        </p>
                    </div>
                </StorySection>

            </div>
        </div>
    );
}
