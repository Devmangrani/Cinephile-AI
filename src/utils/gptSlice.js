import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
    showMovieSuggestions: true,
    isLoading: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
      state.showMovieSuggestions = true;
      state.isLoading = false;
    },
    toggleMovieSuggestions: (state) => {
      state.showMovieSuggestions = !state.showMovieSuggestions;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.movieResults = null;
      state.movieNames = null;
    },
  },
});

export const { 
  toggleGptSearchView, 
  addGptMovieResult, 
  toggleMovieSuggestions,
  setLoading 
} = gptSlice.actions;

export default gptSlice.reducer;