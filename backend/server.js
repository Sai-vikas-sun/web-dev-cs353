const express = require("express");
// const bodyParser = require("body-parser");
const db = require("./config/conn");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("./models/User");
const Post = require("./models/Post");
const cors = require('cors');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// const multer = require("multer");
// const upload = multer({dest: './uploads/'})
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config({ path: "./config/.env" });
app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb',extended: true}));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));



db();
//middle wares
// app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json())
app.use("/api/users",userRoute); //whenever we go to that adress, it will launch the userRoute    rest API
app.use("/api/auth",authRoute);
app.use("/api/blogs",postRoute);

// app.use("./uploads")

// // bcrypt
// app.get("/Blogs",async(req,res)=>{
//   try{
//     //res.render("posts");
//     const blogs = await Post.find();
//     console.log(blogs);
//     res.send({status:"ok",data:blogs});
//   }
//   catch(err){
//     console.log(err);
//   }
// })

// app.get("/Blogs",(req,res)=>{
//   Post.find({}).then((items)=>{res.json(items) ;console.log(items)}).catch((err)=>console.log(err));
// });

// app.post("/login", async (req, res) => {
//   const loginData = req.body;
//   try {

//     const user = await User.findOne({ username: loginData.username });
//     //console.log(user);
//     if (!user) {
//       res.send("<h2>User not found</h2>");
//       return
//     } 
//     else {
//       const isValid = await bcrypt.compare(loginData.password, user.password);

//       if (isValid) {
//         // res.status(200).send("You have logged in successfully!");
//         //return res.json({status:"ok",data:"successful login"});
//         const { password, cpassword, ...other } = user._doc;
//         console.log(other)
//         return res.json({status:"ok",user: user})
       
//       } 
//       else {
//        return res.json({status:"error",error:"Wrong Password!", password: user.password});
//       }
//     }
//     // console.log(req.body.password);
//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// });
 

// app.post("/createblog",async(req,res)=>{
//   // console.log(req.body);
//   const title = req.body.title;
//   const description = req.body.description;
//   const category = req.body.category;
//   const username= req.body.username; //username
//   const image = req.body.image;
//   console.log("body --- ");
//   console.log(req.body)
//   // console.log("image : " + image);
//   try{
//         const userfound = await User.findOne({username:username});
//         if(!userfound){
//           return res.json({msg: "User not found"});
//         }
//         console.log(userfound)
//         const savedBlog = await Post.create({
//           title:title,
//           description:description,
//           category:category, //change 
//           image:image,
//           author:username,
//         })
        
//       userfound.blogs.push(savedBlog);
//       userfound.noOfBlogs+=1;
//        //await userfound.updateOne({$set:{noOfBlogs: userfound.noOfBlogs+1}},{$push: {blogs: savedBlog}})

//         await userfound.save();
        
//       }

//       catch(err) {
//             console.log(err)
//          }
//     res.json(200);

// })

// app.post("/createblog",upload.single("image"),async(req,res)=>{
  
//   console.log(req.file);
//   console.log(req.body);
//   const image = req.file.filename;
//   const title = req.body.title;
//   const description = req.body.description;
//   const category = req.body.category;
//   const username= req.body.username;

//   let fileType = req.file.mimetype.split("/")[1]; //mimetype : img/jpeg 
//   let newFileName = req.file.filename+ "."+ fileType;
//   console.log(fileType);
//   console.log(newFileName);
//   fs.rename(`./uploads/${req.file.filename}`,`./uploads/${newFileName}`,()=>{
//     console.log("callback");
//   })
//   try{
//     const userfound = await User.findOne({username:username});
//     if(!userfound){
//       return res.json({msg: "User not found"});
//     }
//     const savedBlog = await Post.create({
//       title:title,
//       description:description,
//       category:category,
//       image:newFileName,
//       author:username,
//     })

//     userfound.blogs.push(savedBlog);
//     userfound.noOfBlogs+=1;
//     await userfound.save();


//   } catch(err) {
//     console.log(err)
//   }
   
  
//   //console.log(req.file.filename);

//   // console.log(desc);

//   res.json(200);
//   // res.json("received"+blogData);
// })
// // app.get("/userprofile", async function (req, res) {
// //   // await res.sendFile(__dirname+"/userprofile.hbs");
// //   // res.setHeader('Content-Type', 'application/javascript');
// //   res.render("userprofile");
// // });

// // app.post("/userprofile",async function (req,res){
// //   try{
// //     const savedPost = await Post.create({
// //         title: req.body.title,
// //         description: req.body.description,
// //         author: req.body.author,
// //     });
// //     //find user and save post in user.posts 
// //     const usrFound = await User.findOne({username: req.body.author});
// //     if(!usrFound){
// //         return res.json({msg: "User not found"});
// //     }
// //     usrFound.posts.push(savedPost._id);
// //     usrFound.noOfPosts = usrFound.noOfPosts+1;
// //     const nPosts = usrFound.noOfPosts;
// //     await usrFound.save();
    
// //     res.status(200).send("Successfully saved "+ "No of posts from user : "+nPosts);

// //     // res.redirect("/posts");
// //     // res.json(savedPost); //check this
    
// //   }
// //   catch(err){
// //     res.json({message: err})
// //   }

// });




// app.post("/signup", async function (req, res) {
  
//   const formdata = req.body;
//   const userexist = await User.findOne({username:formdata.uname});
//   console.log(userexist)
//   if(userexist){
//     res.send("Username already exists");
//     return
//   }
//   console.log(formdata);

  
//   // console.log(req.body)
//   try{
//   const user1 = await User({
//     name: formdata.name,
//     //dob: dob1,
//     username: formdata.uname,
//     password: formdata.pswd,
//     cpassword: formdata.cpswd,
//     phone: formdata.phonenumber,
//     email: formdata.email,
//   });
//   await user1.save();
  
//   res.status(200).send("ok");
// }
// catch(err){
//   res.send("User not stored in db");
// }
//   //console.log(req.body.password);
// });






// //checl /userProfile

app.listen(5000, function () {
  console.log("I am lis at port 5000");
});

