"use client";

import { ResearchResults as ResultsType } from "@/lib/types";
import { Card } from "@/components/ui/card";
import NewsSection from "./NewsSection";
import VideoSection from "./VideoSection";
import RelatedTopics from "./RelatedTopics";
import ImageGallery from "./ImageGallery";

interface ResearchResultsProps {
  results: ResultsType;
  onTopicClick: (topic: string) => void;
}

export default function ResearchResults({ results, onTopicClick }: ResearchResultsProps) {
  if (!results?.wikipedia) {
    console.log('No Wikipedia data in results:', results); // Debug log
    return null;
  }

  const { wikipedia, news = [], videos = [], images = [], relatedTopics = [] } = results;

  return (
    <div className="space-y-12">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-6">{wikipedia.title}</h1>
        <div 
          className="prose dark:prose-invert max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: wikipedia.extract_html }}
        />
        <RelatedTopics topics={relatedTopics} onTopicClick={onTopicClick} />
      </Card>

      <NewsSection articles={news} />
      <VideoSection videos={videos} />
      <ImageGallery images={images} />
    </div>
  );
}
