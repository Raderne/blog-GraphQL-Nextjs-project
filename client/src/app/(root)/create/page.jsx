"use client";
import { useGlobalContext } from "@/app/context";
import React, { useEffect, useState } from "react";
import { Gloock } from "next/font/google";
import { fetchData } from "@/utils/fetchData";

const gloock = Gloock({ subsets: ["latin"], weight: "400" });

const CreateBlogPage = () => {
  const { setMainColor, mainColor, token } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMainColor("text-white-1");
  }, []);

  const handleCreate = async () => {
    if (!token) {
      return;
    }

    if (!title || !content) {
      return;
    }

    setLoading(true);

    const requestBody = {
      query: `
            mutation CreateBlog($title: String!, $content: String!) {
                createBlog(blogInput: { title: $title, content: $content }) {
                    _id
                    title
                }
            }
        `,
      variables: {
        title,
        content,
      },
    };

    try {
      await fetchData(requestBody, token);

      setLoading(false);
      setContent("");
      setTitle("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw error;
    }
  };

  return (
    <section className="py-16 bg-cream-1 min-h-screen">
      <h1
        className={
          gloock.className +
          " fit-text leading-[1.1] text-center select-none -z-10 " +
          mainColor
        }
      >
        CREATE
      </h1>

      <div className="container">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            className="border-4 border-white-1 bg-transparent px-8 py-2 rounded-full outline-none focus:outline-none text-white-1 placeholder:text-white-2 text-2xl focus:border-black-3 focus:text-black-3 focus:placeholder-black-3 transition-all duration-300"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="border-4 border-white-1 bg-transparent px-8 py-2 rounded-full outline-none focus:outline-none text-white-1 placeholder:text-white-2 text-2xl focus:border-black-3 focus:text-black-3 focus:placeholder-black-3 transition-all duration-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            className="bg-white-1 text-black-1 py-4 mt-8 rounded-full hover:bg-black-3 hover:text-white-1 font-bold text-2xl transition-colors duration-150 ease-in"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Loading..." : "Create"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateBlogPage;
