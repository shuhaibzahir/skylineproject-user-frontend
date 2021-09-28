import React,{useContext} from 'react'
 
import userContext from "../../Contexts/userDetails"
import Stories from './Stories'
import AddPost from './AddPost'

const Feeds = ({flex}) => {
    const {userDataFromDatabase} =useContext(userContext)
    
    return (
        <div  className={`${flex} min-h-withoutHeader w-full`}>
            
           <div className="p-6 ml-6 w-full  ">
          
            < Stories />
         {/* addpost div */}
            
             {userDataFromDatabase.constructorPower&&<AddPost />}  
             
           </div>
         
        </div>
    )
}

export default Feeds
