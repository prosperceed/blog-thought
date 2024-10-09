import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid"
import supabase from '../../lib/supabase-config'

function Post() {
  const [formData, setFormData] = useState({ title: "", body: "", author: "", image: null })
  const [user, setUser] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser()
      .then(({ data }) => {
        setUser(data.user)
        console.log("User ID:", data.user.id);
      })
      .catch(error => console.error("Error fetching user:", error))
  }, [])

  const handleImage = async (file) => {
    if (!user) {
      console.error("User not authenticated");
      throw new Error("User not authenticated");
    }

    const fileName = `${user.id}/${uuidv4()}`
    console.log("Uploading file:", fileName);

    try {
      const { data: image, error } = await supabase
        .storage
        .from('images')
        .upload(fileName, file)

      if (error) throw error;

      console.log("Image uploaded", image.path);
      
      const { data, error: urlError } = supabase
        .storage
        .from('images')
        .getPublicUrl(fileName)

      if (urlError) throw urlError;

      console.log("Public URL:", data.publicUrl);
      setImagePreview(data.publicUrl);
      return data.publicUrl
    } catch (error) {
      console.error("Error in handleImage:", error.message)
      throw error;
    }
  }

  const apiUrl = 'https://blog-thought.onrender.com/post';

  const createPost = async () => {
    try {
      let imageUrl = null

      if (formData.image) {
        imageUrl = await handleImage(formData.image)
        console.log("Image URL:", imageUrl);
      }

      const postData = {
        title: formData.title,
        author: formData.author,
        body: formData.body,
        image: imageUrl
      };

      console.log("Sending post data:", postData);

      const response = await axios.post(apiUrl, postData);

      if (response.data === null) {
        throw new Error("API returned null data");
      }
      console.log("API Response:", response.data);

      setFormData({ title: '', body: '', author: '', image: null });
      setImagePreview(null);
      return response.data;
    } catch (error) {
      console.error('Error submitting blog post:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const mutation = useMutation(createPost, {
    onSuccess: (data) => {
      console.log('Post created successfully!', data);
      // navigate('/home');
    },
    onError: (error) => {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title || !formData.author || !formData.body) {
      alert('Please fill in all required fields');
      return;
    }
    mutation.mutate();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-96 flex flex-col justify-center items-center mx-auto min-h-screen ">
      {mutation.isSuccess && <h1 className="text-center py-4 text-green-600">Yeahh... it got submitted smoothly</h1>}
      <div className="max-w-md">
        <form onSubmit={handleSubmit} className="bg-slate-200 shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="shadow appearance-none bg-slate-100 border border-gray-300 rounded w-full py-2 px-3 text-slate-600 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Post title"
            />
          </div>
          <div className="mb-2">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="author">Author</label>
            <input
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="shadow appearance-none border bg-slate-100 border-gray-300 w-full py-2 px-3 text-slate-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Author"
            />
          </div>
          <div className="mb-2">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="content">Content</label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className="shadow appearance-none border border-gray-300 bg-slate-100 rounded w-full py-2 px-3 text-slate-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Message"
            ></textarea>
          </div>
          <div className="mb-2">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
            <input
              onChange={handleFileChange}
              className="shadow appearance-none border border-purple-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              accept="image/*"
            />
          </div>
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="max-w-full h-auto" />
            </div>
          )}
          <div className="flex items-center justify-center ">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Post