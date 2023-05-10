import React from 'react'
import idcard from "../Images/id-card.png";
import padlock from "../Images/padlock.png";
import "./signup.css";
import {useNavigate} from "react-router-dom";

const Login = ({onChangeLogin,handleLogin}) => {
    // const navigate= useNavigate();
    // if(isLogin){
    //     navigate("/userprofile")
    // }
  return (
    <div className="s-content">
        <div className="title"><strong>Login</strong></div>
        <form action="/login" method="post" onSubmit={handleLogin}>
        <div className="outer">
            <div className="user-details">
                <div className="input-box">
                    <img src={idcard} alt="uname" style={{height:"30px", width:"30px"}}/>
                    <input type="text"  name="username" placeholder="Enter username" onChange={onChangeLogin} required/>
                </div>
                <div className="input-box">
                    
                    <img src={padlock} alt="password" style={{height:"30px", width:"30px"}}/>
                    <input type="password" name="password" placeholder="Enter password" onChange={onChangeLogin} required/>
                </div>
                 {/* <div class="capt">
                    <span class="captchaa">CAPTCHA will be shown here : ...</span><br>
                    <span class="details">Enter Captcha shown:</span>
                    <input type="text" placeholder="">
                </div>  */}
                {/* <!-- <div class="butn"> --> */}
                    <button type ="submit" >Login</button>
                {/* <!-- </div> --> */}
            </div>
        </div>
        </form>
    </div>
  );
}

export default Login