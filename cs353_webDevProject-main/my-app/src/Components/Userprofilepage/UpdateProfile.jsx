import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UpdateProfile.css";
import axios from "axios";
const UpdateProfile = () => {
  const username = useParams().username;
  const [userDetails, setUserDetails] = useState({});
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const userD = JSON.parse(localStorage.getItem("user") !== null);
  const curUser = userD
    ? JSON.parse(localStorage.getItem("user"))["username"]
    : "guest";
  const curUserId = userD
    ? JSON.parse(localStorage.getItem("user"))["_id"]
    : "guest";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/?username=${username}`
        );
        setUserDetails(res.data);

        console.log("data" + res.data);
      } catch (err) {
        alert("User not found!");
        window.location.href = "/";
      }
    };
    fetchUser();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myData = {
      curUserId: curUserId
    }
    if(name){
        myData["name"] = name
    }
    if(email){
        myData["email"] =email
    }
    if(password){
        myData["password"] = password
    }
    // console.log(myData.name + " "+myData.email+" "+myData.password);
    if (validate(myData)) {
      try {
        const imageBase64 = file ? await convertTOBase64(file) : "";
        const coverBase64 = cover ? await convertTOBase64(cover) : "";
        const newData = {
          ...myData,
          profilePicture: imageBase64,
          coverPicture: coverBase64,
        };
        console.log(newData);
        const res = await axios.put(`http://localhost:5000/api/users/${userDetails._id}`,newData)
        console.log("response" + res.data);
        localStorage.removeItem("user");
        localStorage.setItem("user",JSON.stringify(res.data));
        window.location.href=`/userprofile/${username}`
      } catch (err) {
        console.log(err);
        alert("Error in updating details");
      }
    } else {
      console.log("validation error");
    }
  };

  const validate = (myData) => {
    const pswdmatch = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // console.log("val : "+myData.name+" "+myData.email+" "+myData.password)
    if (myData.name && myData.name.length < 4) {
      alert("Name length is less than 4");
      return false;
    }

    if (myData.email && !myData.email.match(emailRegex)) {
      alert("Not a valid email");
      return false;
    }

    if (myData.password && !myData.password.match(pswdmatch)) {
      alert("Ïnvalid password");
      return false;
    }
    return true;
  };

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
    <>
      {username === curUser ? (
        <div className="settings">
          <div className="settingsWrapper">
            <div className="settingsTitle">
              <span className="settingsUpdateTitle">Update Your Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
              <label>Cover Picture</label>
              <div className="settingsCP">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : userDetails.coverPicture
                  }
                  alt=""
                />
                <label htmlFor="coverInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>
                </label>
                <input
                  type="file"
                  id="coverInput"
                  style={{ display: "none" }}
                  onChange={(e) => setCover(e.target.files[0])}
                />
              </div>

              <label>Profile Picture</label>
              <div className="settingsPP">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : userDetails.profilePicture
                  }
                  alt=""
                />
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <label>Name</label>
              <input
                type="text"
                placeholder={userDetails.name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder={userDetails.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="settingsSubmit" type="submit">
                Update
              </button>
              {success && (
                <span
                  style={{
                    color: "green",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  Profile has been updated...
                </span>
              )}
            </form>
          </div>
        </div>
      ) : (
        <p>You cannot update Other user's profile!</p>
      )}
    </>
  );
};

export default UpdateProfile;
