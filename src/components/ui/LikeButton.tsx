"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp } from "lucide-react";

interface Props {
  pageId: string;
}

export default function LikeButton({ pageId }: Props) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(`like-${pageId}`);
    if (stored) {
      setLiked(true);
    }
    // Load count from API
    fetch(`/api/likes?id=${pageId}`)
      .then((res) => res.json())
      .then((data) => setCount(data.count || 0))
      .catch(() => {});
  }, [pageId]);

  const handleLike = async () => {
    if (liked) return;

    setLiked(true);
    setCount((prev) => prev + 1);
    localStorage.setItem(`like-${pageId}`, "true");

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
        whileTap={liked ? {} : { scale: 1.2 }}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${
          liked
            ? "bg-accent/10 border-accent/30 text-accent"
            : "bg-background border-secondary/40 text-charcoal/50 hover:border-accent/30 hover:text-accent hover:bg-accent/5 cursor-pointer"
        }`}
        disabled={liked}
        aria-label={liked ? "已點讚" : "點讚"}
      >
        <AnimatePresence mode="wait">
          {liked ? (
            <motion.div
              key="liked"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <ThumbsUp className="w-4 h-4 fill-accent" />
            </motion.div>
          ) : (
            <ThumbsUp className="w-4 h-4" />
          )}
        </AnimatePresence>
        <span>{liked ? "已按讚" : "覺得實用"}</span>
        {count > 0 && (
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              liked
                ? "bg-accent/15 text-accent"
                : "bg-charcoal/5 text-charcoal/40"
            }`}
          >
            {count}
          </span>
        )}
      </motion.button>
    </div>
  );
}
