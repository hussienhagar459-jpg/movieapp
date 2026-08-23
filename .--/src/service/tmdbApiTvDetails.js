// TMDB API Configuration
const API_KEY = "9d1a2b5be60a66d3befbd3693f8c2eff";
const BASE_URL = "https://api.themoviedb.org/3";

// Helper Fetch Function
const fetchFromTMDB = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

// Get TV Show Details, Credits and Videos
export const getTvDetails = (id) =>
  fetchFromTMDB(
    `/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos`,
  );

// Get TV Recommendations
export const getTvRecommendations = async (id) => {
  const data = await fetchFromTMDB(
    `/tv/${id}/recommendations?api_key=${API_KEY}`,
  );

  if (data.results && data.results.length > 0) {
    return data;
  }

  return fetchFromTMDB(`/tv/${id}/similar?api_key=${API_KEY}`);
};

// Get TV Reviews
export const getTvReviews = (id) =>
  fetchFromTMDB(`/tv/${id}/reviews?api_key=${API_KEY}`);