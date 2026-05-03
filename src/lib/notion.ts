import { Client } from "@notionhq/client";
import type { NewsItem, ArticleItem, DownloadItem, GalleryItem } from "@/types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Helper to extract plain text from Notion rich text
function getPlainText(richText: any[]): string {
  if (!richText || !Array.isArray(richText)) return "";
  return richText.map((t: any) => t.plain_text).join("");
}

// Helper to extract file URL from Notion file property
function getFileUrl(files: any[]): string | null {
  if (!files || files.length === 0) return null;
  const file = files[0];
  if (file.type === "file") return file.file.url;
  if (file.type === "external") return file.external.url;
  return null;
}

// Helper to extract all files (url + name) from a Notion files property
function getAllFiles(files: any[]): Array<{ url: string; name: string }> {
  if (!files || !Array.isArray(files)) return [];
  return files
    .map((file: any) => {
      const url =
        file.type === "file"
          ? file.file?.url
          : file.type === "external"
            ? file.external?.url
            : null;
      if (!url) return null;
      return { url, name: file.name || "" };
    })
    .filter((f): f is { url: string; name: string } => f !== null);
}

// Helper to extract select value
function getSelect(select: any): string {
  return select?.name || "";
}

// Convert slug (no dashes) back to Notion page ID format (with dashes)
function slugToPageId(slug: string): string {
  if (slug.includes("-")) return slug;
  return [
    slug.slice(0, 8),
    slug.slice(8, 12),
    slug.slice(12, 16),
    slug.slice(16, 20),
    slug.slice(20),
  ].join("-");
}

// ==================== NEWS ====================
// Properties: 消息主題名稱(title), 類型(select), 發布日期(date), CoverImage(files), 發佈狀態(checkbox)

export async function getNews(
  category?: string,
  pageSize: number = 10,
  startCursor?: string,
): Promise<{ items: NewsItem[]; hasMore: boolean; nextCursor: string | null }> {
  const dbId = process.env.NOTION_NEWS_DB;
  if (!dbId) return { items: [], hasMore: false, nextCursor: null };

  const filter: any = {
    and: [{ property: "發佈狀態", checkbox: { equals: true } }],
  };

  if (category) {
    filter.and.push({
      property: "類型",
      select: { equals: category },
    });
  }

  const response = await notion.databases.query({
    database_id: dbId,
    filter,
    sorts: [{ property: "發布日期", direction: "descending" }],
    page_size: pageSize,
    start_cursor: startCursor || undefined,
  });

  const items: NewsItem[] = response.results.map((page: any) => ({
    id: page.id,
    title: getPlainText(page.properties["消息主題名稱"]?.title),
    category: getSelect(
      page.properties["類型"]?.select,
    ) as NewsItem["category"],
    publishDate: page.properties["發布日期"]?.date?.start || "",
    coverImage: getFileUrl(page.properties["CoverImage"]?.files),
    excerpt: getPlainText(page.properties["Content"]?.rich_text).substring(
      0,
      100,
    ),
    slug: page.id.replace(/-/g, ""),
  }));

  return {
    items,
    hasMore: response.has_more,
    nextCursor: response.next_cursor,
  };
}

export async function getNewsDetail(slug: string) {
  const pageId = slugToPageId(slug);
  const page = await notion.pages.retrieve({ page_id: pageId });
  const blocks = await notion.blocks.children.list({ block_id: pageId });

  const pageData = page as any;
  // Content can be in the "Content" rich_text field or in page blocks
  const richTextContent = getPlainText(
    pageData.properties["Content"]?.rich_text,
  );

  return {
    title: getPlainText(pageData.properties["消息主題名稱"]?.title),
    category: getSelect(pageData.properties["類型"]?.select),
    publishDate: pageData.properties["發布日期"]?.date?.start || "",
    coverImage: getFileUrl(pageData.properties["CoverImage"]?.files),
    content: richTextContent,
    blocks: blocks.results,
  };
}

// ==================== ARTICLES ====================
// Properties: 衛教主題名稱(title), 類型(select), 作者名稱(rich_text), 發布日期(date),
//             摘錄重點(rich_text), 預覽縮圖(files), 發布狀態(checkbox)

export async function getArticles(
  category?: string,
  pageSize: number = 12,
  startCursor?: string,
): Promise<{
  items: ArticleItem[];
  hasMore: boolean;
  nextCursor: string | null;
}> {
  const dbId = process.env.NOTION_ARTICLES_DB;
  if (!dbId) return { items: [], hasMore: false, nextCursor: null };

  const filter: any = {
    and: [{ property: "發布狀態", checkbox: { equals: true } }],
  };

  if (category) {
    filter.and.push({
      property: "類型",
      select: { equals: category },
    });
  }

  const response = await notion.databases.query({
    database_id: dbId,
    filter,
    sorts: [{ property: "發布日期", direction: "descending" }],
    page_size: pageSize,
    start_cursor: startCursor || undefined,
  });

  const items: ArticleItem[] = response.results.map((page: any) => ({
    id: page.id,
    title: getPlainText(page.properties["衛教主題名稱"]?.title),
    category: getSelect(
      page.properties["類型"]?.select,
    ) as ArticleItem["category"],
    author: getPlainText(page.properties["作者名稱"]?.rich_text),
    publishDate: page.properties["發布日期"]?.date?.start || "",
    excerpt: getPlainText(page.properties["摘錄重點"]?.rich_text),
    thumbnail: getFileUrl(page.properties["預覽縮圖"]?.files),
    slug: page.id.replace(/-/g, ""),
  }));

  return {
    items,
    hasMore: response.has_more,
    nextCursor: response.next_cursor,
  };
}

