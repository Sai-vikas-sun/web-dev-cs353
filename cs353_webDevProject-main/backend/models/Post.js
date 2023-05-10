const express = require("express");
const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
    },
    description:{
        type:String,
        required:[true,"Description is required"],
    },
    category:{
        type:Array,
        required:[true,"Blog category is required"],
        default:"All",
    },
    author:{
        type:String, //while searching userId mongoose will automatically cache it as userId
        ref: "User",
        required:[true,"Author Id is required"]
    },
    image:{
        type:String,
        default:"",
    },
    noOfViews:{
        type: Number,
        default:0
    },
    noOfLikes:{
        type: Number,
        default: 0
    },
    likedUsers:[
        {
        type: String,
         ref: "User",
        //default :[]
          }
     ],
     isBlogDeleted:{
        type:Boolean,
        default:false,
     },
    },
    {timestamps:true}
);

module.exports = mongoose.model("Post", PostSchema);