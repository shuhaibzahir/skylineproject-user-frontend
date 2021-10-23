import React,{useEffect,useState} from "react"
import { useHistory } from 'react-router-dom';
import AllUsers from "../FollowingUsers/AllUsers"
import Left from "../left-side/Left"
import Right from "../right-side/Right"
import { decryptData } from "../../Middleware/crypto";
import axios from "axios"
const Following = () => {
    let history = useHistory();
   
     const [userFollowing,setFollowing]=useState([]) 
      
 
 //  checking the user loged in  or not 
    let checkUserData = localStorage.getItem("userChecking")
    let decrypedUserDetails ;
    if(checkUserData) decrypedUserDetails = decryptData(checkUserData)
    useEffect(()=>{
        axios.get("https://skyline.shuhaib.host/server/api/user/network/data",{
             headers:{
                  'Authorization':`Bearer ${decrypedUserDetails.token}`
          }
        }).then((response)=>{
           let followign =response.data.result[0]?response.data.result[0].FollowingUsersData:[]
            setFollowing(followign)
        })
    },[])
  
    if(!decrypedUserDetails){
        history.push("/signin")
        return true
    } 
    
 
// following  page ........
        return (
            <div  className="space-x-6 flex min-w-full   min-h-withoutHeader  mt-24   justify-between ">
            <Left flex="flex-1" />
           <AllUsers flex="flex-3"  following={userFollowing} setFollowing={setFollowing}/>
            <Right flex="flex-1" />
            </div>
        )
    
  
}

export default Following
