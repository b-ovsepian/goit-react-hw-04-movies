import axios from "axios";

//You must add your API_KEY to .env

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const getMoviesTrending = async (
  mediaType = "movie",
  timeWindow = "day"
) => {
  const url = `trending/${mediaType}/${timeWindow}?api_key=${process.env.REACT_APP_API_KEY}`;
  const result = await axios.get(url);
  return result;
};

export const getMoviesId = async (id) => {
  const url = `movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
  const result = await axios.get(url);
  return result;
};

export const getMoviesQuery = async (query) => {
  const url = `search/movie?query=${query}&api_key=${process.env.REACT_APP_API_KEY}`;
  const result = await axios.get(url);
  return result;
};

export const getMoviesCredits = async (id) => {
  const url = `movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
  const result = await axios.get(url);
  return result;
};

export const getMoviesReviews = async (id) => {
  const url = `movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`;
  const result = await axios.get(url);
  return result;
};
