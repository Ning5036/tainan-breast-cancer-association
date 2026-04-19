"use client";

import Image from "next/image";
import { renderNotionBlock } from "@/lib/notion";

interface Props {
  blocks: any[];
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
          default:
            return null;
        }
      })}
    </div>
  );
}
