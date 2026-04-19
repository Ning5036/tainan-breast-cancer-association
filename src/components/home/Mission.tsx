"use client";

import { motion } from "framer-motion";
import { Shield, BookOpen, Users, HeartHandshake } from "lucide-react";

const missions = [
  {
    icon: Shield,
    title: "推廣乳癌篩檢",
    description: "提升台南地區民眾對乳癌篩檢的認知，促進早期發現、早期治療。",
  },
  {
    icon: BookOpen,
    title: "學術研究交流",
    description:
      "舉辦學術研討會，促進醫療專業人員間的知識交流與最新治療資訊分享。",
  },
  {
    icon: Users,
    title: "病友關懷支持",
    description:
      "建立病友支持網絡，提供心理諮詢與術後照護資訊，陪伴每一位患者。",
  },
  {
    icon: HeartHandshake,
    title: "社區健康教育",
    description:
      "深入社區推動健康教育活動，讓正確的乳癌防治觀念扎根於每個家庭。",
  },
];

export default function Mission() {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="text-xs font-body text-accent/60 tracking-widest uppercase mb-2">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal">
            學會宗旨
          </h2>
          <div className="mt-3 flex justify-center">
            <div className="w-12 h-0.5 bg-accent rounded-full" />
          </div>
          <p className="mt-4 text-charcoal/60 max-w-2xl mx-auto">
            以專業、關懷、行動，守護台南地區每一位女性的乳房健康
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white border border-secondary/30 card-hover"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary/30 to-secondary flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
