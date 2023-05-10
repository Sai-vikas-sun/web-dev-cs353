import React, { useEffect } from "react";
import img from "../Images/tree-736885__480.jpg";
import coverImage from "../Images/bg4.jpg";
import defImage from "../Images/pexels-kaboompics-com-6469.jpg";
import EditIcon from '@mui/icons-material/Edit';
import "./Profile.css";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import UserBlogs from "./UserBlogs";

const Profile = () => {
  const username = useParams().username; //for changing it -> also change in app.js
  console.log("username is",username);
  const [userDetails,setUserDetails] = useState({});
  const userD = JSON.parse(localStorage.getItem("user")!==null);
  const curUser = userD?JSON.parse(localStorage.getItem("user"))["username"] : "guest";
  const curUserId = userD?JSON.parse(localStorage.getItem("user"))["_id"]: "guest";
  const [bio,setBio] = useState();
  const [isFollowing,setIsFollwing] = useState(false);
  const [bioChanged,setBioChanged] = useState(false);

  const handleEditBio = async()=>{
    const bioInput = document.getElementsByClassName("bioInput")[0]
    console.log("i"+bioInput.style)
    bioInput.style.border = "2px solid #000000";
    bioInput.style.autofocus = true;
  }

  const handleBioVal = async(e)=>{
    console.log(e.currentTarget.value);
    setBio(e.currentTarget.value);
    setBioChanged(true);
  }

  const handleFollowUnFollowUser = async() =>{
    if(curUser === "guest"){
      alert("Login First!")
    }
    else{
      try{
      const res = await axios.put(`http://localhost:5000/api/users/${userDetails._id}/follow`,{curUserId})
      const val = isFollowing
      setIsFollwing(!isFollowing)
      console.log(res.data);
      localStorage.removeItem("user");
      localStorage.setItem("user",JSON.stringify(res.data));
      val?alert("You are unfollowing this user "):alert("You are following this user now")
      }
      catch(err){
      console.log(err)
      }
    }
  }

  const handleUpdateBio= async()=>{
    const id = userDetails._id
    try{
      const res = await axios.put(`http://localhost:5000/api/users/${userDetails._id}`,{curUserId,bio})
      console.log(res.data);
      alert("Bio Updated Successfully")
      setBioChanged(false)
      const bioInput = document.getElementsByClassName("bioInput")[0].style.border = "none"
      localStorage.removeItem("user");
      localStorage.setItem("user",JSON.stringify(res.data))
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    const fetchUser = async () => {
      try{
        console.log("username",username);
        const res = await axios.get(`http://localhost:5000/api/users/?username=${username}`)
        setUserDetails(res.data)
        res.data.followers.includes(curUserId)?setIsFollwing(true):setIsFollwing(false);
        res.data.bio?setBio(res.data.bio):setBio("Click to add bio")
        console.log("data" +res.data)
      }
      catch(err){
        alert("User not found!")
        window.location.href="/"
      }
    }
    fetchUser()
  },[username])
  return (
    <>
      <div className="profileMainContainer">
        <Sidebar username={username}/>
        <div className="outerContainer">
          <div className="userContainer">
            <div className="uImage">
              {console.log("cover" +userDetails.coverPicture)}
              {userDetails.coverPicture?
                <img className="userImageCover" src= {userDetails.coverPicture} alt="cover" />
                :<img className="userImageCover" src= {coverImage} alt="cover" />
              }
              {userDetails.profilePicture?
                 <img className="userImage" src={userDetails.profilePicture} alt="img" /> 
                :<img className="userImage" src={img} alt="img" /> 
              }
            </div>
            <div className="userDetails">
              <h4 className="userName">Name : {userDetails.name}
                {username!==curUser?<button onClick={handleFollowUnFollowUser}>
                  {isFollowing?"UnFollow":"Follow"}
                </button> 
                :<p></p>}
              </h4>
              {username===curUser?
                (
                  <span>
                    Bio : 
                  <input id="bio" onChange={handleBioVal} value={bio} className="bioInput"/>
                  {bioChanged?
                  <button onClick={handleUpdateBio}>Update</button>
                  :<EditIcon className='sidebarIcon' onClick={handleEditBio}/>
                  }
                </span>
                )
                :<span>
                  Bio : {bio?bio: "User haven't added bio"}
                </span>
              }
              <h2>Phone: {userDetails.phone}</h2>
              <h2>Email : {userDetails.email}</h2>
            </div>
          </div>
          <h2>Posts</h2>
          <div className="posts">
          <UserBlogs myUser={username}/>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Profile;

// followers 
// following
// liked Blogs
// saved Blogs
//material UI
//  emotion Style
