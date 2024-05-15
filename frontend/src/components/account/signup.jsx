import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {FaGoogle} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import supabase from '../../lib/supabase-config'


function SignUp() {

const navigate = useNavigate()

const handleAuth = async ()=>{
  try {
      
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    
    if (error) {
      console.error('Google authentication failed:', error.message);
    } else {
      navigate('/home');
      console.log(data.url);
      return data
    }
  } catch (error) {
    console.error('Error during Google authentication:', error.message);
  }
}


  return (
    <div className="flex justify-center items-center h-screen ">
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure><h1 className="text-2xl text-center font-sans bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Access With Google</h1></figure>
  <div className="card-body">
   <div className="flex justify-center">
    <Link onClick={handleAuth}>
    <FaGoogle className="font-bold text-5xl bg-clip-text text-blue-600 bg-gradient-to-r from-red-500 to-blue-500" />
    </Link>
   </div>
    <div className="card-actions justify-end">
      <div className="badge badge-outline"></div>
    </div>
  </div>
</div>
    </div>
  )
}

export default SignUp