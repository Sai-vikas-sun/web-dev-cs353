const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/signup", async function (req, res) {
  
    const formdata = req.body;
    const userexist = await User.findOne({username:formdata.uname});
    console.log(userexist)
    if(userexist){
      res.send("Username already exists");
      return
    }
    console.log(formdata);
  
    
    // console.log(req.body)
    try{
    const user1 = await User({
      name: formdata.name,
      //dob: dob1,
      username: formdata.uname,
      password: formdata.pswd,
      cpassword: formdata.cpswd,
      phone: formdata.phonenumber,
      email: formdata.email,
    });
    await user1.save();
    res.status(200).send("ok");
  }
  catch(err){
    res.send("User not stored in db");
  }
    //console.log(req.body.password);
  });

//LOGIN 
router.post("/login", async (req, res) => {
    const loginData = req.body;
    try {
  
      const user = await User.findOne({ username: loginData.username });
      //console.log(user);
      if (!user) {
        res.send("<h2>User not found</h2>");
        return
      } 
      else {
        const isValid = await bcrypt.compare(loginData.password, user.password);
  
        if (isValid) {
          // res.status(200).send("You have logged in successfully!");
          //return res.json({status:"ok",data:"successful login"});
          const { password, cpassword, ...other } = user._doc;
          console.log(other)
          return res.json({status:"ok",user: user})
         
        } 
        else {
         return res.json({status:"error",error:"Wrong Password!", password: user.password});
        }
      }
      // console.log(req.body.password);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });

module.exports = router;