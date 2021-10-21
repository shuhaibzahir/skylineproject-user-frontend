import React,{useState,useEffect} from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import { decryptData,encryptData } from "../../Middleware/crypto";
import axios from "axios"
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {Link} from "react-router-dom"

const SingleFollower = ({userData,Following}) => {
 
const [loading,setLoading] = useState(false)
let checkUserData = localStorage.getItem("userChecking");
let decryptedUserDetails = decryptData(checkUserData);

const [followed,setFollowed] = useState(null)


 useEffect(()=>{
  
    let userExisting = Following.some((test)=>test._id===userData._id)
    if(userExisting){
        setFollowed(true)
    }
 },[])

const followAuser = (userId)=>{
    setLoading(true)
    axios.put(`http://localhost:4040/api/follow/user/${userId}`,{},{
      headers:{
        'Authorization':`Bearer ${decryptedUserDetails.token}`
      
      }
    }).then((response)=>{
      setLoading(false)
      setFollowed(true)
     
    }).catch((err)=>{
      setLoading(false)
      console.log(err)
    })
  }


// unFollow 

const unFollow =(userId)=>{
  setLoading(true)
  axios.put(`http://localhost:4040/api/unfollow/user/${userId}`,{},{
    headers:{
      'Authorization':`Bearer ${decryptedUserDetails.token}`
    
    }
  }).then((response)=>{
    setLoading(false)
    setFollowed(false)
   
  }).catch((err)=>{
    setLoading(false)
    
  })
}


 



  return (
    <div className="m-4">
      <div className="w-52  shadow  h-60 p-4 flex flex-col items-center justify-center rounded-3xl ">
      <Link to={`/user/profile/${userData._id}`}> 
        <div className="flex items-center justify-center">
          <img
           onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://media.istockphoto.com/photos/colorful-gradient-pink-magenta-abstract-background-picture-id1059836414?k=20&m=1059836414&s=170667a&w=0&h=5WVpLbctBNZo406v7r8UmuuPbkyE-lwhDcJTfqgP_hE=";
          }}
            src={userData.photo}
            alt=""
            className="h-24 w-24 rounded-full"
          />
        </div>
        </Link>
        <div className="text-center mt-3">
          <h1>{userData.username}</h1>
          {loading?<CircularProgress color="success"/>:<IconButton >
           {followed?<DoneAllIcon color="error" onClick={()=>unFollow(userData._id)}/>: <PersonAddIcon onClick={()=>followAuser(userData._id)} className/>} 
          </IconButton>}
         
        </div>
      </div>
    </div>
  );
};

export default SingleFollower;
