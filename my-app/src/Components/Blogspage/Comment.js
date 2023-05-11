import React, { useState } from 'react'
import axios from "axios";
const Comment = ({blogId,setAddcomment}) => {
    //const[description,setDescription] = useState();
    const[formData,setFormData] = useState();

 const handleSubmit=async(e)=>{
    e.preventDefault();
    setAddcomment(false);
    const userId = JSON.parse(localStorage.getItem("user"))["_id"];
    const username = JSON.parse(localStorage.getItem("user")).username;
    console.log(userId);
    const newdata = {
        userId,username,...formData
    }

    try{
        const res = await axios.post(`http://localhost:5000/api/blogs/${blogId}/comments`,newdata);
       console.log("response"+res.data);
    }
    catch(err){
        console.log(err);
    }

    
 }

 const handleChange=(e)=>{
    setFormData({...formData,[e.target.name] : e.target.value})

 }
  return (
    <div className="commentFinalhandler">
        <form action="/" method="post" onSubmit={handleSubmit}>
        <div className='commenthandler3'>

        <label>Description</label>
        <input type="textarea" name="description"  onChange={handleChange}
                  placeholder="Enter the description" required/>
        <button type="submit">submit</button>
        </div>

        </form>
    </div>
  )
}

export default Comment