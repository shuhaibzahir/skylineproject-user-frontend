import React from 'react'
 
import Stories from './Stories'
import AddPost from './AddPost'
import { decryptData } from '../../Middleware/crypto'
const Feeds = ({flex}) => {
    let checkUserData = localStorage.getItem("userChecking")
    let decrypedUserDetails = decryptData(checkUserData)
    
    return (
        <div  className={`${flex} min-h-withoutHeader  w-full`}>
            
           <div className="p-6 ml-6 w-full  ">
          
            < Stories />
         {/* addpost div */}
            
             {decrypedUserDetails?.user?.constructorPower&&<AddPost />}  
             
           </div>
         
        </div>
    )
}

export default Feeds
