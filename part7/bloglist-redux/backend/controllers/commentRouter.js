const commentRouter = require("express").Router();

const Comment = require("../models/comments");
const Blog = require("../models/blog");

commentRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const comments = await Comment.find({ blogId: id });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
});

commentRouter.post("/new", async (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body.message || !body.blogId) {
    return res
      .status(400)
      .json({ error: "Message and blog id shouldnt be empty!" });
  }

  try {
    const blog = await Blog.findById(body.blogId);

    if (!blog) {
      return res.status(400).json({ error: "No blog with that id was found." });
    }

    const comment = new Comment({
      message: body.message,
      blogId: body.blogId,
    });

    await comment.save();
    return res.status(201).json({ message: "Comment saved!", comment });
  } catch (error) {
    return res.status(500).json({
      error: "There was a problem trying to submit the comment.",
      error,
    });
  }
});

module.exports = commentRouter;
