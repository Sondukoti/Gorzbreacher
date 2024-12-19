import { fetchWithErrorHandling } from './fetch';
    import type { WikipediaData } from '../types';
    
    const WIKIPEDIA_API_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
    
    export async function fetchWikipediaData(query: string): Promise<WikipediaData> {
      try {
        const data = await fetchWithErrorHandling(`${WIKIPEDIA_API_URL}${encodeURIComponent(query)}`, {
          headers: {
            'Accept': 'application/json',
            'Api-User-Agent': 'Research-App/1.0 (https://research-app.com; research@example.com)'
          }
        });
    
        if (!data.title || !data.extract_html) {
          throw new Error(`Invalid Wikipedia response: Missing title or extract_html. Response: ${JSON.stringify(data)}`);
        }
    
        return {
          title: data.title,
          extract_html: data.extract_html,
          thumbnail: data.thumbnail?.source // Handle potential null
        };
      } catch (error) {
        console.error('Wikipedia fetch error:', error);
        throw new Error('Failed to fetch Wikipedia data. Please try a different search term.');
      }
    }
