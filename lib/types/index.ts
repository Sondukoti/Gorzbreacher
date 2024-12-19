export interface WikipediaData {
  title: string;
  extract_html: string;
  thumbnail?: {
    source: string;
  };
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface VideoResult {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export interface ResearchResults {
  wikipedia: WikipediaData;
  news: NewsArticle[];
  videos: VideoResult[];
  images: any[]; // Unsplash image type
  relatedTopics: string[];
}
