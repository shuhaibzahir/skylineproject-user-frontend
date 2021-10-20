import React,{useContext,useEffect,useRef} from 'react'
import Chat from '../chatbox/Chat'
import {Link} from "react-router-dom"
import RecomendedPoepleDiv from "./RecomendedPoeples"
import ChatDetails from '../../Contexts/ChatDetails'
import {IoMdPhotos} from "react-icons/io"
import {FaCalendar} from "react-icons/fa"
import {RiUserReceived2Fill,RiUserShared2Fill} from "react-icons/ri"
 
import { decryptData } from '../../Middleware/crypto.js'
const Right = ({flex}) => {


  let checkUserData = localStorage.getItem("userChecking");
  let currentUser = decryptData(checkUserData);

     

      

      
       const {chatDetails, changeChattingDetails}=useContext(ChatDetails)
     return (
        <div className={`${flex} `}>
        <div className={`min-h-withoutHeader   p-6 max-h-48 w-1/4 fixed overflow-auto `}>
             <div className="">
             <h1 className="uppercase text-xl font-semibold text-dark-gray ">Recomended Poepole</h1>
            <RecomendedPoepleDiv/>
             </div>


             <div className="px-6 py-4 space-y-4 mt-3 h-48   ">
             <h1 className="uppercase text-xl font-semibold text-dark-gray ">Options</h1>
                
                {/* option div */}
                <div className=" px-6  ">

               <Link to="/profile" className="m-2" >
                <div className="flex items-center justify-start space-x-3 cursor-pointer  ">
             <IoMdPhotos size="1.5rem" className="text-dark-gray  hover:text-pink  hover:mr-4 duration-300 ease-linear "/> <h1  className="text-xl text-dark-gray hover:px-4 duration-300 ease-linear hover:text-pink">Posts</h1>
             </div>
             </Link>
             <Link to="/"  className="m-2">
             <div className="flex items-center justify-start space-x-3 cursor-pointer  ">
             <FaCalendar size="1.5rem" className="text-dark-gray  hover:text-pink hover:mr-4 duration-300 ease-linear"/> <h1  className="text-xl text-dark-gray  hover:px-4 duration-300 ease-linear hover:text-pink ">Event</h1>
             </div>
             </Link>
              <Link to="/followers" className="m-2" >
              <div className="flex items-center justify-start space-x-3 cursor-pointer  ">
             <RiUserReceived2Fill size="1.5rem" className="text-dark-gray   hover:text-pink hover:mr-4 duration-300 ease-linear"/> <h1 className="text-xl text-dark-gray  hover:px-4 duration-300 ease-linear hover:text-pink" >Followers</h1>
               </div>
             </Link>
             <Link to="/following"  className="m-2">
             <div className="flex items-center justify-start space-x-3 cursor-pointer  ">
             <RiUserShared2Fill size="1.5rem" className="text-dark-gray   hover:text-pink hover:mr-4 duration-300 ease-linear"/> <h1  className="text-xl text-dark-gray  hover:px-4 duration-300 ease-linear hover:text-pink">Following</h1>
             </div>
            </Link>

              </div>
              </div>
              {chatDetails&&<div className="px-4 fixed bg-white-100 h-96 bottom-10 rounded-2xl w-1/4 right-10">
             <Chat closeChatBox={changeChattingDetails}  chattingData={chatDetails} />
            </div>}
       </div>
    </div>
    )
}

export default Right
