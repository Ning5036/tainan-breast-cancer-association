"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import PinkRibbon from "@/components/ui/PinkRibbon";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (target <= 0 || started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return count;
}

export default function VisitorCounter() {
  const [target, setTarget] = useState(0);

  useEffect(() => {
    fetch("/api/visitor", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setTarget(data.count || 12483))
      .catch(() => setTarget(12483));
  }, []);

  const displayed = useCountUp(target);
  const formatted = target > 0 ? displayed.toLocaleString() : "---";

  return (
    <section className="py-12 bg-gradient-to-r from-secondary/30 via-primary/15 to-secondary/30">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2">
            <PinkRibbon size={16} className="text-primary" />
            <span className="text-xs text-charcoal/40 tracking-widest uppercase font-body">
              Visitors
            </span>
            <PinkRibbon size={16} className="text-primary" />
          </div>
          <p className="text-charcoal/70 text-sm md:text-base">
            已有{" "}
            <span className="font-bold text-accent text-2xl md:text-3xl tabular-nums mx-1">
              {formatted}
            </span>{" "}
            位訪客與我們同行
          </p>
        </motion.div>
      </div>
    </section>
  );
}
