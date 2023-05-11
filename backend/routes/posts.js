const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const cors = require('cors');
const express = require("express");
const app = express();

app.use(cors());
//import { ObjectId } from 'mongodb';
router.post("/createblog",async(req,res)=>{
  // console.log(req.body);
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const userId= req.body.userId; //username
  const image = req.body.image;
  console.log("body --- ");
  //console.log(req.body)
  // console.log("image : " + image);
  try{
        const userfound = await User.findById(userId);
        if(!userfound){
          return res.json({msg: "User not found"});
        }
        console.log("user: ",userfound)
        const savedBlog = await Post.create({
          title:title,
          description:description,
          category:category, //change 
          image:image,
          author:userId,
        })
      console.log("savedBlog" ,savedBlog._id);
      //console.log("blogs: ",userfound.blogs)
      // userfound.blogs.push(savedBlog._id);
      // userfound.noOfBlogs+=1;
       await userfound.updateOne({$set:{noOfBlogs: userfound.noOfBlogs+1},$push: {blogs: savedBlog._id}})
       console.log("hello");
       console.log(userfound.noOfBlogs);

      //   await userfound.save();
          res.status(200).json("success");
      }

      catch(err) {
            console.log(err);
            res.json(err)
      }
    

})

//GET A POST
router.get("/:id", async (req, res) => {
  try {
    console.log("calleeddd")
    const post = await Post.findById(req.params.id);
    const user = await User.findById(post.author);
    var details ={
      postdetails:post,
      userdetails:user,
    }
    console.log(details);
    !post && res.status(404).json("post not found");
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER'S ALL POSTS 
router.get("/profile/:username",async(req,res)=>{
  if(req.query.blogType === "likedBlogs" || req.query.blogType === "savedBlogs"){
      try{
          const user = await User.findOne({username: req.params.username})
          console.log("user : ",user)
          const reqBlogs = req.query.blogType === "likedBlogs"?
          (
              await Promise.all(
              user.likedBlogs.map((blog)=>{
                  console.log("blog",blog)
                  return Post.findOne({_id: blog})
              })
              )
          ):(
              await Promise.all(
                  user.savedBlogs.map((blog)=>{
                      console.log("blog",blog)
                      return Post.findOne({_id: blog})
                  })
                  )
          )
          console.log("p : "+reqBlogs)
          res.status(200).json(reqBlogs);
      }
      catch(err){
          console.log(err)
          return res.status(500).json(err);
      }
  }
  else{
      try{
          const user = await User.findOne({username: req.params.username});
          const posts = await Post.find({author: user._id});
          console.log("posts : "+posts);
          res.status(200).json(posts);
      }
      catch(err){
          res.status(500).json(err);
      }
  }
  // console.log("postTYPE" , posts)
  // console.log(req.query.blogType)
  console.log("end")
})



//GET TIMELINE POSTS
router.get("/timeline/:id", async (req, res) => {
  try {
    //user logged in - shld also implement for not loggedin users.
    console.log(typeof req.params.id);
    console.log(req.params.id);

    if (req.params.id === "guest") {
      const allposts = await Post.find();
      return res.json(allposts);
    }

    else {
      const curUser = await User.findOne({ _id: req.params.id });

      console.log(curUser._id);
      // const userPosts = await Post.find({author: curUser._id});
      const userPosts = await Post.find({ author: curUser._id });

      console.log("--------");
      console.log(userPosts);

      const friendPosts = await Promise.all(
        curUser.isFollowing.map((usr) => {
          return Post.find({ author: usr });
        })
      ); //saving all to friendPosts
      const finalPosts = userPosts.concat(...friendPosts);
      const all_posts= await Post.find();
      console.log(typeof all_posts);
      // console.log(all_posts);
      var n = all_posts.length;
      console.log("all posts length"+n);
      console.log("final posts length"+finalPosts.length);
      const sendPosts = finalPosts.concat(all_posts)
      // all_posts.forEach(item=>{
      //   if(item[_id])

      // })
      //console.log(finalPosts);
      res.json(sendPosts);
      // res.json(userPosts);
    }

  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET POSTS BY CATEGORY
router.get("/category/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const posts = await Post.find({ category: req.params.id });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Updated post successfully!");
    } else {
      res.status(403).json("Cannot update another user's post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A POST
router.delete("/:id", async (req, res) => {
  try {
    console.log("entered in delete");
    console.log("url post id"+req.params.id);
    console.log("owner user id"+req.body.userId);
    const post = await Post.findById(req.params.id);
    console.log(post);
    if (post.author === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Deleted post successfully");
    } 
    else {
      res.status(403).json("You are not allowed to delete this post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LIKE A POST
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);
    console.log("body: ",req.body)
    if (!post.likedUsers.includes(req.body.userId)) {
      await post.updateOne({ $push: { likedUsers: req.body.userId } });
      post.noOfLikes+=1;
      console.log("after liking : "+post.likedUsers)
      await user.updateOne({$push:{likedBlogs:req.params.id}});
      res.status(200).json("You liked this post!");
    } else {
      await post.updateOne({ $pull: { likedUsers: req.body.userId } });
      post.noOfLikes-=1;
      await user.updateOne({$pull:{likedBlogs:req.params.id}});
      res.status(200).json("You disliked this post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//saveposts



//comments
router.post("/:id/comments",async(req,res)=>{
  try{
    const blogId = req.params.id;
    const userId = req.body.userId;
    const description = req.body.description;
    const username = req.body.username;
    const savedcommment = await Comment.create({
      blog:blogId,
      user:userId,
      username:username,
      description: description,
    });
    res.status(200).json("comment success");

  }
  catch(err){
    console.log(err);
    res.json(err);
  }
})

//get a comment
router.get("/:id/comments",async(req,res)=>{
  try{
    console.log("get comments");
    const comments = await Comment.find({blog:req.params.id});
    console.log(comments);
    res.status(200).json(comments);

  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }

});

module.exports = router;