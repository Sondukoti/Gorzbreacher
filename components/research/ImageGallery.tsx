"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageGalleryProps {
  images: any[]; // Unsplash image type
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (!images?.length) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Related Images</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="p-2">
                <div className="relative aspect-square">
                  <Image
                    src={image.urls.regular}
                    alt={image.alt_description || "Topic image"}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                {image.user && (
                  <div className="p-2 text-xs text-muted-foreground">
                    Photo by{" "}
                    <a
                      href={`https://unsplash.com/@${image.user.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {image.user.name}
                    </a>
                    {" "}on{" "}
                    <a
                      href="https://unsplash.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Unsplash
                    </a>
                  </div>
                )}
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
