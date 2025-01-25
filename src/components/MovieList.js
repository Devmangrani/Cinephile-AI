import MovieCard from "./MovieCard";
import { useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const MovieList = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  if (!movies || movies.length === 0) return null;

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };
  
  return (
    <div className="py-2 relative group">
      <h1 className="text-lg md:text-2xl py-2 text-white font-bold group flex items-center">
        <span className="group-hover:text-purple-400 transition-colors duration-300">{title}</span>
        <div className="h-0.5 w-0 group-hover:w-16 bg-purple-600 ml-4 transition-all duration-500 rounded-full"></div>
      </h1>
      <div className="relative">
        {showLeftArrow && (
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full text-purple-500 hover:text-purple-400 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>
        )}
        
        {showRightArrow && (
          <button 
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 p-2 rounded-full text-purple-500 hover:text-purple-400 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          >
            <IoChevronForward className="w-6 h-6" />
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-scroll scroll-smooth scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent hover:scrollbar-thumb-purple-500 pb-4 pt-2 px-2"
          onScroll={checkScrollButtons}
        >
          <div className="flex gap-4">
            {movies?.map((movie) => (
              <MovieCard 
                key={movie.id} 
                posterPath={movie.poster_path}
                movieId={movie.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieList;