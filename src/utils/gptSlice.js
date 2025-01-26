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
      if (!state.showGptSearch) {
        state.movieResults = null;
        state.movieNames = null;
      }
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieResults = movieResults;
      state.movieNames = movieNames;
      state.showMovieSuggestions = true;
      console.log("State updated with:", { movieNames, movieResults });
    },
    toggleMovieSuggestions: (state) => {
      state.showMovieSuggestions = !state.showMovieSuggestions;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
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