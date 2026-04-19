import Hero from "@/components/home/Hero";
import LatestNews from "@/components/home/LatestNews";
import Mission from "@/components/home/Mission";
import QuickLinks from "@/components/home/QuickLinks";
import VisitorCounter from "@/components/home/VisitorCounter";
import { getNews } from "@/lib/notion";

export const revalidate = 3600;

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
