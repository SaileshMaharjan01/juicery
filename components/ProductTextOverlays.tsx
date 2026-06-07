"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Product } from "@/data/products";

export default function ProductTextOverlays({
  product,
  progress,
}: {
  product: Product;
  progress: MotionValue<number>;
}) {
  // Fade in and out different sections based on scroll progress (0 to 1)
  
  // Section 1: 0.0 -> 0.15 (Fade out at 0.22)
  const opacity1 = useTransform(progress, [0, 0.15, 0.22, 1], [1, 1, 0, 0]);
  const y1 = useTransform(progress, [0, 0.22, 1], [0, -50, -50]);

  // Section 2: 0.28 -> 0.45 (Fade in at 0.28, out at 0.52)
  const opacity2 = useTransform(progress, [0, 0.28, 0.35, 0.45, 0.52, 1], [0, 0, 1, 1, 0, 0]);
  const y2 = useTransform(progress, [0, 0.28, 0.35, 0.45, 0.52, 1], [50, 50, 0, 0, -50, -50]);

  // Section 3: 0.58 -> 0.75
  const opacity3 = useTransform(progress, [0, 0.58, 0.65, 0.75, 0.82, 1], [0, 0, 1, 1, 0, 0]);
  const y3 = useTransform(progress, [0, 0.58, 0.65, 0.75, 0.82, 1], [50, 50, 0, 0, -50, -50]);

  // Section 4: 0.88 -> 1.0
  const opacity4 = useTransform(progress, [0, 0.88, 0.95, 1], [0, 0, 1, 1]);
  const y4 = useTransform(progress, [0, 0.88, 0.95, 1], [50, 50, 0, 0]);

  const TextBlock = ({ title, subtitle, opacity, y, align }: any) => (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center px-8 md:px-24 ${
        align === "right" ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <h2 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter drop-shadow-2xl max-w-4xl leading-tight">
        {title}
      </h2>
      <p className="text-xl md:text-3xl font-medium text-white/80 max-w-2xl drop-shadow-lg">
        {subtitle}
      </p>
    </motion.div>
  );

  return (
    <div className="relative w-full h-full max-w-[1400px] mx-auto">
      <TextBlock
        title={product.section1.title}
        subtitle={product.section1.subtitle}
        opacity={opacity1}
        y={y1}
        align="left"
      />
      <TextBlock
        title={product.section2.title}
        subtitle={product.section2.subtitle}
        opacity={opacity2}
        y={y2}
        align="right"
      />
      <TextBlock
        title={product.section3.title}
        subtitle={product.section3.subtitle}
        opacity={opacity3}
        y={y3}
        align="left"
      />
      <TextBlock
        title={product.section4.title}
        subtitle={product.section4.subtitle}
        opacity={opacity4}
        y={y4}
        align="right"
      />
    </div>
  );
}
