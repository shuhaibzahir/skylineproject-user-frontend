import React,{useEffect, useState} from 'react'
import Recomended from './Recomended'
import axios from "axios"
import { decryptData,encryptData } from "../../Middleware/crypto";
const RecomendedPoeples = () => {

   let checkUserData = localStorage.getItem("userChecking");
  let decryptedUserDetails = decryptData(checkUserData);

  const [suggested , setSuggested]= useState([])

  useEffect(()=>{
    axios.get("https://skyline.shuhaib.host/server/api/suggested/user",{
        headers:{
            'Authorization':`Bearer ${decryptedUserDetails.token}`
        }
    }).then((result)=>{
        setSuggested(result.data.users)
    }).catch((err)=>{
        console.log(err)
    })
  },[])

    return (
        
             <div className="px-6 py-4 space-y-4 mt-3 h-48 overflow-auto">
               
               
               {suggested?.length==0?<p>NO Suggession</p>:suggested?.map((i)=><Recomended data={i} changeState={setSuggested} key={i._id}/>)}  
               
                 
             </div>
        
    )
}

export default RecomendedPoeples
