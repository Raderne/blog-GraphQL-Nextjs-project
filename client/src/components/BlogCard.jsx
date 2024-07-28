import React from "react";

const BlogCard = ({ blog }) => {
  const { title, updatedAt } = blog;

  let formattedDate = new Date(+updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col px-12 py-8 gap-10 bg-black-3 rounded-3xl border-4 min-w-96 border-white-1">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm font-bold">{formattedDate}</p>
    </div>
  );
};

export default BlogCard;
