import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {FaGoogle} from "react-icons/fa"
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'


function SignUp() {

  const GOOGLE_AUTH_URL = 'https://blog-thought.onrender.com/auth/google';
  
  const googleAuthMutation = useMutation(async () => {
    // Make the API call to your backend route
    const response = await fetch(GOOGLE_AUTH_URL, {
      method: 'GET',
      credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error('Google authentication failed');
    }

    // Redirect to Google for authentication
    window.location.href = response.url;
  });

  const handleGoogleAuth = () => {
    
    googleAuthMutation.mutate();
  };

  return (
    <div className="flex justify-center items-center h-screen ">
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure><h1 className="text-2xl text-center font-sans bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Access With Google</h1></figure>
  <div className="card-body">
   <div className="flex justify-center">
    <Link onClick={handleGoogleAuth}>
    <FaGoogle className="font-bold text-5xl bg-clip-text text-blue-600 bg-gradient-to-r from-red-500 to-blue-500" />
    </Link>
   </div>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Products</div>
    </div>
  </div>
</div>
    </div>
  )
}

export default SignUp