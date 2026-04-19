import { getArticles } from "@/lib/notion";
import EducationPageClient from "./EducationPageClient";
import type { ArticleItem } from "@/types";

export const revalidate = 3600;

export const metadata = {
  title: "衛教專區",
  description: "臺南市乳癌防治學會提供最新、最正確的乳癌防治知識。",
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
