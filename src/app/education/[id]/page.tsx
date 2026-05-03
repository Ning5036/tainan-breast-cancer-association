import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  ExternalLink,
} from "lucide-react";
import PageTransition from "@/components/shared/PageTransition";
import NotionRenderer from "@/components/ui/NotionRenderer";
import LikeButton from "@/components/ui/LikeButton";
import { getArticleDetail } from "@/lib/notion";
import { notFound } from "next/navigation";

function fileNameFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname;
    return decodeURIComponent(path.split("/").pop() || "下載檔案");
  } catch {
    return "下載檔案";
  }
}

export const revalidate = 3600;

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const article = await getArticleDetail(params.id);
    return {
      title: article.title,
      description: `臺南市乳癌防治學會衛教專區 — ${article.title}`,
    };
  } catch {
    return { title: "衛教文章" };
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  let article;
  try {
    article = await getArticleDetail(params.id);
  } catch {
    notFound();
  }

  const contentParagraphs = article.content
    ? article.content.split("\n").filter((line: string) => line.trim() !== "")
    : [];

  const hasBlocks = article.blocks && article.blocks.length > 0;
  const hasContent = contentParagraphs.length > 0;

  return (
    <PageTransition>
      <div className="bg-gradient-to-r from-secondary/60 via-primary/20 to-secondary/40 py-8 md:py-12">
        <div className="page-container">
          <Link
            href="/education"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回衛教專區
          </Link>
          <div className="flex items-center gap-3 mb-3">
            {article.category && (
              <span className="category-badge">{article.category}</span>
            )}
            {article.author && (
              <span className="flex items-center gap-1 text-xs text-charcoal/50">
                <User className="w-3 h-3" />
                {article.author}
              </span>
            )}
            {article.publishDate && (
              <span className="flex items-center gap-1 text-xs text-charcoal/50">
                <Calendar className="w-3 h-3" />
                {article.publishDate}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-charcoal">
            {article.title}
          </h1>
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="page-container">
          <article className="max-w-3xl mx-auto">
            {hasBlocks && <NotionRenderer blocks={article.blocks} />}

            {hasContent && (
              <div className="prose prose-lg max-w-none prose-headings:text-charcoal prose-p:text-charcoal/80 space-y-4">
                {contentParagraphs.map((paragraph: string, index: number) => (
                  <p key={index} className="whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {!hasBlocks && !hasContent && (
              <p className="text-charcoal/40 text-center py-10">
                本篇文章尚未新增內容。
              </p>
            )}

            {article.attachments && article.attachments.length > 0 && (
              <section className="mt-10 pt-6 border-t border-secondary/30">
                <h2 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  衛教檔案下載
                </h2>
                <ul className="space-y-3">
                  {article.attachments.map((file, i) => {
                    const displayName = file.name || fileNameFromUrl(file.url);
                    return (
                      <li key={i}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 rounded-xl border border-secondary/40 bg-secondary/10 hover:bg-secondary/20 hover:border-accent/40 transition-colors group"
                        >
                          <span className="flex-shrink-0 w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                            <FileText className="w-5 h-5" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block text-sm font-medium text-charcoal truncate">
                              {displayName}
                            </span>
                            <span className="block text-xs text-charcoal/50 mt-0.5">
                              點擊開啟或下載
                            </span>
                          </span>
                          <ExternalLink className="w-4 h-4 text-charcoal/40 group-hover:text-accent transition-colors flex-shrink-0" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            <div className="mt-10 mb-10">
              <LikeButton pageId={params.id} />
            </div>

            <div className="pt-6 border-t border-secondary/30">
              <Link href="/education" className="btn-secondary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回列表
              </Link>
            </div>
          </article>
        </div>
      </section>
    </PageTransition>
  );
}