export async function getArticleDetail(slug: string) {
  const pageId = slugToPageId(slug);
  const page = await notion.pages.retrieve({ page_id: pageId });
  const blocks = await notion.blocks.children.list({ block_id: pageId });

  const pageData = page as any;
  const richTextContent = getPlainText(
    pageData.properties["衛教內容"]?.rich_text || [],
  );

  return {
    title: getPlainText(pageData.properties["衛教主題名稱"]?.title),
    category: getSelect(pageData.properties["類型"]?.select),
    author: getPlainText(pageData.properties["作者名稱"]?.rich_text),
    publishDate: pageData.properties["發布日期"]?.date?.start || "",
    thumbnail: getFileUrl(pageData.properties["預覽縮圖"]?.files),
    attachments: getAllFiles(pageData.properties["衛教檔案"]?.files),
    content: richTextContent,
    blocks: blocks.results,
  };
}

// ==================== DOWNLOADS ====================
// Properties: 檔案名稱(title), 上傳檔案類型(select), 檔案簡單描述(rich_text),
//             檔案上傳時間(date), 資源檔案內容(files)

export async function getDownloads(): Promise<DownloadItem[]> {
  const dbId = process.env.NOTION_DOWNLOADS_DB;
  if (!dbId) return [];

  const response = await notion.databases.query({
    database_id: dbId,
    sorts: [{ property: "檔案上傳時間", direction: "descending" }],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    fileName: getPlainText(page.properties["檔案名稱"]?.title),
    fileType: getSelect(
      page.properties["上傳檔案類型"]?.select,
    ) as DownloadItem["fileType"],
    description: getPlainText(page.properties["檔案簡單描述"]?.rich_text),
    uploadDate: page.properties["檔案上傳時間"]?.date?.start || "",
    fileUrl: getFileUrl(page.properties["資源檔案內容"]?.files) || "",
  }));
}

// ==================== GALLERY ====================
// Properties: PhotoTitle(title), 活動名稱(rich_text), 活動日期(date), 年度(select),
//             活動類型(select), 照片小摘要(Caption)(rich_text), Photo(files), 發布狀態(checkbox)

export async function getGallery(
  category?: string,
  year?: string,
): Promise<GalleryItem[]> {
  const dbId = process.env.NOTION_GALLERY_DB;
  if (!dbId) return [];

  const filter: any = {
    and: [{ property: "發布狀態", checkbox: { equals: true } }],
  };

  if (category) {
    filter.and.push({
      property: "活動類型",
      select: { equals: category },
    });
  }

  if (year) {
    filter.and.push({
      property: "年度",
      select: { equals: year },
    });
  }

  const response = await notion.databases.query({
    database_id: dbId,
    filter,
    sorts: [{ property: "活動日期", direction: "descending" }],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    photoTitle: getPlainText(page.properties["PhotoTitle"]?.title),
    eventName: getPlainText(page.properties["活動名稱"]?.rich_text),
    eventDate: page.properties["活動日期"]?.date?.start || "",
    year: getSelect(page.properties["年度"]?.select),
    category: getSelect(
      page.properties["活動類型"]?.select,
    ) as GalleryItem["category"],
    caption: getPlainText(page.properties["照片小摘要(Caption)"]?.rich_text),
    photoUrl: getFileUrl(page.properties["Photo"]?.files) || "",
  }));
}

// ==================== NOTION BLOCKS RENDERER ====================

export function renderNotionBlock(block: any): {
  type: string;
  content: string;
  annotations?: any;
  url?: string;
  caption?: string;
  language?: string;
  fileName?: string;
} {
  const type = block.type;

  switch (type) {
    case "paragraph":
      return {
        type: "paragraph",
        content: getPlainText(block.paragraph.rich_text),
      };
    case "heading_1":
      return {
        type: "heading_1",
        content: getPlainText(block.heading_1.rich_text),
      };
    case "heading_2":
      return {
        type: "heading_2",
        content: getPlainText(block.heading_2.rich_text),
      };
    case "heading_3":
      return {
        type: "heading_3",
        content: getPlainText(block.heading_3.rich_text),
      };
    case "bulleted_list_item":
      return {
        type: "bulleted_list_item",
        content: getPlainText(block.bulleted_list_item.rich_text),
      };
    case "numbered_list_item":
      return {
        type: "numbered_list_item",
        content: getPlainText(block.numbered_list_item.rich_text),
      };
    case "image": {
      const url =
        block.image.type === "file"
          ? block.image.file.url
          : block.image.external.url;
      return {
        type: "image",
        content: "",
        url,
        caption: getPlainText(block.image.caption),
      };
    }
    case "quote":
      return {
        type: "quote",
        content: getPlainText(block.quote.rich_text),
      };
    case "divider":
      return { type: "divider", content: "" };
    case "code":
      return {
        type: "code",
        content: getPlainText(block.code.rich_text),
        language: block.code.language,
      };
    case "pdf": {
      const url =
        block.pdf.type === "file" ? block.pdf.file.url : block.pdf.external.url;
      return {
        type: "pdf",
        content: "",
        url,
        caption: getPlainText(block.pdf.caption),
      };
    }
    case "file": {
      const url =
        block.file.type === "file"
          ? block.file.file.url
          : block.file.external.url;
      const fileName = block.file.name || "";
      return {
        type: "file",
        content: "",
        url,
        fileName,
        caption: getPlainText(block.file.caption),
      };
    }
    case "embed": {
      return {
        type: "embed",
        content: "",
        url: block.embed.url,
        caption: getPlainText(block.embed.caption),
      };
    }
    case "bookmark": {
      return {
        type: "bookmark",
        content: "",
        url: block.bookmark.url,
        caption: getPlainText(block.bookmark.caption),
      };
    }
    default:
      return { type: "unsupported", content: "" };
  }
}
