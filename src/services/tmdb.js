const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

async function fetchFromTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const tmdbApi = {
  getNowPlayingMovies: (page = 1) => 
    fetchFromTMDB('/movie/now_playing', { page }),

  getPopularMovies: (page = 1) => 
    fetchFromTMDB('/movie/popular', { page }),

  getTopRatedMovies: (page = 1) => 
    fetchFromTMDB('/movie/top_rated', { page }),

  getMovieDetails: (movieId) => 
    fetchFromTMDB(`/movie/${movieId}`),

  getMovieRecommendations: (movieId) => 
    fetchFromTMDB(`/movie/${movieId}/recommendations`),

  getMovieReviews: (movieId, page = 1) => 
    fetchFromTMDB(`/movie/${movieId}/reviews`, { page }),

  getPopularTVShows: (page = 1) => 
    fetchFromTMDB('/tv/popular', { page }),

  getTVShowDetails: (seriesId) => 
    fetchFromTMDB(`/tv/${seriesId}`),

  searchMovies: (query, page = 1) => 
    fetchFromTMDB('/search/movie', { query, page }),

  searchMulti: (query, page = 1) => 
    fetchFromTMDB('/search/multi', { query, page }),
};

export default tmdbApi;
