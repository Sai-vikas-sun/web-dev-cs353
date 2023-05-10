import React from "react";

const BlogItems = ({ title, imageUrl, description, author, blog_id }) => {
  return (
    <div key={blog_id} className="each-blog">
      <img src={imageUrl} alt="Blog pic" className="imgClass" />
      <div className="blog-fields">
        {/* <div id="author-style">
          <h3>{author}</h3>
        </div> */}
        <div id="title-style">
          <h3>{title}</h3>
        </div>
        <div id="description-style">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogItems;
