import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: process.env.API_KEY_MOVIE ?? "",
  },
});

export const getDiscoverMovies = async () => {
  const { data } = await Axios.get("discover/movie");
  return data;
};

export const getMoviesCategories = async (language?: string) => {
  const { data } = await Axios.get(`genre/movie/list?language=${language}`);
  return data;
};

export const getMostPopularMovies = async () => {
  const { data } = await Axios.get("movie/popular");
  return data;
};

export const getTopRatedMovies = async () => {
  const { data } = await Axios.get("movie/top_rated");
  return data;
};

export const getUpComingMovies = async () => {
  const { data } = await Axios.get("movie/upcoming");
  return data;
};

export const getMovieDetails = async (id: number, language: string) => {
  const { data } = await Axios.get(
    `movie/${id}?language=${language === "en" ? "en-US" : "es-MX"}`
  );
  return data;
};

export const getMoviesByCategory = async (id: number, page: number) => {
  const { data } = await Axios.get(
    `discover/movie?with_genres=${id}&page=${page}`
  );
  return data;
};

export const getMoviesBySearch = async (query: string, page: number) => {
  const { data } = await Axios.get(`search/movie?query=${query}&page=${page}`);
  return data;
};

export const getRecommendedMovies = async (id: number) => {
  const { data } = await Axios.get(`movie/${id}/recommendations`);
  return data;
};

export const getTrendingMovies = async () => {
  const { data } = await Axios.get("trending/movie/week");
  return data;
};

export const getMovieVideos = async (id: number, language: string) => {
  const { data } = await Axios.get(
    `movie/${id}/videos?language=${language === "en" ? "en-US" : "es-MX"}`
  );
  return data;
};
