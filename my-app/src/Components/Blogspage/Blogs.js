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
  const [len,setLen] = useState(10);
  const [seeAll,setSeeAll] = useState(false);
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
  
  
    // <>
    //   <div className="blogheader-container">
    //   <div>
    //       <h1 style={{color: 'green'}}>Latest Posts from Authors</h1>
    //     </div>
    //     {/* <p> Users blogs are displayed here!</p> */}

      // </div>
      // <div className="blogmiddle-container">
      //   <Categories categories={categories} setSelectCat={setSelectCat}/>
      //   {/* <BlogList data={data}/> */}

    //     <div className="bloginner-container">
    //       {data.map((i) => {
    //         // return(
    //         //   <BlogItems title={i.title} imageUrl={i.image} description={i.description} author={i.author} blog_id={i._id} />

    //         // )
            
    //         return (
    //           <div key={i._id} id={i._id} className="each-blog" >
    //               <img src={i.image} alt="Blog pic" className="imgClass" />
    //             <div className="blog-fields">
    //               {/* <div id="author-style">
    //                 <h3>{i.author}</h3>
    //               </div> */}
    //               <div id="title-style" onClick={()=>{
    //             bloghandler(i._id);
    //           }}>
    //                 <h1>{i.title}</h1>
    //               </div>
    //               <div id="description-style">
    //                 <p>{i.description}</p>
    //               </div>
    //               {/* <ThumbUpOffAltIcon className="likeicon" onClick={()=>{
    //                 onClickhandler(i._id);
    //                 // setLikenumber(i.noOfLikes+1);
    //                 // console.log("smt"+i.noOfLikes+1);
    //               }}/>
    //               <span className="like-number">{i.noOfLikes}</span> */}
    //             </div>
    //           </div>
    //         );
    //       })
    //       }

    //     </div>
    //   </div>
    // </>


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
    {data.length>0?data.slice(0,len).map((i) => {
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
  :<p style={{color:"red",fontSize: "30px"}}>User don't have any blogs</p>
  }
  {!seeAll?
  <button onClick={()=>(setLen(data.length),setSeeAll(true))}>See All Posts</button>
    : <button onClick={()=>(setLen(10),setSeeAll(false))}>See Few Posts</button> 
    }
  </div>
  </div>
</>
  );
}

export default Blogs;