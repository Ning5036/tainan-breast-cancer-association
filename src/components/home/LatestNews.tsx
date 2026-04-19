"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import type { NewsItem } from "@/types";

interface Props {
  news?: NewsItem[];
}

const categoryColor: Record<string, string> = {
  公告: "bg-blue-100 text-blue-700",
  活動: "bg-emerald-100 text-emerald-700",
  新聞: "bg-amber-100 text-amber-700",
};

export default function LatestNews({ news }: Props) {
  const items = news && news.length > 0 ? news.slice(0, 3) : [];

  if (items.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="text-xs font-body text-accent/60 tracking-widest uppercase mb-2">
            Latest News
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal">
            最新消息
          </h2>
          <div className="mt-3 flex justify-center">
            <div className="w-12 h-0.5 bg-accent rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/news/${item.slug}`}
                className="group block h-full bg-background rounded-2xl overflow-hidden card-hover border border-secondary/30"
              >
                {/* Cover Image or gradient bar */}
                {item.coverImage ? (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="h-1.5 bg-gradient-to-r from-primary via-accent/60 to-primary" />
                )}

                <div className="p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 text-[11px] font-medium rounded-full ${
                        categoryColor[item.category] ||
                        "bg-secondary text-accent"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-charcoal/35">
                      <Calendar className="w-3 h-3" />
                      {item.publishDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <div className="mt-5 pt-4 border-t border-secondary/20 flex items-center gap-1 text-sm text-accent font-medium">
                    閱讀更多
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/news" className="btn-secondary">
            查看所有消息
          </Link>
        </div>
      </div>
    </section>
  );
}
