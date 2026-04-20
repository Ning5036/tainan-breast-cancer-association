import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PageTransition from "@/components/shared/PageTransition";
import PinkRibbon from "@/components/ui/PinkRibbon";
import {
  Target,
  Eye,
  Users,
  Award,
  BookOpen,
  Stethoscope,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "關於學會",
  description: "認識臺南市乳癌防治學會——學會介紹、宗旨及理事長的話。",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHeader
        title="關於學會"
        englishTitle="About Us"
        subtitle="以專業與愛心，守護台南地區的乳房健康"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal">
                學會介紹
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-charcoal/70 leading-[1.9] space-y-5">
              <p>
                臺南市乳癌防治學會成立於民國114年，由台南地區關心乳癌防治的醫療專業人員共同發起創立。學會以促進乳癌防治學術研究、提升醫療品質、推廣民眾衛生教育為宗旨，致力於結合醫學專業與社區關懷，為台南市民的健康把關。
              </p>
              <p>
                自創立以來，本會持續舉辦學術研討會、社區篩檢活動、病友支持團體及衛教宣導等多元活動，並與國內外醫療機構及學術團體保持密切合作交流，積極引進最新的乳癌診療知識與技術，嘉惠台南地區的醫療同仁及民眾。
              </p>
              <p>
                我們相信，透過早期篩檢與正確的醫療觀念推廣，能有效降低乳癌對女性健康的威脅。學會將持續秉持「預防勝於治療」的理念，攜手各界力量，共同為台南地區的乳癌防治努力。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal">
                學會宗旨
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Eye,
                  title: "推廣乳癌篩檢意識",
                  text: "透過社區宣導與媒體推廣，提升民眾對定期乳癌篩檢的重視，落實早期發現、早期治療。",
                },
                {
                  icon: Stethoscope,
                  title: "促進學術研究交流",
                  text: "定期舉辦國內外學術研討會，邀請專家分享最新研究成果與治療趨勢，提升醫療專業水準。",
                },
                {
                  icon: Users,
                  title: "建立病友支持網絡",
                  text: "成立病友關懷團體，提供心理支持與照護資訊，陪伴患者與家屬共同面對治療旅程。",
                },
                {
                  icon: Award,
                  title: "深耕社區健康教育",
                  text: "結合地方資源，深入社區與校園推動乳癌防治教育，讓正確的健康觀念普及每一個角落。",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-white rounded-2xl border border-secondary/30 card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* President's Message */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <PinkRibbon size={30} className="text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal">
                理事長的話
              </h2>
            </div>

            <div className="bg-gradient-to-br from-background to-secondary/15 rounded-2xl border border-secondary/30 overflow-hidden shadow-sm">
              <div className="p-7 md:p-9">
                <Quote className="w-6 h-6 text-primary/30 mb-4" />

                <div className="text-sm text-charcoal/65 leading-[1.9] space-y-3">
                  <p>各位關心乳癌防治的朋友們，大家好：</p>
                  <p>
                    很榮幸能擔任臺南市乳癌防治學會理事長。乳癌是台灣女性最常見的癌症，但透過定期篩檢與早期治療，存活率可大幅提升。本會成立以來，一直致力於推動乳癌防治的學術研究與衛教推廣，期盼能讓更多民眾認識乳癌、重視篩檢。
                  </p>
                  <p>
                    未來，我們將持續結合醫療專業與社區力量，舉辦更多優質的學術活動與公益篩檢，並強化病友支持服務。期待與所有關心此議題的夥伴們攜手合作，共同守護台南地區女性的健康。
                  </p>
                  <p className="text-accent font-medium pt-1">
                    讓我們一起，為每一個生命點亮希望。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
