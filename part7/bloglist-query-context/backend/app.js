const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
// Currently using mongoose@7.6.5
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const loginRouter = require("./controllers/loginRouter");
const blogRouter = require("./controllers/blogRoutes");
const userRouter = require("./controllers/userRoutes");

// Middlewares:
const { getToken } = require("./middleware/tokenMiddleware");
const { getUser } = require("./middleware/userMiddleware");
const messageRouter = require("./controllers/messagesRouter");

const mongoURL = config.MONGODB_URI;
mongoose.set("strictQuery", false);
// console.log(mongoURL)
mongoose
  .connect(mongoURL)
  .then(() => {
    logger.data("DataBase conected! 🛸");
  })
  .catch(error => {
    logger.problem("DataBase refused to connect. ", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/messages", messageRouter);

app.use(getToken);
app.use(getUser);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

module.exports = app;
