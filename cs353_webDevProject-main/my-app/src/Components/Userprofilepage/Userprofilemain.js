import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../Navcomponents/Login';
import Signup from '../Navcomponents/Signup';

const Userprofilemain = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const handleRedirect = () => {
    navigate("/login")
  }
  
  return (

    <div>
      {
        user==null?<p onClick={handleRedirect}>Please login to continue</p>:""
      }
    </div>
  )
}

export default Userprofilemain