"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";

interface Props {
  pageId: string;
}

export default function LikeButton({ pageId }: Props) {
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetch(`/api/likes?id=${pageId}`)
      .then((res) => res.json())
      .then((data) => setCount(data.count || 0))
      .catch(() => {});
  }, [pageId]);

  const handleLike = async () => {
    setCount((prev) => prev + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    try {
      await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pageId }),
      });
    } catch {
      // Silently handle
    }
  };

  return (
    <div className="flex items-center gap-3">
      <motion.button
        onClick={handleLike}
        whileTap={{ scale: 1.15 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300
                   bg-background border-secondary/40 text-charcoal/60 hover:border-accent/30 hover:text-accent hover:bg-accent/5 cursor-pointer"
        aria-label="點讚"
      >
        <motion.div
          animate={animating ? { scale: [1, 1.4, 1], rotate: [0, -15, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <ThumbsUp
            className={`w-4 h-4 transition-colors ${animating ? "text-accent fill-accent" : ""}`}
          />
        </motion.div>
        <span>覺得實用</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-bold min-w-[24px] text-center">
          {count}
        </span>
      </motion.button>
    </div>
  );
}
