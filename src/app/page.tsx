import Hero from "@/components/home/Hero";
import LatestNews from "@/components/home/LatestNews";
import Mission from "@/components/home/Mission";
import QuickLinks from "@/components/home/QuickLinks";
import VisitorCounter from "@/components/home/VisitorCounter";
import { getNews } from "@/lib/notion";

// ponytail: dynamic render so每次都拿新鮮的 Notion 簽章圖片網址（~1h 壽命），避免 ISR 快取凍住過期網址造成首頁縮圖破圖。低流量站成本無感；未來要衝流量再改成 server 端轉存圖片(R2/Blob)。
export const revalidate = 0;

export default async function HomePage() {
  let news;
  try {
    const result = await getNews(undefined, 3);
    news = result.items;
  } catch {
    news = undefined;
  }

  return (
    <>
      <Hero />
      <LatestNews news={news} />
      <Mission />
      <QuickLinks />
      <VisitorCounter />
    </>
  );
}
