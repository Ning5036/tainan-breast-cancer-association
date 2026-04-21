import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import PageTransition from "@/components/shared/PageTransition";

export const metadata: Metadata = {
  title: "相關連結",
  description:
    "乳癌防治相關政府機關、雲嘉南醫療院所、病友團體及國際組織連結，由臺南市乳癌防治學會整理提供。",
};

interface LinkGroup {
  category: string;
  links: { name: string; url: string; description: string }[];
}

const linkGroups: LinkGroup[] = [
  {
    category: "政府機關",
    links: [
      {
        name: "衛生福利部國民健康署",
        url: "https://www.hpa.gov.tw",
        description: "癌症篩檢政策與補助資訊",
      },
      {
        name: "台南市政府衛生局",
        url: "https://health.tainan.gov.tw",
        description: "地方衛生政策與篩檢活動",
      },
      {
        name: "衛生福利部",
        url: "https://www.mohw.gov.tw",
        description: "國家衛生福利政策",
      },
      {
        name: "國家衛生研究院",
        url: "https://www.nhri.edu.tw",
        description: "醫學研究與癌症防治",
      },
    ],
  },
  {
    category: "醫療院所",
    links: [
      {
        name: "國立成功大學醫學院附設醫院",
        url: "https://www.hosp.ncku.edu.tw",
        description: "雲嘉南地區醫學中心",
      },
      {
        name: "奇美醫療財團法人奇美醫院",
        url: "https://www.chimei.org.tw",
        description: "雲嘉南地區醫學中心",
      },
      {
        name: "台南市立安南醫院",
        url: "https://www.tmanh.org.tw",
        description: "區域教學醫院",
      },
    ],
  },
  {
    category: "病友團體",
    links: [
      {
        name: "中華民國乳癌病友協會",
        url: "https://www.tbca-ngo.org.tw",
        description: "全國性乳癌病友支持組織",
      },
      {
        name: "財團法人乳癌防治基金會",
        url: "https://www.breastcf.org.tw",
        description: "乳癌防治推廣與病友服務",
      },
      {
        name: "台灣癌症基金會",
        url: "https://www.canceraway.org.tw",
        description: "癌症防治與病友關懷",
      },
    ],
  },
  {
    category: "國際組織",
    links: [
      {
        name: "World Health Organization (WHO)",
        url: "https://www.who.int",
        description: "世界衛生組織",
      },
      {
        name: "American Cancer Society",
        url: "https://www.cancer.org",
        description: "美國癌症學會",
      },
      {
        name: "Breast Cancer Research Foundation",
        url: "https://www.bcrf.org",
        description: "乳癌研究基金會",
      },
      {
        name: "Susan G. Komen Foundation",
        url: "https://www.komen.org",
        description: "國際乳癌防治組織",
      },
    ],
  },
];

const categoryColors: Record<string, string> = {
  政府機關: "border-l-blue-400",
  醫療院所: "border-l-green-400",
  病友團體: "border-l-pink-400",
  國際組織: "border-l-purple-400",
};

export default function LinksPage() {
  return (
    <PageTransition>
      <PageHeader
        title="相關連結"
        englishTitle="Related Links"
        subtitle="乳癌防治相關機構與資源"
      />

      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="max-w-5xl mx-auto space-y-12">
            {linkGroups.map((group) => (
              <div key={group.category}>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-charcoal mb-6 flex items-center gap-2">
                  <div className="w-2 h-6 rounded-full bg-accent" />
                  {group.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group block p-5 rounded-xl bg-background border border-secondary/30 border-l-4 ${
                        categoryColors[group.category] || "border-l-accent"
                      } card-hover`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-charcoal group-hover:text-accent transition-colors text-sm md:text-base">
                            {link.name}
                          </h3>
                          <p className="text-xs text-charcoal/50 mt-1">
                            {link.description}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-charcoal/30 group-hover:text-accent shrink-0 transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
