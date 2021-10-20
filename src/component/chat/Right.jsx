import React from 'react'
 import SingleUser from "./SingleUser.jsx"
const RightSide = ({flex,onlineUsers,conversation,getAllMessages,currentUser}) => {
   
    return (
        <div className={`${flex} `}>
            <div className={`min-h-withoutHeader bg-white-100  p-6 max-h-48 w-1/4 fixed overflow-auto `}>
             <div className=" h-96 p-4">
            
               </div>
        </div>
        </div>
    )
}

export default RightSide
