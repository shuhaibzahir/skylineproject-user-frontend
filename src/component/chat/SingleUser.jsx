import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {RiRadioButtonLine} from "react-icons/ri"

const SingleUser = ({ currentUser,conversation,getMessage}) => {
    const [user,setUser] = useState(null)
    
    const currentUserId = currentUser.user._id
 
    useEffect(()=>{
        const friendId = conversation.members.find(m=>m!==currentUserId)
     
        const getUser = async ()=>{
            const res = await axios.get(`/api/get/user/details/${friendId}`,{
                headers:{
                    'Authorization':`Bearer ${currentUser.token}`
                  
             }
            })
            setUser(res.data.user)
          
        }
        getUser()
    },[])


    return (
        
        <div className="flex justify-between items-center cursor-pointer">
        <div className="flex space-x-4 items-center" onClick={()=>getMessage(conversation._id,user)}>
        {user&&<img src={user.photo||"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"}   className="h-8 w-8 rounded-full" alt="" />}
         {user&&<h1>{user.username}</h1>}
        </div>
        {user&& <RiRadioButtonLine color="green" />}
       </div>
         
    )
}

export default SingleUser
