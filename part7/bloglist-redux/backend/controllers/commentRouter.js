const commentRouter = require("express").Router();

const Comments = require("../models/comments");

commentRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const comments = await Comments.find({ blogId: id });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = commentRouter;
