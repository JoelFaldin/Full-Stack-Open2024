const userRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });

  const formattedUsers = users.map((userData) => {
    return { ...userData._doc, blogs: userData.blogs.length };
  });
  res.status(200).json(formattedUsers);
});

userRouter.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  if (id.length !== 24) {
    return res.status(400).json({ error: "Invalid id format." });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ error: "There are no users with that id." });
    }

    const blogs = await Blog.find({
      _id: { $in: user.blogs.map((id) => id) },
    });

    return res.status(201).json(blogs);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter.post("/", async (req, res) => {
  const body = req.body;

  // Checking that fields are not empty:
  if (body.username === "" || body.password === "" || body.name === "") {
    res.status(400).json({ error: "You should fill all fields!" });
    return;
  }

  const salt = 10;
  const passwordHash = await bcrypt.hash(body.password, salt);

  const user = new User({
    username: body.username,
    password: passwordHash,
    name: body.name,
  });

  try {
    const request = await user.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: "Invalid user!" });
  }
});

module.exports = userRouter;
