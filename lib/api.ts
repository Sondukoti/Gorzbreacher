const WIKIPEDIA_API_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_ACCESS_KEY = "vY_wQHorGkZPDRUsXEaGZb_hEcitv3L1IFQBFkq-5ag"; // Replace with your key

export async function searchTopic(query: string) {
  try {
    // Fetch Wikipedia content
    const wikiResponse = await fetch(
      `${WIKIPEDIA_API_URL}${encodeURIComponent(query)}`
    );
    const wikiData = await wikiResponse.json();

    // Fetch related images from Unsplash
    const imageResponse = await fetch(
      `${UNSPLASH_API_URL}?query=${encodeURIComponent(query)}&per_page=9`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
    const imageData = await imageResponse.json();

    return {
      title: wikiData.title,
      extract: wikiData.extract_html,
      thumbnail: wikiData.thumbnail?.source,
      images: imageData.results,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
