//import React from 'react'
import { useState } from "react";
// import FontAwesomeIcon from
const Blogimage = ({ blogData, setBlogData, handleChange }) => {
  const [file, setFile] = useState();
  function convertTOBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setFile(reader.result);
      setBlogData({ ...blogData, image: file });
      console.log(blogData);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  }
  return (
    <div className="blog-items">
      <label htmlFor="addimg">
        Add Image
        {/* <FontAwesomeIcon icon="fa-solid fa-plus" /> */}
      </label>
      {/* <input
        type="file"
        id="addimg"
        onChange={(e) => {
          // console.log(e.target.files[0]);
          setFile(URL.createObjectURL(e.target.files[0]));
          //setFile(e.target.files[0]);
          setBlogData({ ...blogData, image: file });
          console.log(blogData);
        }}
      /> */}

      <input
        type="file"
        id="addimg"
        onChange={convertTOBase64}
      />

      <img src={file} alt="Blog pic" width={100} height={100} />
      {/* <button type='button' onClick={()=>{console.log("clicked");setFile(null)}}>Remove </button> */}
    </div>
  );
};
export default Blogimage;
