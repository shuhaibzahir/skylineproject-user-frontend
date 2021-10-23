import React,{useState} from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import { decryptData,encryptData } from "../../Middleware/crypto";
import axios from "axios"
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {Link} from "react-router-dom"




const SingleUser = ({i,setFollowing}) => {
const [loading,setLoading] = useState(false)
let checkUserData = localStorage.getItem("userChecking");
let decryptedUserDetails = decryptData(checkUserData);

const unFollow =(userId)=>{
  setLoading(true)
  axios.put(`https://skyline.shuhaib.host/server/api/unfollow/user/${i._id}`,{},{
    headers:{
      'Authorization':`Bearer ${decryptedUserDetails.token}`
    
    }
  }).then((response)=>{
    setLoading(false)
    setFollowing((prev)=>{
      return prev.filter((user)=> user._id!==userId)
    })
   
  }).catch((err)=>{
    setLoading(false)
    
  })
}



  return (
    <div className="m-4">
      <div className="w-52  shadow  h-60 p-4 flex flex-col items-center justify-center rounded-3xl ">
      <Link to={`/user/profile/${i._id}`}> 
        <div className="flex items-center justify-center">
          <img
           onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://media.istockphoto.com/photos/colorful-gradient-pink-magenta-abstract-background-picture-id1059836414?k=20&m=1059836414&s=170667a&w=0&h=5WVpLbctBNZo406v7r8UmuuPbkyE-lwhDcJTfqgP_hE=";
          }}
            src={i.photo}
            alt=""
            className="h-24 w-24 rounded-full"
          />
        </div>
        </Link>
        <div className="text-center mt-3">
          <h1>{i.username}</h1>
          {loading?<CircularProgress/>:<IconButton>
            <DoneAllIcon onClick={()=>unFollow(i._id)} />
          </IconButton>}
         
        </div>
      </div>
    </div>
  );
};

export default SingleUser;