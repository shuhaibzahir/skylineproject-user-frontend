import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersProfile from "./UsersProfile"
import axios from "axios";
import UserPosts from "./UsersPost"
import { decryptData, encryptData } from "../../Middleware/crypto";
 
const CenterPart = ({ flex }) => {
    let {userId } = useParams()
  let checkUserData = localStorage.getItem("userChecking");
  let decryptedUserDetails = decryptData(checkUserData);
  
  const [posts,setPosts] = useState([])
  const [userData, setUserData] = useState('')
 
  useEffect(()=>{
     axios.get(`/api/user/profile/${userId}`,{
        headers:{
            'Authorization':`Bearer ${decryptedUserDetails.token}`
          
     }
    }).then((response)=>{
         let posts = response.data.result.posts
         let userDetails = response.data.result.user
         setPosts(posts)
         setUserData(userDetails)
    }).catch((err)=>{
        console.log(err)
    })
  },[])

  return (
    <div className={`${flex} min-h-withoutHeader w-full`}>
    
      <div className="p-6 ml-6 w-full ">
        <div className="bg-re-400">
           <UsersProfile data={userData} usersId={userId} postData={posts}/>
        </div>
      {posts.map((i)=><UserPosts postData={i}/>)}
      </div>
     </div>
  );
};

export default CenterPart;
