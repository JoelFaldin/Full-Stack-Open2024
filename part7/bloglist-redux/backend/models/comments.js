const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: String,
  blogId: {
    type: mongoose.Schema.ObjectId,
    ref: "blog",
  },
});

messageSchema.set("toJSON", {
  transform: (document, returned) => {
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned._v;
  },
});

module.exports = mongoose.model("Messages", messageSchema);
