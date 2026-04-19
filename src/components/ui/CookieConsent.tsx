"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="page-container">
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-charcoal/10 border border-secondary/40 p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Cookie className="w-7 h-7 text-accent shrink-0 hidden sm:block" />
              <div className="flex-1 pr-8 sm:pr-0">
                <p className="text-sm text-charcoal/80 leading-relaxed">
                  本網站使用 Cookie 及相關技術來改善您的瀏覽體驗、分析網站流量。
                  繼續使用本網站即表示您同意我們使用 Cookie。
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={decline}
                  className="px-4 py-2 text-sm text-charcoal/50 hover:text-charcoal rounded-full hover:bg-charcoal/5 transition-colors"
                >
                  拒絕
                </button>
                <button
                  onClick={accept}
                  className="btn-primary text-sm px-5 py-2.5"
                >
                  接受
                </button>
              </div>
              {/* Mobile close button — positioned relative to this container */}
              <button
                onClick={decline}
                className="absolute top-4 right-4 sm:hidden p-1 text-charcoal/30 hover:text-charcoal transition-colors"
                aria-label="關閉"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
