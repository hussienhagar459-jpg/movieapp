// TMDB API Configuration
const API_KEY = "9d1a2b5be60a66d3befbd3693f8c2eff";
const BASE_URL = "https://api.themoviedb.org/3";

// Helper Fetch Function
const fetchFromTMDB = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
  return response.json();
};

// Get Movie Main Details, Credits and Videos
export const getMovieDetails = (id) =>
  fetchFromTMDB(
    `/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`,
  );

// Get Recommendations (Fallback to Similar Movies)
export const getMovieRecommendations = async (id) => {
  const data = await fetchFromTMDB(
    `/movie/${id}/recommendations?api_key=${API_KEY}`,
  );
  if (data.results && data.results.length > 0) return data;
  return fetchFromTMDB(`/movie/${id}/similar?api_key=${API_KEY}`);
};

// Get Movie Reviews
export const getMovieReviews = (id) =>
  fetchFromTMDB(`/movie/${id}/reviews?api_key=${API_KEY}`);
