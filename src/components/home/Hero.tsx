"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import PinkRibbon from "@/components/ui/PinkRibbon";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary/50 via-background to-primary/20 min-h-[80vh] flex items-center">
      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/40 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      {/* Pink ribbon decorations */}
      <div className="absolute top-16 right-[10%] opacity-[0.08]">
        <svg width="160" height="220" viewBox="0 0 120 180" fill="none">
          <path
            d="M60 0C60 0 20 40 20 80C20 120 60 100 60 100C60 100 100 120 100 80C100 40 60 0 60 0Z"
            fill="#E8A0B4"
          />
          <path d="M45 100L60 180L75 100" fill="#9B4F6B" opacity="0.6" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-[8%] opacity-[0.06] rotate-[-15deg]">
        <svg width="100" height="140" viewBox="0 0 120 180" fill="none">
          <path
            d="M60 0C60 0 20 40 20 80C20 120 60 100 60 100C60 100 100 120 100 80C100 40 60 0 60 0Z"
            fill="#9B4F6B"
          />
          <path d="M45 100L60 180L75 100" fill="#9B4F6B" opacity="0.4" />
        </svg>
      </div>

      <div className="page-container relative z-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating pink ribbon icon */}
            <motion.div
              className="flex justify-center mb-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/25">
                <PinkRibbon size={40} className="text-white" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-charcoal leading-tight tracking-tight">
              臺南市乳癌防治學會
            </h1>

            <p className="mt-4 text-xs md:text-sm font-body text-charcoal/40 tracking-[0.25em] uppercase">
              Tainan Breast Cancer Prevention Association
            </p>

            <div className="mt-6 flex justify-center">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
            </div>

            <p className="mt-6 text-lg md:text-xl text-charcoal/65 leading-relaxed max-w-xl mx-auto font-light">
              以愛與專業守護每一位女性的健康，
              <br />
              攜手推動乳癌防治，為生命點亮希望之光。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/about"
              className="btn-primary gap-2 text-base px-8 py-3.5 shadow-lg shadow-accent/20"
            >
              認識學會
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/education"
              className="btn-secondary gap-2 text-base px-8 py-3.5"
            >
              衛教專區
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-charcoal/25" />
      </motion.div>
    </section>
  );
}
