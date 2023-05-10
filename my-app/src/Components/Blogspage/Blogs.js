import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Categories from "./Categories";
import BlogItems from "./BlogItems";
//import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

//import "bootstrap/dist/css/bootstrap.css";
//import BlogList from "./BlogList";
import "./Blogs.css";
import axios from "axios";
import {Pagination,PaginationItem,PaginationLink} from "reactstrap";
const Blogs = ({ categories }) => {
  const [data, setData] = useState([]);
  const [selectCat,setSelectCat] = useState("all");
  
  //const [likenumber,setLikenumber] = useState(false);
  const [isLiked,setIsLiked] = useState(false);
  const[blog_id,setBlog_id]=useState();
  var  userId;
  if(localStorage.getItem("user")===null){
    userId="guest";
  }
  else{
    userId = JSON.parse(localStorage.getItem("user"))._id
  }

//  function onClickhandler(x){
//     setBlog_id(x);
//     console.log("blog_id in clickhandler"+blog_id);
//     var blog = document.getElementById(x) 

//     // console.log(blog)

//     blog = blog.getElementsByClassName("blog-fields")[0]

//     // console.log(blog)

//     const count = blog.getElementsByClassName("like-number")[0].innerText

//     // alert(count)
//     if(isLiked===false){
//       blog.getElementsByClassName("like-number")[0].innerText = parseInt(count) + 1;
//       setIsLiked(true);

//     }
//     else{
//       blog.getElementsByClassName("like-number")[0].innerText = parseInt(count) - 1;
//       setIsLiked(false);
//     }

    
    
//     //likenumber===true?setLikenumber(false): setLikenumber(true);
//   }

  function bloghandler(id){
    console.log("clicked");
    window.location.href=`/Blogs/${id}`

  }
   

  
  useEffect(() => {
    try{
      axios.get("http://localhost:5000/api/blogs/timeline/"+userId, {})
        .then((res) => {
          console.log(res.data, "user data");
          setData(res.data);
        });
    }
    catch(err){
      console.log(err);
    }
  }, [])

  useEffect(() => {
      const fetchData = async () => {
        console.log(selectCat);
        
        try {
        axios.get("http://localhost:5000/api/blogs/category/"+selectCat, {})
        .then((res) => {
          // console.log(data)
          console.log(res.data, "category data");
          setData(res.data);
        });
  
  
        } 
        catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [selectCat]);

    // useEffect(()=>{
    //   if(!blog_id){
    //     return;
    //   }
    //   const putData = async () => {
    //     try {
    //       console.log("blog id in useeffect"+blog_id);
    //     await axios.put("http://localhost:5000/api/blogs/"+blog_id+"/like", {userId})
    //     .then((res) => {
    //       // console.log(data)
    //       console.log(res.data);
    //     });
          
    //     }
    //      catch (error) {
    //       console.log(error);
    //     }
    //   };
    
    //   putData();
    // },[isLiked,blog_id]);

  
  return (
    <>
      <div className="blogheader-container">
      <div>
          <h1 style={{color: 'green'}}>Latest Posts from Authors</h1>
        </div>
        {/* <p> Users blogs are displayed here!</p> */}

      </div>
      <div className="blogmiddle-container">
        <Categories categories={categories} setSelectCat={setSelectCat}/>
        {/* <BlogList data={data}/> */}

        <div className="bloginner-container">
          {data.map((i) => {
            // return(
            //   <BlogItems title={i.title} imageUrl={i.image} description={i.description} author={i.author} blog_id={i._id} />

            // )
            
            return (
              <div key={i._id} id={i._id} className="each-blog" >
                  <img src={i.image} alt="Blog pic" className="imgClass" />
                <div className="blog-fields">
                  {/* <div id="author-style">
                    <h3>{i.author}</h3>
                  </div> */}
                  <div id="title-style" onClick={()=>{
                bloghandler(i._id);
              }}>
                    <h1>{i.title}</h1>
                  </div>
                  <div id="description-style">
                    <p>{i.description}</p>
                  </div>
                  {/* <ThumbUpOffAltIcon className="likeicon" onClick={()=>{
                    onClickhandler(i._id);
                    // setLikenumber(i.noOfLikes+1);
                    // console.log("smt"+i.noOfLikes+1);
                  }}/>
                  <span className="like-number">{i.noOfLikes}</span> */}
                </div>
              </div>
            );
          })
          }

        </div>
      </div>
    </>
  );
};

export default Blogs;
