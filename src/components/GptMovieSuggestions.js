import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import { toggleMovieSuggestions } from "../utils/gptSlice";
import { IoChevronDownCircle } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { useCallback, useEffect, useRef } from "react";

const LoadingAnimation = () => (
  <div className="flex flex-col items-center space-y-4 py-8">
    <div className="relative">
      <FaRobot className="w-12 h-12 text-purple-500 animate-bounce" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping" />
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
    </div>
    <p className="text-purple-400 font-medium animate-pulse">AI is crafting your perfect movie list...</p>
  </div>
);

const GptMovieSuggestions = () => {
  const dispatch = useDispatch();
  const { movieResults, movieNames, showMovieSuggestions, isLoading } = useSelector((store) => store.gpt);
  const containerRef = useRef(null);

  const handleToggle = useCallback(() => {
    dispatch(toggleMovieSuggestions());
  }, [dispatch]);

  // Add intersection observer for smooth loading
  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-4');
        }
      });
    }, options);

    const movieCards = containerRef.current.querySelectorAll('.movie-section');
    movieCards.forEach(card => {
      card.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-500');
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [movieResults]);
  
  // Return early if not loading and no results
  if (!isLoading && (!movieNames || !movieResults)) return null;
  if (!isLoading && movieNames.length !== movieResults.length) return null;

  return (
    <div className="px-4 md:px-8 py-6 mx-auto max-w-screen-2xl will-change-transform">
      <div className="bg-black/80 p-6 md:p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-purple-500/20">
        <div className="mb-8 relative">
          {!isLoading && (
            <button 
              onClick={handleToggle}
              className="absolute -left-2 top-1/2 -translate-y-1/2 md:left-4 group"
            >
              <IoChevronDownCircle 
                className={`w-8 h-8 md:w-10 md:h-10 text-purple-500 transform transition-all duration-300 hover:text-purple-400 
                  ${showMovieSuggestions ? 'rotate-0' : '-rotate-180'}`}
              />
            </button>
          )}
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 text-center">
            AI-Powered Movie Recommendations
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-purple-800 rounded-full"></div>
        </div>
        
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div 
            ref={containerRef}
            className={`space-y-8 transition-all duration-500 ease-in-out overflow-hidden ${
              showMovieSuggestions ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {movieNames?.map((movieName, index) => (
              <div 
                key={movieName} 
                className="movie-section transform transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="bg-black/40 p-4 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                  <MovieList
                    title={movieName}
                    movies={movieResults[index]}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;