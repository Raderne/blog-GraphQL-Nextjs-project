import React from "react";

const BlogCard = ({ blog, extraStyles }) => {
  const { title, updatedAt } = blog;

  let formattedDate = new Date(+updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={"flex flex-col flex-1 px-12 py-8 gap-10 rounded-3xl border-4 min-w-96 " + extraStyles}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm font-bold">{formattedDate}</p>
    </div>
  );
};

export default BlogCard;
