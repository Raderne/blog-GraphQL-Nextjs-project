"use client";

import { useGlobalContext } from "@/app/context";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Gloock } from "next/font/google";
import { fetchData } from "@/utils/fetchData";
import BlogCard from "@/components/BlogCard";

const gloock = Gloock({ subsets: ["latin"], weight: "400" });

const ProfilePage = () => {
  const { token, userId, setMainColor, mainColor, logout } = useGlobalContext();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserBlogs = async () => {
    setLoading(true);
    try {
      const requestBody = {
        query: `
                query UserBlogs($id: ID!) {
                    UserBlogs(userId: $id) {
                        _id
                        title
                        content
                        createdAt
                        updatedAt
                    }
                }
            `,
        variables: {
          id: userId,
        },
      };

      const response = await fetchData(requestBody, token);
      console.log(response);
      setBlogs(response.data.UserBlogs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw error;
    }
  };

  const Logout = () => {
    logout();
    router.push("/auth");
  };

  useEffect(() => {
    if (!token) {
      router.push("/auth");
      return;
    }

    setMainColor("text-black-3");
  }, [token, router, setMainColor]);

  useEffect(() => {
    if (userId) {
      getUserBlogs();
    }
  }, []);

  return (
    <section className="bg-offwhite-1 min-h-screen pt-16 pb-10">
      <h1
        className={
          gloock.className +
          " fit-text leading-[1.1] text-center select-none -z-10 " +
          mainColor
        }
      >
        MYBLOG
      </h1>

      <div className="px-24">
        <div className="flex items-center gap-8 justify-between flex-wrap">
          {loading ? (
            <p>Loading...</p>
          ) : (
            blogs.map((blog) => {
              return <BlogCard key={blog._id} blog={blog}
                extraStyles="border-white-1 bg-black-3"
              />;
            })
          )}
        </div>
        <div
          className="flex items-center justify-center gap-12 w-full border-4 px-10 py-8 rounded-full mt-10 bg-black-3 cursor-pointer"
          onClick={Logout}
        >
          <h1
            className={
              gloock.className + " text-center select-none font-bold text-5xl "
            }
          >
            LOGOUT
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
