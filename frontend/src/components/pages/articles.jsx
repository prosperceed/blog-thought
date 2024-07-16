import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { config } from "../../lib/config";

function Articles() {
  const [comment, useComment] = useState();

  const { id } = useParams();
  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://blog-thought.onrender.com/article/` + id,
          config
        );
        return response.data;
      } catch (error) {
        throw new Error("Error fetching article:", error);
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching article</div>;

  return (
    <div className="min-h-screen mx-auto flex flex-col items-center justify-center mt-9">
      {article && (
        <div className="w-[730px] text-primary-content">
          <div className="flex gap-y-9 flex-col p-8">
            <h2 className="card-title text-4xl text-center uppercase">
              {article.title}
            </h2>
            <h2 className="font-bold text-sm text-warning text-right">
              {moment(article.date).format("MMMM D, YYYY")}
            </h2>
          </div>
          <figure>
            {article.image && (
              <img
                className="w-full mx-auto rounded-md h-[460px] bg-cover object-cover"
                src={article.image}
                alt={article.title}
              />
            )}
          </figure>
          <div className="card-body px-9">
            <p className="">{article.body}</p>
            <div className="card-actions flex flex-col justify-end mt-10 text-sm text-">
              {/* <h2 className="-mb-[10px]">Author</h2> */}
              <p>~ {article.author}</p>
            </div>
            <a className="btn text-primary mt-8 w-1/2">
              <Link className="text-white" to="/home">
                articles...
              </Link>
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center mt-14">
        <strong className=" text-bold text-2xl">Comments</strong>
        <div className="chat chat-start hidden">
          <div className="chat-bubble">
            It's over Anakin,
            <br />I have the high ground.
          </div>
        </div>
        <div className="chat chat-end hidden">
          <div className="chat-bubble">You underestimate my power!</div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
