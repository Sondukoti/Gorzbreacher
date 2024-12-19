import { fetchWithErrorHandling } from './fetch';
    
    const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ''; // Handle missing key
    const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";
    
    export async function fetchYoutubeVideos(query: string) {
      try {
        const data = await fetchWithErrorHandling(`${YOUTUBE_API_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=4&key=${YOUTUBE_API_KEY}`);
        return data.items || [];
      } catch (error) {
        console.error('YouTube fetch error:', error);
        return []; // Return empty array on error
      }
    }
