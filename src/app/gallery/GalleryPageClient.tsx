"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Camera, ImageOff } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PageTransition from "@/components/shared/PageTransition";
import CategoryFilter from "@/components/ui/CategoryFilter";
import Lightbox from "@/components/ui/Lightbox";
import type { GalleryItem } from "@/types";

const categories = ["學術活動", "公益活動", "受獎紀錄", "其他"];

const placeholderGradients = [
  "from-primary/20 via-secondary/40 to-primary/10",
  "from-secondary/50 via-primary/15 to-secondary/30",
  "from-accent/10 via-primary/20 to-secondary/30",
  "from-primary/15 via-accent/10 to-secondary/40",
  "from-secondary/40 via-primary/25 to-accent/10",
  "from-accent/8 via-secondary/35 to-primary/15",
];

const heights = ["h-52", "h-44", "h-56", "h-48", "h-60", "h-44"];

interface Props {
  photos: GalleryItem[];
}

export default function GalleryPageClient({ photos }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = selectedCategory
    ? photos.filter((g) => g.category === selectedCategory)
    : photos;

  return (
    <PageTransition>
      <PageHeader
        title="活動花絮"
        englishTitle="Photo Gallery"
        subtitle="紀錄學會每一個精彩時刻"
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

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="bg-background rounded-2xl overflow-hidden border border-secondary/25 card-hover">
                  {/* Photo or placeholder */}
                  {item.photoUrl ? (
                    <div
                      className={`relative ${heights[index % heights.length]} overflow-hidden`}
                    >
                      <Image
                        src={item.photoUrl}
                        alt={item.photoTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div
                      className={`bg-gradient-to-br ${
                        placeholderGradients[
                          index % placeholderGradients.length
                        ]
                      } ${heights[index % heights.length]} flex items-center justify-center relative overflow-hidden`}
                    >
                      <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/15 rounded-full" />
                      <div className="absolute bottom-6 left-6 w-12 h-12 border border-white/10 rounded-lg rotate-12" />
                      <div className="relative flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-white/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Camera className="w-5 h-5 text-accent/50" />
                        </div>
                        <p className="text-xs text-accent/35 font-medium">
                          {item.photoTitle}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                    <span className="category-badge text-[10px] mb-2 inline-block">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-charcoal group-hover:text-accent transition-colors leading-snug">
                      {item.eventName}
                    </h3>
                    <p className="text-xs text-charcoal/45 mt-1.5 leading-relaxed">
                      {item.caption}
                    </p>
                    <p className="text-[11px] text-charcoal/30 mt-2.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.eventDate}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/30 flex items-center justify-center mb-4">
                <ImageOff className="w-7 h-7 text-charcoal/20" />
              </div>
              <p className="text-charcoal/40 text-sm">目前沒有相關照片</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox
            src={
              filtered[lightboxIndex].photoUrl ||
              `data:image/svg+xml,${encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect fill="#F5D0DC" width="800" height="600"/><text x="400" y="300" text-anchor="middle" fill="#9B4F6B" font-size="20">照片預覽</text></svg>',
              )}`
            }
            alt={filtered[lightboxIndex].photoTitle}
            caption={`${filtered[lightboxIndex].eventName} — ${filtered[lightboxIndex].caption}`}
            onClose={() => setLightboxIndex(null)}
            onPrev={
              lightboxIndex > 0
                ? () => setLightboxIndex(lightboxIndex - 1)
                : undefined
            }
            onNext={
              lightboxIndex < filtered.length - 1
                ? () => setLightboxIndex(lightboxIndex + 1)
                : undefined
            }
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
