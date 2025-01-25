import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import { useEffect } from "react";

const GPTSearch = () => {
  // Add smooth scroll behavior to the entire page
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black md:bg-transparent overflow-x-hidden">
      <div className="fixed -z-10 hidden md:block">
        <img 
          className="h-screen w-screen object-cover opacity-90" 
          src={BG_URL} 
          alt="background" 
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative pt-[100px] md:pt-[140px] pb-12 scroll-smooth">
        <div className="container mx-auto px-4 md:px-6">
          <GptSearchBar />
          <div className="mt-8 transition-all duration-300 ease-in-out">
            <GptMovieSuggestions />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GPTSearch;