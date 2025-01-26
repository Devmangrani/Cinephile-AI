import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import cinephileLogo from "../assets/cinephile-logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleLogoClick = () => {
    if (user) {
      navigate("/browse");
      if (showGptSearch) {
        dispatch(toggleGptSearchView());
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // Reset GPT search view to false when navigating to browse
        if (showGptSearch) {
          dispatch(toggleGptSearchView());
        }
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="fixed w-full px-4 md:px-8 py-2 from-black via-black/
    90 to-transparent bg-black shadow-lg z-30">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <img 
          className="w-36 md:w-48 h-12 md:h-16 object-contain hover:scale-105 transition-transform duration-300 cursor-pointer" 
          src={cinephileLogo} 
          alt="Cinephile Logo"
          onClick={handleLogoClick}
        />
        {user && (
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            {showGptSearch && (
              <select
                className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-900 text-white text-sm md:text-base rounded-lg border border-gray-700 hover:border-gray-500 focus:outline-none focus:border-purple-500 transition-all"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              className="px-3 py-1.5 md:px-6 md:py-2 text-sm md:text-base bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transform hover:scale-105 transition-all duration-300 shadow-lg"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
            <div className="flex items-center gap-2 md:gap-4">
              <img
                className="hidden md:block w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer hover:scale-110 transition-all duration-300 border-2 border-purple-500 shadow-lg"
                alt="usericon"
                src={user?.photoURL || "https://assets.leetcode.com/users/devbuddy55/avatar_1726025863.png"}
              />
              <button 
                onClick={handleSignOut} 
                className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-white font-medium cursor-pointer hover:text-red-500 transition-colors duration-300 border border-transparent hover:border-red-500 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;