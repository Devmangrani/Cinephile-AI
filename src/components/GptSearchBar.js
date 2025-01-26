import getGeminiModel from "../utils/openai";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult, setLoading } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [error, setError] = useState(null);
  const isLoading = useSelector(store => store.gpt.isLoading);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (error) {
      console.error("Error searching TMDB:", error);
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    try {
      setError(null);
      const userQuery = searchText.current.value;
      if (!userQuery) {
        setError("Please enter a search query");
        return;
      }

      dispatch(setLoading(true));

      const model = getGeminiModel();
      console.log("Gemini Model:", model); // Debug log

      if (!model) {
        throw new Error("AI model not initialized. Please check your API key.");
      }

      const prompt = `Act as a Movie Recommendation system and suggest some movies for the query: "${userQuery}". Only give me names of 5 movies, comma separated. For example: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya. Do not include any other text or explanations.`;

      console.log("Sending prompt to Gemini..."); // Debug log
      const result = await model.generateContent(prompt);
      console.log("Gemini response:", result); // Debug log

      if (!result || !result.response) {
        throw new Error("Failed to get response from AI model");
      }

      const response = result.response;
      const text = response.text();
      console.log("Generated text:", text); // Debug log
      
      if (!text) {
        throw new Error("No recommendations received from AI model");
      }

      const movieNames = text.split(",").map(movie => movie.trim());
      console.log("Movie names:", movieNames); // Debug log

      if (!movieNames.length) {
        throw new Error("No movie names found in the response");
      }
      
      // For each movie search TMDB API
      console.log("Searching TMDB for movies..."); // Debug log
      const promiseArray = movieNames.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      const filteredResults = tmdbResults.filter(results => results && results.length > 0);
      console.log("TMDB results:", filteredResults); // Debug log

      if (!filteredResults.length) {
        throw new Error("No matching movies found in the database");
      }

      dispatch(
        addGptMovieResult({ 
          movieNames: movieNames, 
          movieResults: filteredResults
        })
      );
    } catch (error) {
      console.error("Error in GPT search:", error);
      setError(error.message || "Failed to get movie recommendations. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="px-4 md:px-6 max-w-screen-xl mx-auto">
      <form
        className="w-full bg-black/80 p-4 md:p-6 rounded-xl shadow-2xl backdrop-blur-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            ref={searchText}
            type="text"
            className="flex-1 p-3 md:p-4 text-base md:text-lg bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-purple-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            className="md:w-1/4 py-3 md:py-4 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            onClick={handleGptSearchClick}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : lang[langKey].search}
          </button>
        </div>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500 text-red-500 rounded-lg backdrop-blur-sm max-w-md mx-auto text-center">
          {error}
        </div>
      )}
    </div>
  );
};
export default GptSearchBar;