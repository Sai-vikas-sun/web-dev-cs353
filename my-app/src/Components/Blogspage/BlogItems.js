import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import Comment from "./Comment";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import "./BlogItems.css";

const BlogItems = () => {
  console.log("in blog items");
  const blogId = useParams().blogId;
  const [blogData, setBlogData] = useState();
  const [authorDetails, setAuthorDetails] = useState();
  const [title, setTitle] = useState();
  const [titleChanged, setTitleChanged] = useState(false);
  const [description, setDescription] = useState();
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [isLiked, setIsLiked] = useState();
  const [likes, setLikes] = useState(false);
  const [comments, setComments] = useState([]);
  const [addcomment, setAddcomment] = useState(false);
  const [commentChanged, setCommentChanged] = useState(false);
  const [isSaved, setIsSaved] = useState();


  var userId;
  if (localStorage.getItem("user") === null) {
    userId = "guest";
  } else {
    userId = JSON.parse(localStorage.getItem("user"))._id;
  }
  // const name = JSON.parse(localStorage.getItem("user")).name;
  // const userId = JSON.parse(localStorage.getItem("user"))._id
  console.log("blogId" + blogId);

  const onlikehandler = async () => {
    if (userId === "guest") {
      alert("Please login");
    } else {
      if (likes === false) {
        document.querySelector(".likeicon").style.fill = "#e1282d";
      } else {
        document.querySelector(".likeicon").style.color = "black";
      }

      console.log(isLiked);
      try {
        const res = await axios.put(
          "http://localhost:5000/api/blogs/" + blogId + "/like",
          { userId }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
      likes === true ? setLikes(false) : setLikes(true);
    }
  };

  const onsavehandler = async()=>{
    if (userId === "guest") {
      alert("Please login");
    }
    else{
      if (isSaved === false) {
        document.querySelector(".likeicon").style.fill = "black";
        //setIsSaved(true);
     } 
     //else {
      //   document.querySelector(".likeicon").style.color = "fff";
      // }

      console.log(isLiked);
      try {
        const res = await axios.put(
          "http://localhost:5000/api/users/" +userId+"/"+ blogId + "/save",

        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
      isSaved === true ? setIsSaved(false) : setIsSaved(true);

    }

  }

  const editTitle = async () => {
    var titleInput = document.querySelector(".edit-title");
    console.log(titleInput);
    titleInput.style.border = "2px solid #000000";
    titleInput.style.autofocus = true;
  };

  const updateTitleValue = async (e) => {
    console.log(e.currentTarget.value);
    setTitle(e.currentTarget.value);
    setTitleChanged(true);
  };

  const updateTitlehandler = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/blogs/" + blogId, {
        userId,
      });
      console.log(res.data);
      alert("title updated successfully");
      document.querySelector(".edit-title").style.border = "none";
      setTitleChanged(false);
    } catch (err) {
      console.log(err);
    }
  };

  const editDescription = async () => {
    var descInput = document.querySelector(".edit-description");
    console.log(descInput);
    descInput.style.border = "2px solid #000000";
    descInput.style.autofocus = true;
  };
  const updateDescriptionValue = async (e) => {
    console.log(e.currentTarget.value);
    setDescription(e.currentTarget.value);
    setDescriptionChanged(true);
  };
  const updateDescriptionhandler = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/blogs/" + blogId, {
        userId,
      });
      console.log(res.data);
      document.querySelector(".edit-description").style.border = "none";
      alert("description updated successfully");
      setDescriptionChanged(false);

    } catch (err) {
      console.log(err);
    }
  };

  const Commenthandler = async () => {
    console.log("I am in comment handler");
    commentChanged === false
      ? setCommentChanged(true)
      : setCommentChanged(false);
    if (commentChanged) {
      const res = await axios.get(
        `http://localhost:5000/api/blogs/${blogId}/comments`
      );
      console.log(res);
      setComments(res.data);
    } else {
      setComments("");
    }
  };

  const addcommentbtn = async () => {
    if (userId === "guest") {
      alert("Please login");
    } else {
      setAddcomment(true);
    }
  };

  const deleteBloghandler = async () => {
    try {
      const element = document.querySelector(".container");
      const res = await axios.delete(
        "http://localhost:5000/api/blogs/" + blogId,
        {
          data: {
            userId: userId,
          },
        }
      );
      console.log(res);
      element.innerHTML = "Deleted successfully";
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blogs/${blogId}`
        );
        console.log(res);
        setBlogData(res.data.postdetails);
        setAuthorDetails(res.data.userdetails);
        setTitle(res.data.postdetails.title);
        setDescription(res.data.postdetails.description);
        res.data.postdetails.likedUsers.includes(userId)
          ? setIsLiked(true)
          : setIsLiked(false);
        console.log(res.data);
        setLikes(res.data.postdetails.noOfLikes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlog();
  }, [likes]);

  // useEffect(()=>{

  // })

  // const renderBlog = ()=>{
  //   return (
  //     <>
  //     {blogData?
  //     <div>
  //       <div>{blogData.title}</div>
  //       <div>{blogData.description}</div>
  //       {/* <ThumbUpOffAltIcon className="likeicon" onClick={()=>{
  //                   onClickhandler(i._id);
  //                   // setLikenumber(i.noOfLikes+1);
  //                   // console.log("smt"+i.noOfLikes+1);
  //                 }}/>
  //                 <span className="like-number">{i.noOfLikes}</span>  */}
  //       <div>{blogData.noOfLikes}</div>
  //       <div>{isLiked}</div>
  //     </div>
  //    : <p>No blog </p>
  //     }
  //   </>
  //   )
  // }
  return (
    <>
      {blogData ? (
        <div className="singlePost">
          <div className="singlePostWrapper">
            <img
              src={blogData.image}
              alt="Blog pic"
              className="singlePostImg"
            />
            {userId === blogData.author ? (
              <h1 className="singlePostTitle">
                <input
                  type="text"
                  value={title}
                  onChange={updateTitleValue}
                  className="edit-title singlePostTitle"
                />
                {/* <div className="singlePostEdit"> */}
                {titleChanged ? (
                  <button onClick={updateTitlehandler} className="updateicon">Save</button>
                ) : (
                  <EditIcon className="updateicon" onClick={editTitle} />
                )}
                {/* </div> */}
              </h1>
            ) : (
              <h1 className="singlePostTitle">{blogData.title}</h1>
            )}
            <div className="singlePostInfo">
              <span>
                Author:
                <b className="singlePostAuthor">
                  {authorDetails.name}
                </b>
                <b className="singlePostCreatedAt">
                  {blogData.createdAt}
                </b>
              </span>
              <span></span>
            </div>
            <p className="singlePostDesc">
              {userId === blogData.author ? (
                <span className="singlePostDescSpan">
                  <textarea
                    type="textarea"
                    value={description}
                    onChange={updateDescriptionValue}
                    className="edit-description descfield"
                    rows="12" cols="60"
                    placeholder="Enter the description"
                  />
                  {descriptionChanged ? (
                    <button onClick={updateDescriptionhandler}>save</button>
                  ) : (
                    <EditIcon className="edit-description" onClick={editDescription} />
                  )}
                </span>
              ) : (
                <span>{blogData.description}</span>
              )}

            </p>
          </div>

    

          <FavoriteBorderIcon
            className="likeicon"
            onClick={() => {
              onlikehandler();
              // console.log("smt"+i.noOfLikes+1);
            }}
          />

          <span>{blogData.likedUsers.length}</span>

          <BookmarkBorderIcon
            className="saveicon"
            onClick={() => {
              onsavehandler();
              // console.log("smt"+i.noOfLikes+1);
            }}
          />

          <button
            onClick={() => {
              addcommentbtn();
              //setAddcomment(true);
            }}
          >
            Add comment
          </button>

          {addcomment ? (
            <Comment blogId={blogId} setAddcomment={setAddcomment} />
          ) : (
            ""
          )}

          <CommentIcon
            className="commenticon"
            onClick={() => {
              Commenthandler();
            }}
          />

          {userId === blogData.author ? (
            <button
              className="delete-blog-btn"
              onClick={() => {
                deleteBloghandler(blogData._id);
              }}
            >
              Delete
            </button>
          ) : (
            ""
          )}
          {comments ? (
            <div className="comment-container">
              {comments.map((c) => {
                return (
                  <div key={c._id}>
                    <span>{c.username}</span>
                    {c.description}
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <p>No blog </p>
      )}



    
    </>
  );
};

export default BlogItems;
