"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const FRAME_COUNT = 168;

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
            className={`absolute inset-0 flex pointer-events-none pb-24 px-6 md:px-12 lg:px-24 md:w-1/2 md:right-auto ${className}`}
        >
            <div className="pointer-events-auto w-full">{children}</div>
        </motion.div>
    );
}

export default function CanvasSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null); // Added containerRef for StorySection
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll({
        target: containerRef, // Target the container for scroll progress
        offset: ["start start", "end end"],
    });
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

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
                // Subtly larger height to prevent bottom gaps on mobile
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
        <div ref={containerRef} className="relative w-full h-[400vh]"> {/* Increased height for scroll effect */}
            <div className="sticky top-0 w-full h-screen bg-[#050505] z-30 overflow-hidden"> {/* Canvas container with z-30 */}
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* Overlaid Plate 1 */}
            <StorySection targetRef={containerRef} start={0} end={0.25} className="items-center justify-start z-40"> {/* z-40 to be above canvas */}
                <div className="text-left bg-black/40 md:bg-transparent p-6 md:p-0 rounded-2xl md:backdrop-blur-none border border-white/10 md:border-none md:pr-[50%] mx-auto md:mx-0 w-[90%] md:w-auto">
                    <div className="text-xs font-semibold tracking-widest text-[#0050FF] uppercase mb-4 opacity-100 flex items-center gap-2 drop-shadow-md">
                        <span>Design</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0050FF]" />
                        <span>Comfort</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-[#00D6FF]/70 bg-clip-text text-transparent pb-1 drop-shadow-xl text-left">
                        Lighter. Sleeker.
                    </h2>
                    <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium drop-shadow-md text-left max-w-lg">
                        Re-engineered headband and softer, pressure-relieving earpads deliver our most comfortable fit ever.
                    </p>
                </div>
            </StorySection>

            {/* Overlaid Plate 2 */}
            <StorySection targetRef={containerRef} start={0.25} end={0.50} className="items-center justify-end z-40"> {/* z-40 to be above canvas */}
                <div className="text-left bg-black/40 md:bg-transparent p-6 md:p-0 rounded-2xl md:backdrop-blur-none border border-white/10 md:border-none md:pl-[50%] mx-auto md:mx-0 w-[90%] md:w-auto">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white drop-shadow-xl text-left max-w-lg">
                        Silent Joints
                    </h3>
                    <p className="text-base md:text-lg text-white/90 leading-relaxed border-l-2 border-[#0050FF] pl-4 drop-shadow-md bg-black/20 p-2 rounded-r-lg text-left max-w-lg">
                        We redesigned the mechanical structure to eliminate all squeaks and clicks when adjusting the headphones.
                    </p>
                </div>
            </StorySection>

            {/* Overlaid Plate 3 */}
            <StorySection targetRef={containerRef} start={0.50} end={0.75} className="items-center justify-start z-40"> {/* z-40 to be above canvas */}
                <div className="text-left bg-black/40 md:bg-transparent p-6 md:p-0 rounded-2xl md:backdrop-blur-none border border-white/10 md:border-none md:pr-[50%] mx-auto md:mx-0 w-[90%] md:w-auto">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white border-l-2 border-[#0050FF] pl-4 drop-shadow-xl text-left max-w-lg">
                        Stepless Slider
                    </h3>
                    <p className="text-base md:text-lg text-white/90 leading-relaxed drop-shadow-md text-left max-w-lg">
                        The new stepless slider design allows for seamless, precise adjustments and a perfectly flush look.
                    </p>
                </div>
            </StorySection>

            {/* Overlaid Plate 4 */}
            <StorySection targetRef={containerRef} start={0.75} end={1.0} className="items-center justify-end z-40"> {/* z-40 to be above canvas */}
                <div className="text-left bg-black/40 md:bg-transparent p-6 md:p-0 rounded-2xl md:backdrop-blur-none border border-white/10 md:border-none md:pl-[50%] mx-auto md:mx-0 w-[90%] md:w-auto">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-white border-l-2 border-white/40 pl-4 drop-shadow-xl text-left max-w-lg">
                        Eco-Conscious
                    </h3>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-left max-w-lg">
                        Packaged with zero plastic and built using recycled materials, the WH-1000XM6 is designed with the environment in mind.
                    </p>
                </div>
            </StorySection>
        </div>
    );
}
