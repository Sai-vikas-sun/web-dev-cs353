const express = require("express");
const mongoose = require("mongoose");
const db = async () => {
  const conn = await mongoose.connect(
    // "mongodb+srv://saivikas:Vikas%402003@mongodb-demo.21lkg2i.mongodb.net/?retryWrites=true&w=majority"
    "mongodb+srv://saivikas:Vikas%402003@mongodb-demo.21lkg2i.mongodb.net/BlogProjectdb?retryWrites=true&w=majority"
  );
  console.log("Db connected");
};

module.exports = db;