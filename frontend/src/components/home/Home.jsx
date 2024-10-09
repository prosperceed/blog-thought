import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../header/Navbar";
import moment from "moment";
import { config } from "../../lib/config";
import supabase from "../../lib/supabase-config";

const Home = () => {
  // useEffect(()=>{
  //   const fetchUser = async ()=>{
  //     const res = await axios.get("/auth")
  //     const {data, error} = await supabase.from("auth.users")
  //     .select("*")
  //     .single()
  //     if(error){
  //       throw error
  //     }
  //     console.log(data)
  //     return data
  //   }
  //   fetchUser()
  // },[])

  const textStyle = {
    maxWidth: "100%",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const articles = useQuery({
    queryKey: ["/home"],

    queryFn: async () => {
      const response = await axios.get("https://blog-thought.onrender.com/home");
      const data = await response.data;
      // console.log(data);
      return data;
    },
  });

  if (articles.isError) return <h1>Error loading articles</h1>;

  return (
    <div>
      {articles.isLoading ? (
        <>
          <div className="flex items-center flex-col justify-center h-[100vh]">
            <h1 className="text-2xl">Fetching articles</h1>
            <div className="mt-4" role="status">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 text-gray-200 animate-spin dark:text-blue-500 fill-blue-700"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div>
            {articles.length != null ? (
              <div>Sorry, you have no article available here</div>
            ) : (
              <div className="py-4 grid md:grid-cols-2 lg:grid-cols-3 md:gap-2 grid-cols-1 h-96 gap-2 lg:gap-2 justify-center items-center mx-auto">
                {articles.data.map((item) => (
          <div
          key={item.id}
          className="card my-3 w-[23rem] h-96 mx-auto bg-base-300 shadow-xl flex flex-col"
        >
          <figure className="h-2/5">
            {item.image && (
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.title}
              />
            )}
          </figure>
          <div className="card-body h-3/5 flex flex-col justify-between">
            <div className="flex justify-between">
              <h2 className="card-title text-lg font-bold">{item.title}</h2>
              <h2 className="font-bold text-sm text-warning">
                {moment(item.created_at).format("ll")}
              </h2>
            </div>
            <p className="text-sm overflow-hidden flex-grow" style={textStyle}>
              {item.body}
            </p>
            <div className="card-actions justify-end">
              <button className="btn">
                <Link to={`/articles/${item.id}`}>Read now!</Link>
              </button>
            </div>
          </div>
        </div>
        
                ))}
              </div>
            )}
          </div>
          {/* <Hero/> */}
        </>
      )}
    </div>
  );
};

export default Home;
