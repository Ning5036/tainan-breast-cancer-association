import { getGallery } from "@/lib/notion";
import GalleryPageClient from "./GalleryPageClient";
import type { GalleryItem } from "@/types";

// ponytail: dynamic render so每次都拿新鮮的 Notion 簽章圖片網址（~1h 壽命），避免 ISR 快取凍住過期網址造成活動花絮縮圖破圖。低流量站成本無感；未來要衝流量再改成 server 端轉存圖片(R2/Blob)。
export const revalidate = 0;

export const metadata = {
  title: "活動花絮",
  description:
    "臺南市乳癌防治學會歷年學術研討會、社區篩檢活動、病友學習營及公益活動精彩照片紀錄。",
};

export default async function GalleryPage() {
  let photos: GalleryItem[];
  try {
    photos = await getGallery();
  } catch {
    photos = [];
  }

  return <GalleryPageClient photos={photos} />;
}
