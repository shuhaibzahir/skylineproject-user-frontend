import React,{useRef ,useContext,useState,useEffect} from 'react'
import {RiRadioButtonLine} from "react-icons/ri"
import ChatDetails from '../../Contexts/ChatDetails'
import axios from "axios"
import {decryptData} from "../../Middleware/crypto.js"
const People = ({currentUser,conv,getMessage}) => {

    // user encrypted data
 
    let checkUserData = localStorage.getItem("userChecking");
    let decryptedUserDetails = decryptData(checkUserData);
 
    const {changeChattingDetails}= useContext(ChatDetails)

    const [user,setUser] = useState(null)
    
 

    // taking the message

 
 
    useEffect(()=>{
        const friendId = conv.members.find(m=>m!==decryptedUserDetails.user._id)
     
        const getUser = async ()=>{
            const res = await axios.get(`https://skyline.shuhaib.host/server/api/get/user/details/${friendId}`,{
                headers:{
                    'Authorization':`Bearer ${decryptedUserDetails.token}`
               }
            })
            setUser(res.data.user)
          
        }
        getUser()
    },[])



    // take the message from database
    const getAllMessages =async(conv)=>{
    
       await axios.get(`https://skyline.shuhaib.host/server/api/get/meesages/${conv._id}`,{
            headers:{
                'Authorization':`Bearer ${decryptedUserDetails.token}`
              
         }
        }).then((res)=>{    
             const chattingData={
                conversation:conv,
                user:user,
                message: res.data.result
            }
            changeChattingDetails(chattingData)
           
        }).catch((err)=>{
            console.log(err)
        })
    }

 

    
    return ( 
          <div className="flex justify-between items-center cursor-pointer" onClick={()=>getAllMessages(conv)}>
                   <div className="flex space-x-4 items-center">
                   {user&&<img   src={user.photo||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijG7DrhwuN3-8ccFfUJVOeHA3NojRTA9rECPbCX7wg-NY4KgnDbK_9vZO2c0ARCN3k8Q&usqp=CAU"} className="h-8 w-8 rounded-full" alt="" />}
                   {user&&  <h1  >{user.username}</h1>}
                   </div>
                   {user&&  <RiRadioButtonLine color="green" />}
                   
                </div>
    )
}

export default People
