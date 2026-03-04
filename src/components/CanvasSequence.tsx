"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 168;

export default function CanvasSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll();
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
    }, [images]);

    return (
        <div className="fixed inset-0 w-full h-screen bg-[#050505] -z-10 overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}
