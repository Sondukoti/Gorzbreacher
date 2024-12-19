import { fetchWikipediaData } from './wikipedia';
import { fetchNewsData } from './news';
import { fetchYoutubeVideos } from './youtube';
import { fetchUnsplashImages } from './unsplash';
import type { ResearchResults } from '../types';

export async function searchTopic(query: string): Promise<ResearchResults> {
  try {
    // Fetch Wikipedia data first as it's our primary source
    const wikipedia = await fetchWikipediaData(query);
    
    // Fetch other data sources in parallel
    const [news, videos, images] = await Promise.all([
      fetchNewsData(query),
      fetchYoutubeVideos(query),
      fetchUnsplashImages(query),
    ]);

    return {
      wikipedia,
      news,
      videos,
      images,
      relatedTopics: generateRelatedTopics(query),
    };
  } catch (error) {
    console.error('Research API Error:', error);
    throw error;
  }
}

function generateRelatedTopics(query: string): string[] {
  return [
    `${query} history`,
    `${query} modern developments`,
    `${query} future trends`,
    `${query} impact`,
    `${query} analysis`,
  ];
}
