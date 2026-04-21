import { getArticles } from "@/lib/notion";
import EducationPageClient from "./EducationPageClient";
import type { ArticleItem } from "@/types";

export const revalidate = 3600;

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
