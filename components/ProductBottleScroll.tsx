"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import ProductTextOverlays from "./ProductTextOverlays";
import Loader from "./Loader";
import { Product } from "@/data/products";

export default function ProductBottleScroll({ product }: { product: Product }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load images
    const images: HTMLImageElement[] = [];
    const frameCount = product.frameCount;
    
    // We preload images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${product.folderPath}/${i}.${product.imageExt}`;
      img.onload = () => {
        if (i === 1) {
          drawFrame(0);
          setIsLoading(false);
        }
      };
      images.push(img);
    }

    const render = () => {
      // scrollYProgress is a motion value
      const progress = scrollYProgress.get();
      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(progress * frameCount))
      );
      
      drawFrame(frameIndex);
      requestAnimationFrame(render);
    };
    
    const animationFrameId = requestAnimationFrame(render);

    function drawFrame(index: number) {
      if (!canvas || !ctx || !images[index]) return;
      const img = images[index];
      if (!img.complete || img.naturalHeight === 0) return; // not loaded yet

      // Ensure canvas is resized to match container size preserving aspect ratio
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        // High DPI canvas
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, width, height);

      // "Cover" fit logic
      const imgAspect = img.width / img.height;
      const canvasAspect = width / height;

      let drawWidth, drawHeight, drawX, drawY;

      if (imgAspect > canvasAspect) {
        // Image is wider than canvas -> Cover fits to height
        drawHeight = height;
        drawWidth = height * imgAspect;
        drawX = (width - drawWidth) / 2;
        drawY = 0;
      } else {
        // Image is taller than canvas -> Cover fits to width
        drawWidth = width;
        drawHeight = width / imgAspect;
        drawX = 0;
        drawY = (height - drawHeight) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [product, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        />
        <div className="absolute inset-0 z-20 pointer-events-none">
          <ProductTextOverlays product={product} progress={scrollYProgress} />
        </div>
        <Loader visible={isLoading} />
      </div>
    </div>
  );
}
