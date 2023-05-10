const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  /*dob: {
    type: String,
    required: [false],
  },*/
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  cpassword:{
    type:String
  },
  phone: Number,
  email: String,
  bio :  String,
  blogs:[
    {
      type: String,
      ref: "Post",
    }
  ],
  noOfBlogs:{
    type:Number,
    default:0
  },
  profilePicture:"",
  coverPicture:"",
  isFollowing:[
    {
      type:String,
      ref:"User",
    }
  ],
  followers:[
    {
      type:String,
      ref:"User",
    }
  ],
  likedBlogs:[
    {
      type : String,
      ref: "Post",
    }
  ],
  savedBlogs:[
    {
      type: String,
      ref: "Post",
    }
  ],
  deletedBlogs:[
    {
      type:String,
      ref:"Post",
    }
  ],
  isAdmin:{
    type:Boolean,
    default:false,
  }},
  {timestamps:true}
);

UserSchema.pre("save", async function (next) {
  // console.log("hi from inside");
  if (this.isModified("password")) {
    this.password =  await bcrypt.hash(this.password, 12);
  }
  /*if (this.isModified("cpassword")) {
    this.password =  await bcrypt.hash(this.cpassword, 12);
  }*/
   next();
});
/*UserSchema.pre("save", async function (next) {
  // console.log("hi from inside");
  
   next();
});*/
module.exports = mongoose.model("User", UserSchema);
