import React,{useEffect,useState} from "react"
import { useHistory } from 'react-router-dom';
import AllFollowers from "../FollowersUser/AllFollowers"
import Left from "../left-side/Left"
import Right from "../right-side/Right"
import { decryptData } from "../../Middleware/crypto";
import axios from "axios"
const Followers = () => {
    let history = useHistory();
   
     const [userFollowing,setFollowing]=useState([]) 
      const [followers,setFollowers]= useState([])
 
 //  checking the user loged in  or not 
    let checkUserData = localStorage.getItem("userChecking")
    let decrypedUserDetails ;
    if(checkUserData) decrypedUserDetails = decryptData(checkUserData)
    useEffect(()=>{
        axios.get("/api/user/network/data",{
             headers:{
                  'Authorization':`Bearer ${decrypedUserDetails.token}`
          }
        }).then((response)=>{
            let followers =response.data.result[0]
            let following =response.data.result[0]
              followers=  followers? followers.followersData:[]
              following= following? following.FollowingUsersData:[]
            setFollowers(followers)
            setFollowing(following)
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
           <AllFollowers flex="flex-3" followers={followers}  following={userFollowing} setFollowing={setFollowing}/>
            <Right flex="flex-1" />
            </div>
        )
    
  
}

export default Followers
