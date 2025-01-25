import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import { IoArrowBack } from "react-icons/io5";

const MovieTrailerPage = () => {
  const [trailerKey, setTrailerKey] = useState(null);
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMovieTrailer();
  }, [movieId]);

  const getMovieTrailer = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      setTrailerKey(trailer?.key);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleBack = () => {
    navigate("/browse");
  };

  if (!trailerKey) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse text-purple-500 text-xl">Loading Trailer...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black relative">
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-50 bg-purple-500/80 hover:bg-purple-600/80 text-white p-2 rounded-full shadow-lg backdrop-blur-sm transform hover:scale-110 transition-all duration-300 group"
      >
        <IoArrowBack className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>
      <iframe
        className="w-screen h-screen"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieTrailerPage; 