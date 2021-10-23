import React, { useContext, useRef, useEffect, useState } from "react";
import Reciver from "./ResivedMessage";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AiOutlineClose } from "react-icons/ai";
import ChatDetails from "../../Contexts/ChatDetails";
import SingleChat from "../chat/SingleChat";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios"
import { decryptData } from '../../Middleware/crypto.js'

import {io} from "socket.io-client"

const Chat = ({ closeChatBox, chattingData }) => {





 
  let checkUserData = localStorage.getItem("userChecking");
  let currentUser = decryptData(checkUserData);
 

  const { chatDetails, changeChattingDetails } = useContext(ChatDetails);
  const [text, setText] = useState("");
  const messageRef = useRef(null);
  const [messages, setMessages] =useState(chatDetails.message)

 

  useEffect(() => {
    setMessages(chatDetails.message)
  }, [])


  useEffect(() => {
    if (messageRef) {
      messageRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [ ]);


// socket setting
 const [arrivedMessage,setArrivedMessage] =useState(null)
 
const socket = useRef()
useEffect(() => {
 socket.current=io("wss://4r1di7dg3k.execute-api.us-east-1.amazonaws.com/production",{ transports: ['websocket'] ,  rejectUnauthorized:   false,})
 socket.current.on("getMessage",data=>{
 
  setArrivedMessage({
      sender:data.senderId,
      text:data.text,
      createdAt:Date.now()
  })
})
}, [])


useEffect(() => {
  arrivedMessage&&chatDetails.user._id==arrivedMessage.sender&& setMessages((prev)=>[...prev,arrivedMessage])
 }, [arrivedMessage])


useEffect(() => {
 socket.current.emit("addUser",currentUser.user._id)
 socket.current.on("getUser",users=>{
  
 })
}, [])



 
   
  

 
const chatOnSubmit=async(e)=>{
  e.preventDefault()
  
  const message ={
    conversationId:chatDetails.conversation._id,
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
        reciverId:chatDetails.user._id,
        text:text
      })
    setMessages(prev=>[...prev,response.data])
    setText("")
  }catch(error){
    console.log(error)
  }
 
   
}

 

  return (
    <div className="p-4  ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3  ">
          <img
            src={chatDetails.user.photo}
            className="rounded-full w-14 h-14"
            alt=""
          />
          <h1>{chatDetails.user.username}</h1>
          <p className="animate-bounce text-sm text-gray-400">typing..</p>
        </div>
        <IconButton onClick={()=>changeChattingDetails(null)}>
          <CloseIcon className="text-pink"  />
        </IconButton>
      </div>
      <hr className="mt-3" />
    <div className="h-56 overflow-auto px-4 " ref={messageRef}>
        {messages.map((m,index) => (
          <SingleChat key={index} m={m} own={chatDetails.user._id !== m.sender} />
        ))}
      </div> 

      <div className="  flex w-auto items-center  ">
        <form className="flex bg-white shadow  h-24 p-2 items-center w-full h-auto rounded-full" onSubmit={chatOnSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full   outline-none ml-7 "
            style={{ background: "none" }}
          />
          <button className="p-3 p-x-6  text-white bg-pink rounded-full">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
