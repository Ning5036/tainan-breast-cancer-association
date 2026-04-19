"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, FileText } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PageTransition from "@/components/shared/PageTransition";
import CategoryFilter from "@/components/ui/CategoryFilter";
import type { NewsItem } from "@/types";

const categories = ["公告", "活動", "新聞"];

const categoryColor: Record<string, string> = {
  公告: "bg-blue-100 text-blue-700",
  活動: "bg-emerald-100 text-emerald-700",
  新聞: "bg-amber-100 text-amber-700",
};

interface Props {
  news: NewsItem[];
}

export default function NewsPageClient({ news }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filtered = selectedCategory
    ? news.filter((n) => n.category === selectedCategory)
    : news;

  return (
    <PageTransition>
      <PageHeader
        title="學會消息"
        englishTitle="News & Announcements"
        subtitle="最新公告、活動訊息與乳癌防治新聞"
      />

      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="mb-8">
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          <div className="space-y-5 max-w-4xl mx-auto">
            {filtered.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group block bg-background rounded-2xl border border-secondary/30 overflow-hidden card-hover"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Cover Image */}
                  {item.coverImage && (
                    <div className="sm:w-48 md:w-56 h-40 sm:h-auto relative shrink-0 overflow-hidden">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 224px"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            categoryColor[item.category] ||
                            "bg-secondary text-accent"
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-charcoal/40">
                          <Calendar className="w-3 h-3" />
                          {item.publishDate}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-charcoal group-hover:text-accent transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-sm text-accent font-medium">
                      閱讀更多
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                  <FileText className="w-7 h-7 text-charcoal/20" />
                </div>
                <p className="text-charcoal/40 text-sm">目前沒有相關消息</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
