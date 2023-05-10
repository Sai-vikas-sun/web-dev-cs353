const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt")


//GET USER by query which can be username or userId
router.get("/",async(req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId ? await User.findById(userId)
        : await User.findOne({username: username});
        //send only needed info
        // console.log("user: "+ user)
        const {password,updatedAt,...userDetails} = user._doc
        res.status(200).json(userDetails);
    }
    catch(err){
        return res.status(500).json(err);
    }
})

//UPDATE USER - can also use protect
router.put("/:id",async(req,res)=>{
    console.log(req.params.id)
    console.log("cU"+req.body.curUserId)
    console.log(req.params.id===req.body.curUserId)
    if(req.body.curUserId === req.params.id){ 
        if(req.body.password){ //if user wants to update password -> then we have to encrypt new password and save!
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
                // console.log(req.body.password)
            }
            catch(err){
                return res.status(500).json(err);
            }
        }

        //for updating fields in dB
        
        try{
            const {curUserId,...userDetails} = req.body            
            // console.log("uuserDetails)
            const updatedUser = await User.findByIdAndUpdate(req.body.curUserId,{$set: userDetails});  //find user by userId and update details ,can also use { $set : {<field1>:<value1>,...}}
            console.log("updated" + updatedUser);
            // res.status(200).json("User details updated successfully!");
            res.status(200).json(updatedUser)
        }
        catch(err){
            return res.status(500).json("updating user details errrr");
        }
    }
    else{ //a user can update his details but not other user's details unless he is admin
        res.status(403).json("Only user can update details!") //403 - client is forbidden from accessing a valid URL
    }
})


//DELETE USER
router.delete("/:id",async(req,res)=>{
    console.log("b ",req.body)
    console.log("cr",req.body.curUser)
    console.log("id",req.params.id)
    if(req.body.curUser === req.params.id || req.body.isAdmin){
        try{
            const delUser = await User.findOneAndDelete({username: req.body.curUser});
            res.status(200).json("Deleted user successfully!");
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("Only user can delete the account!");
    }
})

//FOLLOW UNFOLLOW USER
router.put("/:id/follow",async(req,res)=>{
    //curUserId in body - curr User trying to follow user who's id is present in request parameters
    console.log(req.body.curUserId);
    console.log(req.params.id);
    if(req.body.curUserId !== req.params.id){
        try{
            const user = await User.findById(req.params.id); //whom we want to follow
            const currUser = await User.findById(req.body.curUserId); 
            if(!user.followers.includes(req.body.curUserId)){
                await user.updateOne({$push: {followers: req.body.curUserId}});
                await currUser.updateOne({$push: {isFollowing: req.params.id}});
                // res.status(200).json("You are now following this user!");
                res.status(200).json(currUser);
            }
            else{
                await user.updateOne({$pull:{followers:req.body.curUserId}})
                await currUser.updateOne({$pull:{isFollowing:req.params.id}})
                // res.status(200).json("Unfollowed user successfully!");
                res.status(200).json(currUser)
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("You cannot follow/unfollow yourself!")
    }

})

// //UNFOLLOW A USER
// router.put("/:id/unfollow",async(req,res)=>{
//     if(req.body.userId !== req.params.id){
//         try{
//             const user = await User.findById(req.params.id);
//             const currUser = await User.findById(req.body.userId);
//             if(user.followers.includes(req.body.userId)){
//                 await user.updateOne({$pull:{followers:req.body.userId}})
//                 await currUser.updateOne({$pull:{isFollowing:req.params.id}})
//                 res.status(200).json("Unfollowed user successfully!");
//             }
//             else{
//                 res.status(403).json("You are not following this user!")
//             }
//         }
//         catch(err){
//             res.status(500).json(err);
//         }
//     }
//     else{
//         res.status(403).json("You cannot unfollow yourself!");
//     }
// })

module.exports=router;
