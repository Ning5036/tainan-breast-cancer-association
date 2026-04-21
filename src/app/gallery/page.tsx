import { getGallery } from "@/lib/notion";
import GalleryPageClient from "./GalleryPageClient";
import type { GalleryItem } from "@/types";

export const revalidate = 3600;

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
