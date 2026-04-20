"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  User,
  Search,
  FlaskConical,
  Handshake,
  HeartPulse,
  Brain,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PageTransition from "@/components/shared/PageTransition";
import CategoryFilter from "@/components/ui/CategoryFilter";
import type { ArticleItem } from "@/types";

const categories = [
  "預防篩檢",
  "治療新知",
  "醫病共享(SDM)專區",
  "術後照護",
  "心理支持",
];

const categoryStyle: Record<string, { bg: string; icon: typeof Search }> = {
  預防篩檢: { bg: "from-blue-50 to-blue-100/60", icon: Search },
  治療新知: { bg: "from-green-50 to-emerald-100/60", icon: FlaskConical },
  術後照護: { bg: "from-amber-50 to-orange-100/60", icon: HeartPulse },
  "醫病共享(SDM)專區": { bg: "from-teal-50 to-cyan-100/60", icon: Handshake },
  心理支持: { bg: "from-violet-50 to-purple-100/60", icon: Brain },
};

interface Props {
  articles: ArticleItem[];
}

export default function EducationPageClient({ articles }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filtered = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

  return (
    <PageTransition>
      <PageHeader
        title="衛教專區"
        englishTitle="Health Education"
        subtitle="專業醫療團隊為您提供最新、最正確的乳癌防治知識"
      />

      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="mb-10">
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => {
              const style =
                categoryStyle[article.category] || categoryStyle["預防篩檢"];
              const IconComponent = style.icon;
              return (
                <Link
                  key={article.id}
                  href={`/education/${article.slug}`}
                  className="group block bg-background rounded-2xl overflow-hidden border border-secondary/30 card-hover"
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${style.bg} flex items-center justify-center border-b border-secondary/20 relative overflow-hidden`}
                  >
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full" />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/15 rounded-full" />
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-accent/70" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="category-badge">{article.category}</span>
                    </div>
                    <h3 className="text-base font-bold text-charcoal group-hover:text-accent transition-colors line-clamp-2 mb-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-charcoal/55 line-clamp-2 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-charcoal/40 pt-3 border-t border-secondary/20">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author || "編輯部"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.publishDate}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                <Search className="w-7 h-7 text-charcoal/20" />
              </div>
              <p className="text-charcoal/40 text-sm">目前沒有相關文章</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
