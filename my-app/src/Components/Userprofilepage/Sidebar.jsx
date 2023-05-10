import React from 'react'
import "./Sidebar.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Sidebar = ({username}) => {

    const userD = JSON.parse(localStorage.getItem("user")!==null);
  const curUser = userD?JSON.parse(localStorage.getItem("user"))["username"] : "guest";
//   const curUserId = userD?JSON.parse(localStorage.getItem("user"))["_id"]: "guest";
    // const curUserId = JSON.parse(localStorage.getItem("user"))["_id"];
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = async(val) => {
        setOpen(false);
        try{
            const res=val?
            (
            await axios.delete(`http://localhost:5000/api/users/${username}`,{data:{
                curUser}}),
            await localStorage.removeItem("user")
            (alert("Deleted User!")(window.location.href="/"))
            ): ""
        }
        catch(err){
            console.log(err);
           // alert("Couldn't delete user!")
        }

    };

  return (
    <div className="sidebar">
        <div className="wrapper">
            <ul className="List">
                <li className="ListItem">
                    {/* material ui icon */}
                    <FavoriteIcon className='sidebarIcon'/>
                    <span><Link to = {`/userprofile/${username}/likedBlogs`} className='sidebarListItemText'>Liked Blogs</Link></span>
                </li>
                {username === curUser?
                    (
                        <>
                        <li className="ListItem">    
                            <BookmarkIcon className='sidebarIcon'/>
                            <span ><Link to = {`/userprofile/${username}/savedBlogs`} className='sidebarListItemText'>Saved Blogs</Link></span>
                        </li>
                        <li className="ListItem">    
                            <EditIcon className='sidebarIcon'/>
                            <span ><Link to = {`/userprofile/${username}/updateUserDetails`} className='sidebarListItemText'>Update Profile</Link></span>
                        </li>
                        <li className="ListItem">    
                            <DeleteIcon className='sidebarIcon'/>
                        <span className="iconFunction" onClick={handleClickOpen}>
                            Delete Account
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete Account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(false)}>No</Button>
          <Button onClick={()=>handleClose(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      </li>
                        </>
                    )
                    : console.log("u can't update details of other user")
                    // }
                    
                }
                <li className="ListItem">
                    <GroupIcon className='sidebarIcon'/>
                    <span>Followers</span>
                </li>
                <li className="ListItem">
                    <GroupsIcon className='sidebarIcon'/>
                    <span>Following</span>
                </li>
            </ul>
            <br/>
        </div>
    </div>
  )
}

export default Sidebar