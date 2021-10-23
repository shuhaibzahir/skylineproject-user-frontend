import React,{useState,useEffect,useRef}from 'react'
import SingleChat from "./SingleChat"
import axios from 'axios'
const SingleUserChat = ({messages,currentUser,setMessage,conversationId ,currentFriend ,socket}) => {
 
    const [text,setText] =useState('')
    const messageRef = useRef(null)
    useEffect(() => {
      if (messageRef) {
        messageRef.current.addEventListener('DOMNodeInserted', event => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
      }
     
    }, [messages])

    const chatOnSubmit=async(e)=>{
      e.preventDefault()
      const message ={
        conversationId:conversationId,
        sender:currentUser.user._id,
        text:text
      } 

      try{
        let response = await axios.post("https://skyline.shuhaib.host/server/api/post/meesages",message,{
          headers:{
            'Authorization':`Bearer ${currentUser.token}`
          
            }
          })
        socket.current.emit("sendMessage",{
          senderId:currentUser.user._id,
          reciverId:currentFriend._id,
          text:text
        })
        setMessage(prev=>[...prev,response.data])
        setText("")
      }catch(error){
        console.log(error)
      }
     
       
    }

    return (
        <div>
             <div className=" min-h-chatHeight p-4 rounded-2xl bg-white-100">
                    <div className="flex items-center space-x-3 ">
                        <img src={currentFriend.photo||"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"} className="rounded-full w-14 h-14" alt="" />
                        <h1>{currentFriend.username}</h1>
                    </div>
                    <hr className="mt-3"/>
                    <div className="overflow-auto p-6   rounded" ref={messageRef} style={{maxHeight:"600px", minHeight:"600px"}}>
                     
                    {messages.map((m,index)=>   <SingleChat key={index} m={m}    own={m.sender===currentUser.user._id}/>)}
                    
                     </div>

                    <div className="  flex w-auto items-center mt-4 h-24 pb-4">
                         <form onSubmit={chatOnSubmit} className="flex bg-white shadow  h-24 p-6 items-center w-full h-auto rounded-full">
                             <input type="text"  value={text}  onChange={(e)=>setText(e.target.value)} className="w-full h-10 outline-none ml-7 " style={{background:'none'}}/>
                             <button className="p-3 p-x-6  text-white bg-pink rounded-full">Send</button>
                         </form>
                    </div>

               </div>
        </div>
    )
}

export default SingleUserChat
