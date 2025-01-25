import React from 'react'

const validate = (email, password) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  if(!isEmailValid) return "Email is not valid";
  if(!isPasswordValid) return "Password is not valid";
  return null;
}

export default validate