import React,{useState,useEffect} from 'react'
import SingleUser from "./SingleUser"
import axios from "axios"
import { decryptData, encryptData } from "../../Middleware/crypto";
const RightSide = ({flex,getMessage,conversation,setConversations}) => {




      let checkUserData = localStorage.getItem("userChecking");
      let decryptedUserDetails = decryptData(checkUserData);
 

      useEffect(()=>{
        let getConversation = async()=>{
           try{
            let res = await axios.get("/api/get/conversation",{
                headers:{
                    'Authorization':`Bearer ${decryptedUserDetails.token}`
                  
             }
            }) 
         
            setConversations(res.data.result)

           }catch(err){
            console.log(err)
           }
        }
        getConversation()
      },[])








    return (
        <div className={`${flex} `}>
            <div className={`min-h-withoutHeader bg-white-100   p-6 max-h-48 w-1/4 fixed overflow-auto `}>
             <div className=" h-96 p-4 space-y-5">
              {conversation.map((c,index)=> < SingleUser key={index} getMessage={getMessage} conversation={c}  currentUser={decryptedUserDetails} />)}
               </div>
        </div>
        </div>
    )
}

export default RightSide
