import React,{useContext} from "react";
import Reciver from "./ResivedMessage"
import Sender from "./SendingMessage"
import {AiOutlineClose} from "react-icons/ai"
import ChatDetails from "../../Contexts/ChatDetails";
const Chat = ({closeChatBox,chattingData}) => {
  const{changeChattingDetails}= useContext(ChatDetails)
  return (
      
         <div className=" absolute max-w-md bottom-3 rounded-2xl bg-white-100  ">
        <div className={`relative  max-w-md pb-5 h-96 overflow-auto  `} style={{width:"480px"}}>
      <div class={`  relative p:2 sm:p-6 justify-between flex   flex-col `}>
        <div class={` flex sm:items-center justify-between py-2 border-b-2 border-gray-200 relative`}>
          <div class="flex items-center  fixed   bg-white-100  w-96 space-x-4">
            <img
              src={chattingData.image}
              alt=""
              class="w-10 p-3 sm:w-16 h-10 sm:h-16 rounded-full"
            />
            <div class="flex leading-tight">
              <div class="text-lg mt-1 flex items-center">
                <span class="text-gray-700 text-sm  mr-2">{chattingData.username}</span>
                <span class="text-green-500">
                  <svg width="10" height="10">
                    <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
                  </svg>
                </span>
               
              </div>
            
            </div>
            <span className="text-gray-400 animate-bounce hover:text-red-300 ">typing...</span>
                <AiOutlineClose size="1.5rem" className="cursor-pointer text-pink" onClick={()=>{changeChattingDetails(null)}} />
          </div>
         
        </div>
        <div
          id="messages"
          class="flex flex-col space-y-4 p-8 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
        >
            {chattingData.messages.map((i)=>i.send?<Sender msg={i.msg} />:<Reciver msg={i.msg} />)}
         </div>
       </div>
       {/* sending panel */}
      <div class="border-t-2 border-gray-200 px-4  bottom-0 w-full pt-4 mb-2 sm:mb-0">
        <div class="fixed bottom-0 py-6 w-96 bg-white-100 flex">
          <span class="absolute inset-y-0 flex items-center">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </button>
          </span>
          <input
            type="text"
            placeholder="Write Something"
            class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
          />
          <div class="absolute right-0  items-center inset-y-0  sm:flex">
          
            <button
              type="button"
              class="inline-flex  items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-6 w-6 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  
      </div>

     
 );
};

export default Chat;
