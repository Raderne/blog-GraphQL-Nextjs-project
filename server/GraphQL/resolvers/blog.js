const Blog = require("../../MongoDB/Models/blog");
const User = require("../../MongoDB/Models/user");

const transformBlog = (blog) => {
  return {
    ...blog._doc,
    creator: user.bind(this, blog.creator),
  };
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdBlogs: blogs.bind(this, user._doc.createdBlogs),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const blogs = async (blogIds) => {
  try {
    const blogs = await Blog.find({
      _id: {
        $in: blogIds,
      },
    });
    return blogs.map((blog) => {
      return {
        ...blog._doc,
        creator: user.bind(this, blog.creator),
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  blogs: async () => {
    try {
      const blogs = await Blog.find();
      if (!blogs) {
        throw new Error("No blogs found.");
      }
      return blogs.map((blog) => {
        return transformBlog(blog);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  blog: ({ id }) => {
    return {};
  },
  createBlog: async ({ blogInput }) => {
    const { title, content } = blogInput;
    if (!title || !content) {
      throw new Error("Title and content are required.");
    }

    const newBlog = new Blog({
      title,
      content,
      creator: "66a2077a508581c2ea98919a",
    });

    let createdBlog;
    try {
      const result = await newBlog.save();
      createdBlog = transformBlog(result);

      const creator = await User.findById("66a2077a508581c2ea98919a");
      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdBlogs.push(newBlog);
      await creator.save();

      return createdBlog;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteBlog: ({ id }) => {},
  updateBlog: ({ id, title, content }) => {},
};
