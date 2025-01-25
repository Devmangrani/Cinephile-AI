import React, { useState, useRef } from "react";
import Header from "./Header";
import validate from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR, BG_URL } from "../utils/constants";

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignUp = () => {
    setSignUp(!signUp);
  };

  const handleSubmit = () => {
    //console.log(email.current.value, password.current.value);
    const error = validate(email.current.value, password.current.value);
    setError(error);
    if (error) return;

    //Sign/SignUp Logic
    if (signUp) {
      //SignUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // ...
            })
            .catch((error) => {
              // An error occurred
              setError(error.message);
              // ...
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      //SignIn Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + " " + errorMessage);
        });
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-black md:bg-transparent">
      <Header />
      <div className="fixed -z-10 hidden md:block">
        <img
          className="h-screen w-screen object-cover"
          src={BG_URL}
          alt="background"
        />
      </div>
      <div className="flex-grow flex items-center justify-center px-4 py-8 md:py-0">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md p-8 md:p-12 bg-black rounded-lg md:bg-black/75 shadow-2xl"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
            {signUp ? "Sign Up" : "Sign In"}
          </h1>
          {signUp && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full p-4 my-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or phone number"
            className="w-full p-4 my-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-4 my-4 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {error && (
            <p className="text-red-500 font-bold text-center text-lg py-4">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full p-4 my-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg text-white font-bold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-[1.02]"
            onClick={handleSubmit}
          >
            {signUp ? "Sign Up" : "Sign In"}
          </button>
          <p className="text-gray-400 text-center">
            {signUp ? "Already have an account? " : "New to Cinephile? "}
            <span
              className="text-white hover:text-purple-400 cursor-pointer transition-colors"
              onClick={() => setSignUp(!signUp)}
            >
              {signUp ? "Sign in now." : "Sign up now."}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
