const blogRouter = require("express").Router();
const ObjectId = require("mongodb").ObjectId;

const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  blogs.sort((a, b) => b.likes - a.likes);
  res.status(200).json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;
  if (body.title === "" || body.url === "") {
    res.status(401).json({ error: "Title and url shouldnt be empty!" });
    return;
  }

  const token = req.get("Authorization");
  if (!token) {
    return res.status(401).json({ error: "You should provide a token!" });
  }

  const user = req.user;

  if (user) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id,
    });

    try {
      const blogs = await blog.save();
      user.blogs = user.blogs.concat(blogs._id);
      await user.save();
      const finalBlogs = await Blog.findById(blogs.id).populate("user", {
        username: 1,
        name: 1,
        id: 1,
      });

      res.status(201).json({
        message: `The blog '${blog.title}' was added!`,
        blog: finalBlogs,
      });
    } catch (error) {
      res.status(401).json({ error: "The blog is not valid!" });
    }
  } else {
    res.status(401).json({ error: "User not found ???" });
  }
});

blogRouter.delete("/:id", async (req, res) => {
  const userRequest = req.user;
  const id = req.params.id;
  const blog = await Blog.findOne({ _id: id }).populate("user", {
    username: 1,
  });

  if (userRequest._id.toString() === blog.user._id.toString()) {
    await Blog.findByIdAndDelete(req.params.id);

    const newBlogs = userRequest.blogs;
    const deletedId = new ObjectId(id);
    userRequest.blogs = newBlogs.filter(id => !id.equals(deletedId));
    await userRequest.save();

    res.status(204).json({ message: "Blog deleted!" });
  } else {
    res.status(401).json({ error: "You are not the creator of the blog!" });
  }
});

blogRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const searchBlog = await Blog.findById(req.params.id);
  if (searchBlog) {
    const blog = new Blog({
      _id: req.params.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    });

    const result = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Wrong blog identifier!" });
  }
});

module.exports = blogRouter;
