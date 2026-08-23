const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchFromTMDB = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

export const getTvDetails = (id) =>
  fetchFromTMDB(
    `/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
  );

export const getTvRecommendations = async (id) => {
  const data = await fetchFromTMDB(
    `/tv/${id}/recommendations?api_key=${API_KEY}`
  );

  if (data.results && data.results.length > 0) {
    return data;
  }

  return fetchFromTMDB(`/tv/${id}/similar?api_key=${API_KEY}`);
};

export const getTvReviews = (id) =>
  fetchFromTMDB(`/tv/${id}/reviews?api_key=${API_KEY}`);