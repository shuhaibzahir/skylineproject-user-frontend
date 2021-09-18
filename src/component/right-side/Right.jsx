import React,{useState} from 'react'
import Chat from '../chatbox/Chat'

const Right = ({flex,chattingData,closeChatBox}) => {
     
  
 
   
    return (
        <div className={`${flex} `}>
        <div className={`min-h-withoutHeader   p-6 max-h-48 w-1/4 fixed overflow-auto `}>
            <div className="px-4">
           {chattingData&&<Chat closeChatBox={closeChatBox} chattingData={chattingData} />}
            </div>
    </div>
    </div>
    )
}

export default Right
