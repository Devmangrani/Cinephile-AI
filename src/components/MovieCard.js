import { IMG_CDN_URL } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ posterPath, movieId }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  if (!posterPath) return null;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    navigate(`/movie/${movieId}/trailer`);
  };

  return (
    <div 
      className="w-36 md:w-48 flex-shrink-0 transform hover:scale-105 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-[2/3] bg-gray-900">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg"></div>
        )}
        
        <img 
          alt="Movie Card" 
          src={IMG_CDN_URL + posterPath}
          className={`w-full h-full object-cover rounded-lg transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-2 left-2 right-2">
            <div className="text-white text-sm font-medium text-center bg-purple-500/80 rounded-lg py-1 px-2">
              Play Trailer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;