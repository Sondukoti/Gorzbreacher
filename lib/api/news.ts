import { fetchWithErrorHandling } from './fetch';
    import type { NewsArticle } from '../types';
    
    const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || ''; // Handle missing key
    const NEWS_API_URL = `https://newsapi.org/v2/everything`;
    
    export async function fetchNewsData(query: string): Promise<NewsArticle[]> {
      try {
        const searchQuery = encodeURIComponent(`${query} AND (technology OR science OR research)`);
        const response = await fetchWithErrorHandling(`${NEWS_API_URL}?q=${searchQuery}&sortBy=relevancy&pageSize=6&language=en&apiKey=${NEWS_API_KEY}`);
        
        if (!response.articles) {
          console.warn('No articles found in News API response:', response);
          return [];
        }
    
        return response.articles.filter((article: any) => article.title && article.description && article.url);
      } catch (error) {
        console.error('News fetch error:', error);
        return []; // Return empty array on error
      }
    }
