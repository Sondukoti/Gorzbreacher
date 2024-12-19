"use client";

import { NewsArticle } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface NewsSectionProps {
  articles: NewsArticle[];
}

export default function NewsSection({ articles }: NewsSectionProps) {
  if (!articles?.length) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Card key={index} className="overflow-hidden">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {article.description}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  {article.source.name}
                </span>
                <span className="text-muted-foreground">
                  {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </span>
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-primary hover:underline"
              >
                Read more
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
