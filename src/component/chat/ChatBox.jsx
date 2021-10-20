import React,{useState,useEffect,useRef} from 'react'
import SingleChatBox from "./SingleUserChat"
const RightSide = ({flex,messages,openChat,currentUser,setMessage,conversationId ,currentFriend ,socket}) => {
   
    return (
        <div className={`${flex} `}>
            <div className={`min-h-withoutHeader  p-6    max-h-48 w-1/2  fixed overflow-hidden `}>
              {openChat?<SingleChatBox messages={messages} socket={socket} currentFriend={currentFriend} conversationId={conversationId} currentUser={currentUser} setMessage={setMessage} />:<div className=" min-h-withoutHeader flex items-center text-center justify-center"><h1 className="text-8xl text-gray-300 ">Open A Message !</h1></div>}  
        </div>
        </div>
    )
}

export default RightSide
