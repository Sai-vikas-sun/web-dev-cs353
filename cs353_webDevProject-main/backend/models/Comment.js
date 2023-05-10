const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    blog:{
        type: String,
        ref: "Post",
        required: [true,"Post is required"]
    },
    user:{
        type: String,
        ref: "User",
        required: [true,"User is required"]
    },
    description:{
        type: String,
        required: [true,"Description is required"]
    },
    },
    {timestamps: true}
);

const Comment = mongoose.model("Comment",commentSchema);
module.exports = Comment;