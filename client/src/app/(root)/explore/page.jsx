"use client";
import { useGlobalContext } from "@/app/context";
import BlogCard from "@/components/BlogCard";
import { fetchData } from "@/utils/fetchData";
import { Gloock } from "next/font/google";
import { useEffect, useState } from "react";

const gloock = Gloock({ subsets: ["latin"], weight: "400" });

const ExploreBlogsPage = () => {
  const { setMainColor, mainColor } = useGlobalContext();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMainColor("text-white-1");
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    let requestBody = {
      query: `
            query {
                blogs {
                    _id
                    title
                    updatedAt
                }
            }
        `,
    };

    try {
      const response = await fetchData(requestBody);
      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw new Error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="py-16 min-h-screen bg-blue-1">
      <h1
        className={
          gloock.className +
          " fit-text leading-[1.1] text-center select-none -z-10 " +
          mainColor
        }
      >
        EXPLORE
      </h1>

      <div className="px-4 flex flex-wrap justify-center gap-4 mt-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              extraStyles="bg-white-1 text-black-1"
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ExploreBlogsPage;
