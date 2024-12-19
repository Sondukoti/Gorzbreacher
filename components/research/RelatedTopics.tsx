"use client";

import { Button } from "@/components/ui/button";

interface RelatedTopicsProps {
  topics: string[];
  onTopicClick: (topic: string) => void;
}

export default function RelatedTopics({ topics, onTopicClick }: RelatedTopicsProps) {
  if (!topics?.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Related Topics</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => onTopicClick(topic)}
            className="text-sm"
          >
            {topic}
          </Button>
        ))}
      </div>
    </section>
  );
}
