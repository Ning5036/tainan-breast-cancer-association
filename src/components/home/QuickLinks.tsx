"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  GraduationCap,
  Images,
  Download,
  ExternalLink,
} from "lucide-react";

const links = [
  {
    href: "/education",
    icon: GraduationCap,
    title: "衛教專區",
    description: "乳癌防治知識",
    color: "from-blue-50 to-blue-100/50",
  },
  {
    href: "/news",
    icon: FileText,
    title: "學會消息",
    description: "最新公告與活動",
    color: "from-green-50 to-green-100/50",
  },
  {
    href: "/resources",
    icon: Download,
    title: "資源下載",
    description: "表單與衛教資料",
    color: "from-orange-50 to-orange-100/50",
  },
  {
    href: "/gallery",
    icon: Images,
    title: "活動花絮",
    description: "歷年活動紀錄",
    color: "from-purple-50 to-purple-100/50",
  },
  {
    href: "/links",
    icon: ExternalLink,
    title: "相關連結",
    description: "合作夥伴資源",
    color: "from-pink-50 to-pink-100/50",
  },
];

export default function QuickLinks() {
  return (
    <section className="section-padding bg-white">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="text-xs font-body text-accent/60 tracking-widest uppercase mb-2">
            Quick Access
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal">
            快速連結
          </h2>
          <div className="mt-3 flex justify-center">
            <div className="w-12 h-0.5 bg-accent rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {links.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Link
                href={item.href}
                className="group flex flex-col items-center p-6 rounded-2xl bg-background border border-secondary/20 card-hover text-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-bold text-charcoal group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal/45 mt-1">
                  {item.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
