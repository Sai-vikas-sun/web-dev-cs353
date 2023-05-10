import React from 'react'
import { Link } from 'react-router-dom'
const Extra = () => {
    const myStyle = {
        color: "red",
        fontSize: "40px"
    }
  return (
    <>
        <div style={myStyle}>Please Login to access!</div>
        <div style={myStyle}>Click button to navigate to Login Page</div>
        <button style={{height:"50px",width: "100px",fontSize: "30px"}}><Link to="/login">Login</Link></button>
    </>
  )
}

export default Extra