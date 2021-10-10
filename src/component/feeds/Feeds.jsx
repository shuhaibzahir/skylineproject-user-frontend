import React ,{useState,useEffect}from 'react'
 
import Stories from './Stories'
import AddPost from './AddPost'
import Posts from "./Post"
import { decryptData } from '../../Middleware/crypto'
import axios from "axios"
 
const Feeds = ({flex}) => {
    let checkUserData = localStorage.getItem("userChecking")
    let decrypedUserDetails = decryptData(checkUserData)
    const [posts, setPosts]= useState([])

    useEffect(()=>{
      axios.get('/api/logged/get/all/post',{
        headers:{
          'Authorization':`Bearer ${decrypedUserDetails.token}`
         }
      }).then((response)=>{
        setPosts(response.data.data)
      }).catch((err)=>{
        console.log(err.data)
      })
    },[])


    const deletePost =(postId)=>{
      axios.delete(`/api/post/delete/${postId}`,{
        headers:{
          'Authorization':`Bearer ${decrypedUserDetails.token}`
         }
      }).then((response)=>{
        setPosts((prev)=>{
          return prev.filter((i)=>i._id!==postId)
        })
      }).catch((err)=>{
        console.log(err)
      })
    }
    return (
         <div  className={`${flex} min-h-withoutHeader  w-full`}>
            
           <div className="p-6 ml-6 w-full  ">
          
            < Stories />
            {/* addpost div */}
            
             {decrypedUserDetails?.user?.constructorPower&&<AddPost />}  

             {/* posts */}

              {posts.map((p,index)=><Posts postData={p} deletePost={deletePost} key={index}/>)}
             
        
           </div>
         
        </div>
    )
}

export default Feeds
