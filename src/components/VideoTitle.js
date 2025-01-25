import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ title, overview, movieId }) => {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const navigate = useNavigate();

  // Truncate overview to 150 characters initially, show 300 on More Info
  const shortOverview = overview?.length > 150
    ? overview.slice(0, 150).trim() + "..."
    : overview;
    
  const longOverview = overview?.length > 300
    ? overview.slice(0, 300).trim() + "..."
    : overview;

  const handlePlay = () => {
    navigate(`/movie/${movieId}/trailer`);
  };

  const handleMoreInfo = () => {
    setShowFullOverview(!showFullOverview);
  };

  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:block py-6 text-sm w-1/3 text-gray-200">
        {showFullOverview ? longOverview : shortOverview}
      </p>
      <div className="flex gap-3 mt-4 md:mt-0">
        <button 
          className="bg-white text-black py-1 md:py-2 px-3 md:px-8 text-xl rounded-lg flex items-center hover:bg-opacity-80 transition-all duration-300"
          onClick={handlePlay}
        >
          <FaPlay className="mr-2" /> Play
        </button>
        <button 
          className="bg-gray-500 text-white py-1 md:py-2 px-3 md:px-8 text-xl bg-opacity-50 rounded-lg flex items-center hover:bg-opacity-70 transition-all duration-300"
          onClick={handleMoreInfo}
        >
          <IoIosInformationCircleOutline className="mr-2 text-2xl" /> 
          {showFullOverview ? 'Show Less' : 'More Info'}
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;