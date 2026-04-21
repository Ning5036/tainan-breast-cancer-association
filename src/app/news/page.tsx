import { getNews } from "@/lib/notion";
import NewsPageClient from "./NewsPageClient";
import type { NewsItem } from "@/types";

export const revalidate = 3600;

export const metadata = {
  title: "學會消息",
  description:
    "臺南市乳癌防治學會最新公告、學術研討會、乳癌篩檢活動、病友學習營等活動訊息與乳癌防治新聞。",
};

export default async function NewsPage() {
  let newsItems: NewsItem[];
  try {
    const result = await getNews(undefined, 50);
    newsItems = result.items;
  } catch {
    newsItems = [];
  }

  return <NewsPageClient news={newsItems} />;
}
