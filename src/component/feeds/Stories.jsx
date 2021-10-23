import React,{useState,useEffect} from 'react'
import UserStory from './UserStory'
 import axios from "axios"
 import CircularProgress from '@mui/material/CircularProgress';
 import { decryptData, encryptData } from "../../Middleware/crypto";
 import OtherUsersStory  from './OtherUsersStory';
const Stories = () => {
    let checkUserData = localStorage.getItem("userChecking");
    let decryptedUserDetails = decryptData(checkUserData);
    const [userStory,setUserStory]=useState(null)
    const [followingStory,setFollowingStory] = useState([])
    const [ loading,setLoading] = useState(true)
    
    useEffect(()=>{
        axios.get("https://skyline.shuhaib.host/server/api/user/get/all/stories",{
            headers:{
                Authorization: `Bearer ${decryptedUserDetails.token}`,
            }
        }).then(response=>{ 
             
            let userstory = response.data.userStory
            let userFollowingStory = response.data.userFollowingStory
            setUserStory(userstory)
            setFollowingStory(userFollowingStory)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[])




    const [mouseover, setScroll ]= useState(false)
    return (
        <div className={`flex relative duration-400 ${mouseover?"overflow-x-auto":"overflow-x-hidden"} scroll-touch flex-row items-center justify-start space-x-4 cursor-pointer`} onMouseEnter={()=>{setScroll(!mouseover)}} onMouseLeave={()=>{setScroll(!mouseover)}} >
       <div className="w-20 p-5">
       <div className="flex space-x-3   w-max ">
           {loading?<CircularProgress />: <> <UserStory existStory={userStory}  setUserStory={setUserStory}/> {followingStory?.map(data=><OtherUsersStory data={data} key={data._id} />)}</>}
            </div>
       </div>
 

   </div>
    )
}

export default Stories
