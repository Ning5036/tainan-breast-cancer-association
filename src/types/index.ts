export interface NewsItem {
  id: string;
  title: string;
  category: "公告" | "活動" | "新聞";
  publishDate: string;
  coverImage: string | null;
  excerpt: string;
  slug: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: "預防篩檢" | "治療新知" | "術後照護" | "心理支持";
  author: string;
  publishDate: string;
  excerpt: string;
  thumbnail: string | null;
  slug: string;
}

export interface DownloadItem {
  id: string;
  fileName: string;
  fileType: "PDF" | "Word" | "其他";
  description: string;
  uploadDate: string;
  fileUrl: string;
}

export interface GalleryItem {
  id: string;
  photoTitle: string;
  eventName: string;
  eventDate: string;
  year: string;
  category: "學術活動" | "公益活動" | "受獎紀錄" | "其他";
  caption: string;
  photoUrl: string;
}

export interface LinkItem {
  name: string;
  url: string;
  logo: string;
  category: "政府機關" | "醫療院所" | "病友團體" | "國際組織";
}

export interface RichTextBlock {
  type: string;
  content: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    color?: string;
  };
}

export interface NotionPageContent {
  title: string;
  blocks: RichTextBlock[];
}
