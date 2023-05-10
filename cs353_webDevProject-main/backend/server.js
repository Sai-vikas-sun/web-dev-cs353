const express = require("express");
const bodyParser = require("body-parser");
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
// app.use(bodyParser.json())


db();
//middle wares
// app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use("/api/users",userRoute); 
app.use("/api/auth",authRoute);
app.use("/api/blogs",postRoute);

app.listen(5000, function () {
  console.log("I am listening at port 5000");
});

