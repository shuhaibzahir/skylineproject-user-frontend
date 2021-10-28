import React,{useState,useRef,useEffect,useContext} from "react"
import { useHistory } from 'react-router-dom';
import LeftOfChat from '../chat/Left'
import ChatBox from '../chat/ChatBox'
import RightOfChat from '../chat/Right'
import ChatDetails from "../../Contexts/ChatDetails";

import { decryptData } from "../../Middleware/crypto";
import axios from "axios";
import {io} from "socket.io-client"
const Chat = () => {
    let history = useHistory();
    const { changeChattingDetails } = useContext(ChatDetails);
    const [messages,setMessage] = useState([])
    const [arrivalMessage,setArrivalMessage] =useState(null)
    const [openChat,setOpenChat] = useState(false)
    const [conversationId,setConversationId]=useState('')
    const [currentFriend,setCurrentFriend] =useState(null)
    const[onlineUsers,setOnlineUsers]=useState([])
 
    const [conversation,setConversations] =useState([])

    const socket = useRef()
     //  checking the user loged in  or not 
    let checkUserData = localStorage.getItem("userChecking")
    let currentUser ;
    if(checkUserData) currentUser = decryptData(checkUserData)
 
    useEffect(() => {
        socket.current=io("wss://skyline.shuhaib.host/websocket",{ transports: ['websocket'] ,  rejectUnauthorized:   false,})
         socket.current.on("getMessage",data=>{

            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })
        })
    }, [])


    useEffect(() => {
     arrivalMessage&&currentFriend._id==arrivalMessage.sender&& setMessage((prev)=>[...prev,arrivalMessage])
    }, [arrivalMessage])


    useEffect(() => {
      socket.current.emit("addUser",currentUser.user._id)
      socket.current.on("getUser",users=>{
           
        setOnlineUsers(users)
      })
    }, [])


    


    useEffect(() => {
        return () => {
            socket.current.emit("disconnet",currentUser.user._id)
        };
      }, []);
  
    if(!currentUser){
        history.push("/signin")
        return true
    } 


    

    const getAllMessages =(converId,user)=>{
       
        axios.get(`https://skyline.shuhaib.host/server/api/get/meesages/${converId}`,{
            headers:{
                'Authorization':`Bearer ${currentUser.token}`
              
         }
        }).then((res)=>{    
            setCurrentFriend(user)
            setConversationId(converId)
            setOpenChat(true)
            setMessage(res.data.result|| [])
           
        }).catch((err)=>{
            console.log(err)
        })
    }

// home page ........

        return (
            <div  className="md:space-x-6  flex min-w-full   min-h-withoutHeader  mt-24   justify-between ">
   
            <LeftOfChat getMessage={getAllMessages} conversation={conversation} setConversations={setConversations} flex="flex-1" />
            <ChatBox messages={messages} socket={socket} openChat={openChat} currentFriend={currentFriend} currentUser={currentUser} conversationId={conversationId} setMessage={setMessage} flex="flex-3" />
            <RightOfChat onlineUsers={onlineUsers}   getMessage={getAllMessages} conversation={conversation}  conversation={conversation} currentUser={currentUser} flex="flex-1" />
 
         </div>
        )
    
  
}

export default Chat
