import React,{useContext} from 'react'
import Chat from '../chatbox/Chat'
import RecomendedPoepleDiv from "./RecomendedPoeples"
import ChatDetails from '../../Contexts/ChatDetails'
import {IoMdPhotos} from "react-icons/io"
import {FaCalendar} from "react-icons/fa"
import {RiUserReceived2Fill,RiUserShared2Fill} from "react-icons/ri"

const Right = ({flex}) => {
       const {chatDetails, setChatting}=useContext(ChatDetails)
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
                <div className="space-y-4 px-6 py-4">


                <div className="flex items-center justify-start space-x-3 cursor-pointer  ">
             <IoMdPhotos size="1.5rem" className="text-dark-gray  hover:text-pink  hover:mr-4 duration-300 ease-linear "/> <h1  className="text-xl text-dark-gray hover:px-4 duration-300 ease-linear hover:text-pink">Posts</h1>
             </div>
             <div className="flex items-center justify-start space-x-3 cursor-pointer  ">
             <FaCalendar size="1.5rem" className="text-dark-gray  hover:text-pink hover:mr-4 duration-300 ease-linear"/> <h1  className="text-xl text-dark-gray  hover:px-4 duration-300 ease-linear hover:text-pink ">Event</h1>
             </div>
             <div className="flex items-center justify-start space-x-3 cursor-pointer  ">
             <RiUserReceived2Fill size="1.5rem" className="text-dark-gray   hover:text-pink hover:mr-4 duration-300 ease-linear"/> <h1 className="text-xl text-dark-gray  hover:px-4 duration-300 ease-linear hover:text-pink" >Followers</h1>
             </div>
             <div className="flex items-center justify-start space-x-3 cursor-pointer  ">
             <RiUserShared2Fill size="1.5rem" className="text-dark-gray   hover:text-pink hover:mr-4 duration-300 ease-linear"/> <h1  className="text-xl text-dark-gray  hover:px-4 duration-300 ease-linear hover:text-pink">Following</h1>
             </div>


              </div>
                

             </div>
            <div className="px-4">
           {chatDetails&&<Chat closeChatBox={setChatting} chattingData={chatDetails} />}
            </div>
       </div>
    </div>
    )
}

export default Right
