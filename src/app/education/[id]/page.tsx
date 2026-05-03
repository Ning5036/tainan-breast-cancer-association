import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import PageTransition from "@/components/shared/PageTransition";
import LikeButton from "@/components/ui/LikeButton";
import { getArticleDetail } from "@/lib/notion";
import { notFound } from "next/navigation";

const IMAGE_EXT_RE = /\.(jpe?g|png|gif|webp|svg|bmp|avif|heic|heif)(\?|$)/i;

function isImageUrl(url: string, name?: string): boolean {
  if (name && IMAGE_EXT_RE.test(name)) return true;
  try {
    return IMAGE_EXT_RE.test(new URL(url).pathname);
  } catch {
    return false;
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

  const imageAttachments = (article.attachments || []).filter((f) =>
    isImageUrl(f.url, f.name),
  );

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
            {imageAttachments.length > 0 ? (
              <div className="space-y-4">
                {imageAttachments.map((file, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={file.url}
                    alt={file.name || article.title}
                    className="w-full h-auto rounded-xl border border-secondary/30"
                  />
                ))}
              </div>
            ) : (
              <p className="text-charcoal/40 text-center py-10">
                本篇文章尚未上傳衛教單。
              </p>
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
