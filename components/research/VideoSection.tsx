"use client";

import { VideoResult } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface VideoSectionProps {
  videos: VideoResult[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  if (!videos?.length) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Related Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <Card key={video.id.videoId} className="overflow-hidden">
            <div className="aspect-video relative">
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">
                {video.snippet.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {video.snippet.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
