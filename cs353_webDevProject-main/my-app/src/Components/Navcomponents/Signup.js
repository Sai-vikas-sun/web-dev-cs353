import React, { useState } from "react";
import user from "../Images/user.png";
import idcard from "../Images/id-card.png";
import padlock from "../Images/padlock.png";
import key from "../Images/key.png";
import email from "../Images/email.png";
import call from "../Images/call.png";
import bgsignup from "../Images/bg-signup.jpeg";
import "./signup.css";

const Signup = ({ formErrors,formdata,onChangeHandeler, onSubmitHandler }) => {
  /*const[uname,setUname] = useState("");
 const[]*/
 

  return (
    <div className="s-content">
      <div className="title">
        <strong>Create Account</strong>
      </div>
      <form action="/signup" name="mf" method="post" onSubmit={onSubmitHandler} >
        <div className="outer">
          <div className="user-details">
            <div className="input-box">
              {/* <!-- <span class="details">First Name</span> --> */}
              <img
                src={user}
                alt="name"
                style={{ height: "25px", width: "25px" }}
              />
              {/* <!-- <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a> --> */}
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formdata.name}
                onChange={onChangeHandeler}
                required
              />
              <p className="validationErr">{formErrors.name}</p>
            </div>

            {/* <!-- <div class="input-box"> -->
                    <!-- <span class="details">Last Name</span> -->
                    <!-- <input type="text" placeholder="Enter last name">
                </div> --> */}
            <div className="input-box">
              {/* <!-- <span class="details">Username</span> --> */}
              <img
                src={idcard}
                alt="username"
                style={{ height: "30px", width: "30px" }}
              />
              <input
                type="text"
                id="usr"
                name="uname"
                placeholder="Enter username"
                value={formdata.uname}
                onChange={onChangeHandeler}
                required
              />
              <p className="validationErr">{formErrors.uname}</p>
            </div>
            <div className="input-box">
              {/* <!-- <span class="details">Password</span> --> */}
              <img
                src={padlock}
                alt="password"
                style={{ height: "30px", width: "30px" }}
              />
              <input
                type="password"
                name="pswd"
                id="pswdfield"
                placeholder="Enter password"
                value={formdata.pswd}
                onChange={onChangeHandeler}
                required
              />
              <p className="validationErr">{formErrors.pswd}</p>
            </div>
            <div className="input-box">
              {/* <!-- <span class="details">Confirm Password</span> --> */}
              <img
                src={key}
                alt="cpassword"
                style={{ height: "30px", width: "30px" }}
              />
              <input
                type="password"
                name="cpswd"
                id="cpswdfield"
                placeholder="Re-enter password"
                value={formdata.cpswd}
                onChange={onChangeHandeler}
                required
              />
              <p className="validationErr">{formErrors.cpswd}</p>
            </div>

            {/* <!-- <div class="gender-details"> 
                    <span class="details">Gender</span>
                    <input type="radio" id="male" name="gen">
                    <label for="male">Male</label>
                    <input type="radio" id="female" name="gen">
                    <label for="female">Female</label>
                </div> --> */}
            <div className="input-box">
              {/* <!-- <span class="details">Password</span> --> */}
              <img
                src={email}
                alt="email"
                style={{ height: "30px", width: "30px" }}
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email"
                value={formdata.email}
                onChange={onChangeHandeler}
              />
              <p className="validationErr">{formErrors.email}</p>
            </div>
            <div className="input-box">
              {/* <!-- <span class="details">Password</span> --> */}
              <img
                src={call}
                alt="phoneno"
                style={{ height: "30px", width: "30px" }}
              />
              <input
                type="text"
                name="phonenumber"
                placeholder="Enter your phonenumber"
                value={formdata.phonenumber}
                onChange={onChangeHandeler}
                
              />
            </div>
            {/* <div class="capt">
                    <span class="captchaa">CAPTCHA will be shown here : ...</span><br>
                    <span class="details">Enter Captcha shown:</span>
                    <input type="text" placeholder="">
                </div>  */}
            {/* <!-- <div class="butn"> --> */}
            <button 
                className="signup" 
                type="submit" 
                id="btn1"
                   
            >
              Register
            </button>
            {/* <!-- </div> --> */}
          </div>
          <div className="imgclass">
            <img src={bgsignup} alt="backimage" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
