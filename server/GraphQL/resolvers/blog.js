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
  UserBlogs: async ({ userId }, context) => {
    const req = context.req;
    if (!req.raw.isAuth) {
      throw new Error("Unauthenticated.");
    }
    
    try {
      const blogs = await Blog.find({
        creator: userId,
      });
      return blogs.map((blog) => {
        return transformBlog(blog);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  blog: async ({ id }) => {
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        throw new Error("Blog not found.");
      }

      return transformBlog(blog);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createBlog: async ({ blogInput }, context) => {
    const req = context.req;

    if (!req.raw.isAuth) {
      throw new Error("Unauthenticated.");
    }

    const { title, content } = blogInput;
    if (!title || !content) {
      throw new Error("Title and content are required.");
    }

    const newBlog = new Blog({
      title,
      content,
      creator: req.raw.userId,
    });

    let createdBlog;
    try {
      const result = await newBlog.save();
      createdBlog = transformBlog(result);

      const creator = await User.findById(req.raw.userId);
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
  deleteBlog: async ({ id }, context) => {
    const req = context.req;
    if (!req.raw.isAuth) {
      throw new Error("Unauthenticated.");
    }

    try {
      const blog = await Blog.findById(id).populate("creator");
      if (!blog) {
        throw new Error("Blog not found.");
      }

      const creator = {
        ...blog.creator._doc,
        createdBlogs: blog.creator.createdBlogs.filter(
          (blogId) => blogId.toString() !== id
        ),
      };

      await Blog.findByIdAndDelete(id);
      await User.findByIdAndUpdate(
        creator._id,
        {
          createdBlogs: creator.createdBlogs,
        },
        { new: true }
      );

      return transformBlog(blog);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateBlog: async ({ id, title, content }, context) => {
    const req = context.req;
    if (!req.raw.isAuth) {
      throw new Error("Unauthenticated user.");
    }

    if (!title && !content) {
      throw new Error("Title or content is required.");
    }

    if (!id) {
      throw new Error("Blog id is required.");
    }

    try {
      const newBlog = await Blog.findById(id);
      if (!newBlog) {
        throw new Error("Blog not found.");
      }

      newBlog.title = title || newBlog.title;
      newBlog.content = content || newBlog.content;

      const result = await newBlog.save();
      return transformBlog(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
