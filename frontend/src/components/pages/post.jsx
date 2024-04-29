import React, {useState} from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'



function post() {
const [formData, setFormData] = useState({title: "", body: "", author: ""})
const navigate = useNavigate()

const apiUrl = 'http://localhost:8000/post';
const createPost = async (postData) => {
  try {
    const response = await axios.post(apiUrl, postData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating post:', error);
  }
};

const mutation = useMutation(createPost, {
  onSuccess: () => {
    console.log('Post created successfully!');
        // navigate("/");
  },
  onError: (error) => {
    console.error('Error creating post:', error);
  },
});

const handleSubmit =  (event)=>{
  // event.preventDefault()
  // console.log(formData);
  //  try{
  //   const response = await axios.post(apiUrl,formData)
  //   console.log("Response", response.data);
  //   navigate("/")

  //  }
  //  catch (error){
  //   console.log("Error submitting your request", error);
  //  }
  event.preventDefault();
  mutation.mutate(formData);
}


  return (
    <div className="w-96 flex flex-col justify-center items-center mx-auto h-[100vh]">
      {mutation.isSuccess ? <h1 className="text-center py-4 text-green-600">Yeahh... it got submitted smoothly</h1>
: ""}
        <div class="w-full max-w-xs">
  <form onSubmit={handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Title</label>
      <input htm value={formData.title} onChange={(e)=> setFormData({...formData, title: e.target.value})} htmlFor="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Post title"/>
    </div>
    <div class="mb-2">
      <label class="block text-slate-700 text-sm font-bold mb-2" for="password">Author</label>
      <input value={formData.author} onChange={(e)=> setFormData({...formData, author: e.target.value})} htmlFor="author" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Author"/>
    </div>
    <div class="mb-2">
      <label class="block text-slate-700 text-sm font-bold mb-2" for="password">Content</label>
      <textarea value={formData.body} onChange={(e)=> setFormData({...formData, body: e.target.value})} htmlFor="body" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Message"></textarea>
    </div>
    <div class="flex items-center justify-center">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{mutation.isLoading ? "Sending..." : "Submit"}</button>
    </div>
  </form>
  
</div>

    </div>
  )
}

export default post