"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionTitle({
  tag,
  title,
  subtitle,
  tagColor = "text-coral",
}: {
  tag: string;
  title: string;
  subtitle: string;
  tagColor?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <span className={`inline-block text-[0.75rem] font-semibold ${tagColor} uppercase tracking-[0.15em] mb-3`}>
        {tag}
      </span>
      <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
        {title}
      </h2>
      <p className="text-[1.05rem] text-foreground/45 max-w-xl mx-auto leading-relaxed font-[350]">
        {subtitle}
      </p>
    </motion.div>
  );
}
