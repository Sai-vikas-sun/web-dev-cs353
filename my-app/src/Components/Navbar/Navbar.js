import React from "react";
import logo from "../Images/blogger.png";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Extra from "../Navcomponents/Extra";

const Navbar = () => {
  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/login");
  };
  const gotoCreateBlog = () => {
    if(user){
      navigate("/createblog");
    }
    else{
        window.location.href = "/user-not-loggedin";
    }

    
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="nav-container">
      <ul>
        <li>
          <img src={logo} height="30px" width="30px" alt="logo" />
        </li>
        <li className="nav-links">
          {/* <a href='/'>Home</a>*/}
          <Link to="/">Home</Link>
        </li>
        <li className="nav-links">
          {/* <a href='/Blogs'>Blogs</a> */}
          <Link to="/Blogs">Blogs</Link>
        </li>
        <li className="nav-links">
          {/* <Link to="/userprofile">Profile</Link> */}
          {
          user? 
          (
            // console.log(user),
            // console.log(typeof(user)),
            <Link to = {`/userprofile/${user.username}`}>UProfile</Link>
          )
          :(<Link to="/userprofile">Profile</Link>)
          }

        </li>
        <li className="nav-links">
          {/* <a href='/signup'>signup</a> */}
          <Link to="/signup">Signup</Link>
        </li>



        <li className="nav-links">
          <button className="cpost" onClick={gotoCreateBlog}>
            New Post
          </button>
        </li>



        {/* {user == null ? (
          <li className="nav-links">
            <button className="cpost">
            New Post
          </button>
          </li>
        ) : (
            <li className="nav-links">
            <button className="login" onClick={handleLogout}>
              logout
            </button>
          </li>
        )} */}

        {user == null ? (
          <li className="nav-links">
            <button className="login" onClick={gotoLogin}>
              login
            </button>
          </li>
        ) : (
            <li className="nav-links">
            <button className="login" onClick={handleLogout}>
              logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
