import { getArticles } from "@/lib/notion";
import EducationPageClient from "./EducationPageClient";
import type { ArticleItem } from "@/types";

// ponytail: dynamic render so每次都拿新鮮的 Notion 簽章圖片網址（~1h 壽命），避免 ISR 快取凍住過期網址造成衛教專區縮圖破圖。低流量站成本無感；未來要衝流量再改成 server 端轉存圖片(R2/Blob)。
export const revalidate = 0;

export const metadata = {
  title: "衛教專區",
  description:
    "乳癌預防篩檢、治療新知、術後照護、心理支持及醫病共享決策(SDM)專區。由臺南市乳癌防治學會專業醫療團隊提供最新乳癌防治衛教知識。",
};

export default async function EducationPage() {
  let articles: ArticleItem[];
  try {
    const result = await getArticles(undefined, 50);
    articles = result.items;
  } catch {
    articles = [];
  }

  return <EducationPageClient articles={articles} />;
}
