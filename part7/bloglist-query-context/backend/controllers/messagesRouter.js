const messageRouter = require("express").Router();
const mongoose = require("mongoose");

const Message = require("../models/messages");
const Blog = require("../models/blog");

messageRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const messages = await Message.find({ blogId: id });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
});

messageRouter.post("/new", async (req, res) => {
  const body = req.body;

  if (!body.comment || !body.blogId) {
    return res.status(400).json({ error: "Message and blog id shouldnt be empty!" });
  } else if (!mongoose.Types.ObjectId.isValid(body.blogId)) {
    return res.status(400).json({ error: "Invalid blog id." });
  }

  try {
    const blog = await Blog.findById(body.blogId);

    if (!blog) {
      return res.status(400).json({ error: "Theres no blog with that id." });
    }

    const message = new Message({
      message: body.comment,
      blogId: body.blogId,
    });

    await message.save();
    return res.status(201).json({ message: "Message saved!", message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "There was a problem trying to save the message.", error });
  }
});

module.exports = messageRouter;
