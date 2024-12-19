import { fetchWithErrorHandling } from './fetch';
    
    const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || ''; // Handle missing key
    const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
    
    export async function fetchUnsplashImages(query: string) {
      try {
        const data = await fetchWithErrorHandling(`${UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&per_page=9`, {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });
        return data.results || [];
      } catch (error) {
        console.error('Unsplash fetch error:', error);
        return []; // Return empty array on error
      }
    }
