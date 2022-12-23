const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  postComment: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now
  }
});

postSchema.virtual("postId").get(function (){
  return this._id.toHexString() 
})
postSchema.set("toJSON", {virtuals: true})

module.exports = mongoose.model("post", postSchema);