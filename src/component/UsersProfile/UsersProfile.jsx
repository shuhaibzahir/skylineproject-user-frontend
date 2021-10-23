import React, { useState, useEffect } from "react";
import axios from "axios"
import { decryptData } from "../../Middleware/crypto"; 

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import DoneAllIcon from '@mui/icons-material/DoneAll';



const ProfileDiv =  ({data,postData,usersId}) => {

  let checkUserData = localStorage.getItem("userChecking")
   let decryptedUserDetails = decryptData(checkUserData)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [loading,setLoading] = useState(false)
 
 
    useEffect( ()=>{
     axios.get(`https://skyline.shuhaib.host/server/api/user/network/data/${usersId}`,{
      headers:{
        'Authorization':`Bearer ${decryptedUserDetails.token}`
       }
    }).then((response)=>{
    
     setFollowers(response.data.result.followers)
     setFollowing(response.data.result.following)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
 
 
      
  const followAuser = (userId)=>{
    setLoading(true)
    axios.put(`https://skyline.shuhaib.host/server/api/follow/user/${userId}`,{},{
      headers:{
        'Authorization':`Bearer ${decryptedUserDetails.token}`
      
      }
    }).then((response)=>{
      setLoading(false)
      setFollowers(prev=>[...prev,decryptedUserDetails.user._id])
      
      
    }).catch((err)=>{
      setLoading(false)
      console.log(err)
    })
  }

  
 
  const unFollow =(userId)=>{
    setLoading(true)
    axios.put(`https://skyline.shuhaib.host/server/api/unfollow/user/${userId}`,{},{
      headers:{
        'Authorization':`Bearer ${decryptedUserDetails.token}`
      
      }
    }).then((response)=>{
      setLoading(false)
  
      setFollowers(prev=>{
    
        let result = prev.filter((i)=>i!==decryptedUserDetails.user._id)
       
        return result
      })
     
    }).catch((err)=>{
      
      
    })
  }
  
 
  const useExistOrNot =()=>{
    if(data._id=== decryptedUserDetails.user._id){
      return
    }
    if(loading){
      return <CircularProgress color="success"/>
    }
    
    let checkExist = followers.some((i)=>i ==decryptedUserDetails.user._id)
 
     if( checkExist){
      return <DoneAllIcon color="error" onClick={()=>unFollow(data._id)}/>
     }else{
    
      return  <IconButton > <PersonAddIcon onClick={()=>followAuser(data._id)} className/>
      </IconButton>
     }
  }

  return (
    <div className="shadow p-4 rounded-2xl relative ">
 
      <div className="h-48 overflow-hidden flex items-center rounded-2xl">
        {/* cover photo */}
        <img
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://media.istockphoto.com/photos/colorful-gradient-pink-magenta-abstract-background-picture-id1059836414?k=20&m=1059836414&s=170667a&w=0&h=5WVpLbctBNZo406v7r8UmuuPbkyE-lwhDcJTfqgP_hE=";
          }}
          src=''
          className="w-full  "
          alt=""
        />
      </div>
      <div className="rounded-2xl flex items-center  ">
        {/* profile photo */}
        <img
          onError={(e) => {
            e.target.onerror = null;
            e.target.src ="https://global-uploads.webflow.com/5e4627609401e01182af1cce/5eb13bfdb4659efea4f8dace_profile-dummy.png";
          }}
          src={data.photo}
          className="w-36 h-36 rounded-full  -mt-20 ml-5"
          alt=""
        />

        <div className="p-3 flex justify-between w-full items-center ">
          <div>
            <h1 className="text-xl text-pink font-bold">
              {data.username}
            </h1>
            <p className="w-26">{data.services}</p>
          </div>
          <div>
         
         {useExistOrNot()}
          </div>
         </div>
         
      </div>
      {/* follow */}
      <div className="shadow bg-pink text-white flex text-center p-3 rounded-3xl mt-3 items-center justify-around">
         <div>
            <p>Followers</p>
            <p>{followers.length}</p>
         </div>
         <div>
            <p>Following</p>
            <p>{following.length}</p>
         </div>
         <div>
            <p>Posts</p>
            <p>{postData.length}</p>
         </div>
      </div>
      </div>
  );
};

export default ProfileDiv;
