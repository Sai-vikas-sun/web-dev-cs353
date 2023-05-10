import "./App.css";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Navcomponents/Home";
import Blogs from "./Components/Blogspage/Blogs";
import Signup from "./Components/Navcomponents/Signup";
import { useState, useEffect} from "react";
import BlogItems from "./Components/Blogspage/BlogItems";
import axios from "axios";
import Login from "./Components/Navcomponents/Login";
import Userprofilemain from "./Components/Userprofilepage/Userprofilemain";
import CreateBlogmain from "./Components/CreateBlogpage/CreateBlogmain";
//import { useNavigate } from "react-router-dom";
import Profile from "./Components/Userprofilepage/Profile";
import Extra from "./Components/Navcomponents/Extra";


import UpdateProfile from "./Components/Userprofilepage/UpdateProfile";
import UserBlogs from "./Components/Userprofilepage/UserBlogs";

function App() {
  
  const [isLogin,setIsLogin]=useState(false)

  const [data, setData] = useState([]); //for blogs page
  // useEffect(() => {
  //   fetch("http://localhost:5000/Blogs", {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       return res.json()}
  //     )
  //     .then((data) => {
  //       console.log(data, "userdata");
  //       setData(data);
  //     });
  // }, []);

  const [categories, setCategories] = useState([
    {id:1,value:"Web Dev",label: "WEB"},
    {id:2,value:"Machine Learning",label: "ML"},
    {id:3,value:"Computer Networks",label: "CN"},
    {id:4,value:"NLP",label:"NLP"},
    {id:5,value:"Cloud",label:"Cloud"}
  ]);
  const defaultData = {
    name: "",
    uname: "",
    pswd: "",
    cpswd: "",
    phonenumber: "",
    email: "",
  }
  const [formdata, setFormdata] = useState(defaultData);

  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false); //flag for signup 
  //const latestformvalues = useRef(formdata);
 
  const onChangeHandeler = (e) => {
    //e.preventDefault();

    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
    // console.log(formdata);
  };
  

  const onSubmitHandler =async (e) => {
    e.preventDefault();
    const errors =validate(formdata)
    setFormErrors(errors || {});
    console.log("No.of formerrors"+Object.keys(errors).length);
    console.log(formdata);
    
    if(Object.keys(errors).length===0){
      setIsSubmit(true);
      try{
        const res = await axios.post("http://localhost:5000/api/auth/signup", formdata);
        if (res.data.includes("ok")) {
          alert("SIgn up successful")
          window.location.href="/"
        } else {
          alert(res.data)
        }
      }
      catch(err){
        console.log(err)
      }
      
    // console.log(res.data);
  }
    };
  

  useEffect(()=>{
    console.log(formErrors);
    if(formErrors && Object.keys(formErrors).length===0 && isSubmit){
      //latestformvalues.current= formdata;
      console.log(formdata);
    }
  },[formErrors,isSubmit,formdata]); //when any change in formErrors

  const validate = (values)=>{
    const errors = {}
    const pswdmatch = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!values.name){
      errors.name = "Name is required!"
    }
    if(values.name.length<4){
      errors.name = "Name length is leses than 4"
    }
    /*if(values.pswd.length<6){
      errors.pswd = "Password less"
    }*/
    if(values.uname.length<4){
      errors.uname="User Name is less than 4 characters"
    }
    if(!values.email.match(emailRegex)){
      errors.email = "Not a valid email"
    }
    if(!values.pswd.match(pswdmatch)){
      errors.pswd = "Ïnvalid password"
    }
    console.log("confirm password is"+values.cpswd);
    if(values.pswd !== values.cpswd){
      errors.cpswd = "Confirm and Password are not same"
    }
    return errors;
  }

  //login form Handling
  const [loginData,setLoginData] = useState({
    username:"",
    password:"",
  });
  const onChangeLogin= (e) =>{
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
  })
  }
  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
    const res = await axios.post("http://localhost:5000/api/auth/login", loginData);
    // const data = await res.json();
    console.log(typeof(res.data));
    console.log("check")
    console.log(res.data.user);
    if(res.data.user){
      localStorage.setItem("user", JSON.stringify(res.data.user))
      alert("login successful");
      // window.location.href="/userprofile"
      window.location.href="/"
    }
    else{
      alert("Invalid username or password");
    }
    // .then()
    console.log(res);
   // const isLogin = res.data.status;

   //With frontend navigation
    // if(res.data.status==="ok"){
    //   alert("successfuly logged in");
    //   setIsLogin("true");
    // }
    // else{
    //   alert(res.data.error);
    // }
  }
    catch(err){
      console.log(err);
    }
    
    }
    //console.log(loginData);
    

    
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Blogs" >
            <Route index element = {<Blogs categories={categories} setCategories={setCategories} />} />
            <Route path=":blogId" element = {<BlogItems/>} />
          </Route>
          <Route path="/userprofile" element={<Userprofilemain isLogin={isLogin}/>} />
          <Route path="/userprofile" >
            <Route index element = {<Extra/>}/>
            <Route path=":username" element={<Profile/>}/> {/* display specific user with id. */}
            <Route path=":username/:blogsType" element={<UserBlogs/>}/>
            <Route path=":username/updateUserDetails" element={<UpdateProfile/>}/>
            {/* <Route path=":username/:savedBlogs" element={<UserBlogs/>}/> */}
          </Route>
          <Route
            path="/signup"
            element={
              <Signup
                formdata={formdata}
                formErrors={formErrors}
                setFormdata={setFormdata}
                onChangeHandeler={onChangeHandeler}
                onSubmitHandler={onSubmitHandler}
              />
            }
          />
          <Route 
          path="/login"
          element={
            <Login 
            handleLogin={handleLogin}
            onChangeLogin={onChangeLogin}
             />
          }/>
          <Route
          path="/createblog"
          element = {
            <CreateBlogmain categories={categories}/>
          }/>
             

          {/*404*/}
          <Route
            path="*"
            element={
              <h2 style={{ "text-align": "center" }}>Error 404 not found.</h2>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
