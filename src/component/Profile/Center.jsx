import React,{useContext,useEffect,useState} from 'react'
 import ProfileDiv from "./ProfileDiv"
import userContext from "../../Contexts/userDetails"
import axios from "axios"
import Posts from "../feeds/Post"
import { decryptData,encryptData } from "../../Middleware/crypto";
const Feeds = ({flex}) => {
    const {userDataFromDatabase} =useContext(userContext)
    let checkUserData = localStorage.getItem("userChecking");
    let decryptedUserDetails = decryptData(checkUserData);
    let [userPost,setUserPost] = useState([])





useEffect(() => {
    axios.get("/api//user/own/post",{
        headers:{
            'Authorization':`Bearer ${decryptedUserDetails.token}`
          }
    }).then(response=>{
       
        setUserPost(response.data.posts)
    }).catch((er)=>{
        console.log(er)
    })
 
}, [])




    return (
        <div  className={`${flex} min-h-withoutHeader w-full`}>
            
           <div className="p-6 ml-6 w-full ">

                <div className="bg-re-400">
                    <ProfileDiv />
                </div>
                { userPost.map((p)=> <Posts postData={p} />) }
              </div>
         
        </div>
    )
}

export default Feeds
