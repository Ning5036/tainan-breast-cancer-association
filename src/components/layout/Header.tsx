"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import PinkRibbon from "@/components/ui/PinkRibbon";

const navItems = [
  { href: "/", label: "首頁" },
  { href: "/about", label: "關於學會" },
  { href: "/news", label: "學會消息" },
  { href: "/education", label: "衛教專區" },
  { href: "/resources", label: "資源下載" },
  { href: "/gallery", label: "活動花絮" },
  { href: "/links", label: "相關連結" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-secondary/40 shadow-sm">
      <div className="page-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — always visible */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
              <PinkRibbon size={30} className="text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm md:text-base font-bold text-charcoal leading-tight">
                臺南市乳癌防治學會
              </p>
              <p className="hidden sm:block text-[10px] md:text-xs text-charcoal/50 font-body">
                Tainan Breast Cancer Prevention Association
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-accent bg-secondary/20"
                      : "text-charcoal/65 hover:text-accent hover:bg-secondary/20"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2 rounded-xl hover:bg-secondary/30 transition-colors"
            aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-charcoal" />
            ) : (
              <Menu className="w-5 h-5 text-charcoal" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-secondary/30 bg-white/98 backdrop-blur-md overflow-hidden"
          >
            <div className="page-container py-3 space-y-0.5">
              {navItems.map((item, index) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-secondary/40 text-accent"
                          : "text-charcoal/70 hover:bg-secondary/15 hover:text-accent"
                      }`}
                    >
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      )}
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
