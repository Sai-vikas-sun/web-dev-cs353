import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  axios  from "axios";


const UserBlogs = ({myUser}) => {
  const username = useParams().username;
  const reqType = useParams().blogsType;
  // myUser? loadUserBlogs() :  loadSpecificBlogs()
  const [len,setLen] = useState(10);
  const [seeAll,setSeeAll] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = myUser?
        (await axios.get(`http://localhost:5000/api/blogs/profile/${myUser}`))
        :(await axios.get(`http://localhost:5000/api/blogs/profile/${username}?blogType=${reqType}`))
        setPosts(res.data);
        console.log("data ",res.data);
      }catch (err) {
        console.log("err"+err)
        alert("Not found \n");
        window.location.href="/"
      }
    };

    const showErr=()=>{
      alert("Page Not found!");
      window.location.href="/"
    }
    myUser || reqType === "likedBlogs" || reqType==="savedBlogs"? fetchPosts(): showErr()
    //  (alert("Page Not found!") (window.location.href="/"))
  }, [reqType]);


  return (
    <>
    <div className="bloginner-container">
        {posts.length>0?posts.slice(0,len).map((i) => {
          return (
            <div key={i._id} className="each-blog">
                <img src={i.image} alt="Blog pic" className="imgClass" />
              <div className="blog-fields">
                <div id="title-style">
                  <h1>{i.title}</h1>
                </div>
                <div id="description-style">
                  <p>{i.description}</p>
                </div>
              </div>
            </div>
          );
        })
      :<p style={{color:"red",fontSize: "30px"}}>User don't have any blogs</p>
      }
      {!seeAll?
  <button onClick={()=>(setLen(posts.length),setSeeAll(true))}>See All Posts</button>
    : <button onClick={()=>(setLen(10),setSeeAll(false))}>See Few Posts</button> 
    }
  </div>

      {/* </div> */}

  </>
  )
};

export default UserBlogs;