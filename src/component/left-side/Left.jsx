import React,{useState,useEffect} from 'react'
import Profile  from './Profile'
import OnlinePoeple from './onlinePoeple'
import axios from "axios"
import { decryptData } from '../../Middleware/crypto.js'
const Left = ({flex}) => {

 
    const [conversation,setConversation] =useState([])

   
    let checkUserData = localStorage.getItem("userChecking");
    let decryptedUserDetails = decryptData(checkUserData);


    useEffect(()=>{
      let getConversation = async()=>{
         try{
          let res = await axios.get("https://skyline.shuhaib.host/server/api/get/conversation",{
              headers:{
                  'Authorization':`Bearer ${decryptedUserDetails.token}`
            }
          }) 
      
          setConversation(res.data.result)

         }catch(err){
          console.log(err)
         }
      }
      getConversation()
    },[])



 

    return (
        <div className={`${flex} hidden md:block`}>
            <div className={`min-h-withoutHeader bg-white-100  p-6 max-h-48 w-1/4 fixed overflow-auto `}>
             <div className=" h-96 p-4">
                 {/* <h1 className="uppercase text-xl font-semibold text-dark-gray ">Profile</h1> */}
               {/* main div profile */}
                {/* <Profile /> */}
                <h1 className="uppercase text-xl mt-6 font-semibold text-dark-gray ">Networks</h1>
                {/* online persons form follwers */}
              <OnlinePoeple conversation={conversation}  /> 
             
             </div>
        </div>
        </div>
    )
}

export default Left
