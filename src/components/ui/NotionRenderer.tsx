"use client";

import Image from "next/image";
import { FileText, ExternalLink } from "lucide-react";
import { renderNotionBlock } from "@/lib/notion";

interface Props {
  blocks: any[];
}

function fileNameFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname;
    const last = path.split("/").pop() || "";
    return decodeURIComponent(last);
  } catch {
    return "下載檔案";
  }
}

export default function NotionRenderer({ blocks }: Props) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-charcoal prose-p:text-charcoal/80 prose-a:text-accent">
      {blocks.map((block: any) => {
        const rendered = renderNotionBlock(block);
        const key = block.id;

        switch (rendered.type) {
          case "paragraph":
            return rendered.content ? (
              <p key={key}>{rendered.content}</p>
            ) : (
              <br key={key} />
            );
          case "heading_1":
            return <h1 key={key}>{rendered.content}</h1>;
          case "heading_2":
            return <h2 key={key}>{rendered.content}</h2>;
          case "heading_3":
            return <h3 key={key}>{rendered.content}</h3>;
          case "bulleted_list_item":
            return (
              <ul key={key}>
                <li>{rendered.content}</li>
              </ul>
            );
          case "numbered_list_item":
            return (
              <ol key={key}>
                <li>{rendered.content}</li>
              </ol>
            );
          case "image":
            return (
              <figure key={key} className="my-6">
                <div className="relative w-full h-80 rounded-lg overflow-hidden">
                  <Image
                    src={rendered.url!}
                    alt={rendered.caption || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                {rendered.caption && (
                  <figcaption className="text-center text-sm text-charcoal/50 mt-2">
                    {rendered.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "quote":
            return (
              <blockquote key={key} className="border-l-4 border-primary">
                {rendered.content}
              </blockquote>
            );
          case "divider":
            return <hr key={key} className="border-secondary" />;
          case "code":
            return (
              <pre key={key} className="bg-charcoal/5 rounded-lg p-4">
                <code>{rendered.content}</code>
              </pre>
            );
          case "pdf":
          case "file": {
            if (!rendered.url) return null;
            const displayName =
              rendered.fileName ||
              rendered.caption ||
              fileNameFromUrl(rendered.url);
            return (
              <figure key={key} className="my-6 not-prose">
                <a
                  href={rendered.url}
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
                      {rendered.type === "pdf"
                        ? "PDF · 點擊開啟或下載"
                        : "點擊下載檔案"}
                    </span>
                  </span>
                  <ExternalLink className="w-4 h-4 text-charcoal/40 group-hover:text-accent transition-colors flex-shrink-0" />
                </a>
                {rendered.caption && rendered.caption !== displayName && (
                  <figcaption className="text-center text-sm text-charcoal/50 mt-2">
                    {rendered.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          case "embed":
          case "bookmark":
            if (!rendered.url) return null;
            return (
              <p key={key}>
                <a
                  href={rendered.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline break-all"
                >
                  {rendered.caption || rendered.url}
                </a>
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
