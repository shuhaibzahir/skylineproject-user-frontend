import React,{useContext} from 'react'
 import ProfileDiv from "./ProfileDiv"
import userContext from "../../Contexts/userDetails"
 
const Feeds = ({flex}) => {
    const {userDataFromDatabase} =useContext(userContext)
 
    return (
        <div  className={`${flex} min-h-withoutHeader w-full`}>
            
           <div className="p-6 ml-6 w-full ">

                <div className="bg-re-400">
                    <ProfileDiv />
                </div>

             
           </div>
         
        </div>
    )
}

export default Feeds
