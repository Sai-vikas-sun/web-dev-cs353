// import React from 'react'
// import Blogcategory from './Blogcategory'
// import Blogimage from './Blogimage'
// import "./CreateBlogmain.css"
// const CreateBlogmain = () => {
//   return (
//       <div className="createblog-container">
//         <form>
//             <div className='blog-items' id="title-container">
//                 <label>Title</label>
//                 <input type="text" name="title"
//                  placeholder="Enter title of post" className='titlefield' required/>
//             </div>
//             <Blogcategory/>
//             <div className='blog-items'>
//                 <label>Description</label>
//                 <textarea type="textarea" name="desc"
//                   placeholder="Enter the description" className='descfield' required/>
//             </div>
//             <Blogimage/>
//             <button type='submit' className='blog-items' id="create-post">Create</button>
//         </form>
//     </div>
//   )
// }

// export default CreateBlogmain

import React from 'react'
import Blogcategory from './Blogcategory'
//import Blogimage from './Blogimage'
import "./CreateBlogmain.css"
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"

const CreateBlogmain = ({categories}) => {
  const [file,setFile] = useState();
  const navigate = useNavigate();
  const [blogData,setBlogData] = useState({
    "title" : "",
    "description" : "",
    "category": "",
    "image" : ""
  })

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // const formdata = new FormData();
    const userId = JSON.parse(localStorage.getItem("user"))["_id"];
    console.log("In create blog handling",userId)
    // console.log(myData);
    // console.log(file);
    const base64 = file? await convertTOBase64(file) : "";
    const newData = {userId,...blogData,image: base64}
    console.log(newData)
    const res = await axios.post("http://localhost:5000/api/blogs/createblog",newData);
    console.log(res);
    console.log("response"+res.data);
    navigate("/");

  }

  const handleChange=(e)=>{
    setBlogData({...blogData,[e.target.name] : e.target.value})
    console.log(blogData);
  }
  const convertTOBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
      <div className="createblog-container">
        <form onSubmit={handleSubmit} > {/*encType="multipart/form-data">*/}
            <div className='blog-items' id="title-container">
                <label htmlFor='title'>Title</label>
                <input type="text" name="title" id='title' onChange={handleChange}
                 placeholder="Enter title of post" className='titlefield' required/>
            </div>
            <Blogcategory categories={categories} blogData={blogData} setBlogData={setBlogData}/>
            <div className='blog-items'>
                <label>Description</label>
                <textarea type="textarea" name="description" rows="2" cols="4" onChange={handleChange}
                  placeholder="Enter the description" className='descfield' required/>
            </div>
            <div>
            <label htmlFor='addimg'>
                Add Image
              </label>
              <input
        type="file"
        id="addimg"
       accept='image/*'
        onChange= {(e)=>setFile(e.target.files[0])}
      />

      <img src={file} alt="Blog pic" width={100} height={100} />

              {/* <input type="file" accept = "image/*" id='addimg' filename={file} onChange = {(e)=>{
                console.log(e.target.files[0]);
                setFile(e.target.files[0]);
                setBlogData({...blogData,'image':e.target.files[0]});
                }}/>
              <img src={file}/> */}
    </div>
            <button type='submit' className='blog-items' id="create-post">Create</button>
        </form>
    </div>
  )
}

export default CreateBlogmain
