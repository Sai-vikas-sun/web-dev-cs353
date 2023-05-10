import React from "react";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import BlogItems from "./BlogItems";
//import BlogList from "./BlogList";
import "./Blogs.css";
import axios from "axios";
const Blogs = ({ categories }) => {
  const [data, setData] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id
  // console.log(userId)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs/timeline/"+userId, {})
      // .then((res) => {
      //   console.log(res);
      //   setData(data);
      //   return res.json()}

      // )
      .then((res) => {
        // console.log(data)
        console.log(res.data, "userdata");
        setData(res.data);
      });
  }, []);

  return (
    <>
      <div className="blogheader-container">
        <h1>Blogs page</h1>
      </div>
      <div className="blogmiddle-container">
        <Categories categories={categories} />
        {/* <BlogList data={data}/> */}

        <div className="bloginner-container">
          {data.map((i) => {
            // return(
            //   <BlogItems title={i.title} imageUrl={i.image} description={i.description} author={i.author} blog_id={i._id} />

            // )
            
            return (
              <div key={i._id} className="each-blog">
                  <img src={i.image} alt="Blog pic" className="imgClass" />
                <div className="blog-fields">
                  {/* <div id="author-style">
                    <h3>{i.author}</h3>
                  </div> */}
                  <div id="title-style">
                    <h1>{i.title}</h1>
                  </div>
                  <div id="description-style">
                    <p>{i.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blogs;
