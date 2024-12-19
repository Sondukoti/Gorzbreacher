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
    // If any of these fail, they'll return empty arrays
    const [news, videos, images] = await Promise.allSettled([
      fetchNewsData(query),
      fetchYoutubeVideos(query),
      fetchUnsplashImages(query),
    ]);

    return {
      wikipedia,
      news: news.status === 'fulfilled' ? news.value : [],
      videos: videos.status === 'fulfilled' ? videos.value : [],
      images: images.status === 'fulfilled' ? images.value : [],
      relatedTopics: generateRelatedTopics(query),
    };
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}

function generateRelatedTopics(query: string): string[] {
  const baseQuery = query.trim();
  return [
    `${baseQuery} overview`,
    `${baseQuery} history`,
    `${baseQuery} applications`,
    `${baseQuery} latest developments`,
    `${baseQuery} future trends`,
  ];
}
