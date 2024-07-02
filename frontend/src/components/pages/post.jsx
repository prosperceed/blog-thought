import React, {useEffect, useState} from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import { config } from '../../lib/config'
import {v4 as uuidv4} from "uuid"
import supabase from '../../lib/supabase-config'
import {useUser} from '@supabase/auth-helpers-react'


function post() {
const [formData, setFormData] = useState({title: "", body: "", author: "", image:""})
const [image, setImage] = useState([])
const [user, setUser] = useState([])
const navigate = useNavigate()



useEffect(()=>{
  const userData = supabase.auth.getUser()
  .then(data =>{
    setUser(data.data.user)
    console.log(data.data.user.id);
  })

},[])

const imgURL = "https://rzgiicwrerqxfqppofjr.supabase.co/storage/v1/object/public/images/"

// const getImages = async ()=>{
//   const {data, error} = await supabase
//   .storage
//   .from('images')
//   .list(user?.id + "/", {
//     limit: 100,
//     offset: 0,
//     sortBy: {column: "name", order: "asc"}
//   })
//   if(data){
//     // setImage(data)  
//   }
//   else{
//     console.log("Could'nt fetch that image");
//   }
// }

const handleImage = async (file)=>{
  const {data, error} = await supabase
  .storage
  .from('images')
  .upload(user.id + '/' + uuidv4(), file)

  if(data){
    console.log("Image uploaded", data.path);
    // getImages()
   return data.path
  }
  else{
    console.log("Error uploading image", error.message)
    throw new Error("Image failed to be uploaded")
   
  }
}

const apiUrl = 'https://blog-thought.onrender.com/post';
const createPost = async () => {


  try {

    let imagePath = null

    if(formData.image){
      imagePath = await handleImage(formData.image)
    }

    const { data: postData, error: postError } = await axios.post(apiUrl,{
      title: formData.title,
      author: formData.author,
      body: formData.body,
      image:imagePath? imgURL + imagePath : null
    });

    console.log(imgURL + imagePath);

    if (postError) {
      throw new Error('Error saving blog post');
    }

    // Reset form data after successful submission
    setFormData({ title: '', body: '', author: '', image: '' });
    return postData

    // navigate('/home'); 
  } catch (error) {
    console.error('Error submitting blog post:', error.message);
    // Handle error display or notification
  }
};

const mutation = useMutation(createPost, {
  onSuccess: () => {
    console.log('Post created successfully!');
    // navigate('/home');
  },
  onError: (error) => {
    console.error('Error creating post:', error);
  },
});

const handleSubmit = (event) => {
  event.preventDefault();
  mutation.mutate();
};



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
    <div class="mb-2">
      <label class="block text-slate-700 text-sm font-bold mb-2" for="password">Image</label>
      <input onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}  class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" type="file"/>
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