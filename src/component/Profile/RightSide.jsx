import React,{useContext,useState} from 'react'
import Chat from '../chatbox/Chat'
 
import ChatDetails from '../../Contexts/ChatDetails'
import {IoMdPhotos} from "react-icons/io"
import {FaCalendar} from "react-icons/fa"
import {RiUserReceived2Fill,RiUserShared2Fill} from "react-icons/ri"
import ContractoForm from "./RegisterforContractor"

const Right = ({flex}) => {
       const {chatDetails, setChatting}=useContext(ChatDetails)
       let checkUserData = localStorage.getItem("userChecking")
       checkUserData = checkUserData?JSON.parse(checkUserData):null
        
       const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

       const checkingApplied = ()=>{
         
          if(checkUserData?.user?.applied=="yes"&&checkUserData?.user?.constructorPower){
             return true
          }else if(checkUserData.user.applied=="pending"){
             return(
               <button disabled  type="button" className="flex group bg-dark-gray h-16 duration-300 w-full justify-center space-x-4 items-center  p-3 rounded-2xl ">
               
               
               <span className="text-xl text-white ">Applied </span>
     
            </button>
             )

          }else {
            return (
               <button  onClick={handleOpen} type="button" className="flex group hover:bg-dark-gray h-16 duration-300 w-full justify-center space-x-4 items-center bg-pink p-3 rounded-2xl ">
               
               <span className="text-xl text-white ">Apply for contractor</span>
     
            </button>
            )
          }

       }

     return (
        <div className={`${flex} `}>
        <div className={`min-h-withoutHeader   p-6 max-h-48 w-1/4 fixed overflow-auto `}>
            

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
                {checkingApplied()}
                {checkUserData.user.rejected&&<p className="text-red-400 text-xl">Application Rejected</p>}

             </div>
            <div className="px-4">
           {chatDetails&&<Chat closeChatBox={setChatting} chattingData={chatDetails} />}
            </div>
       </div>
      <ContractoForm open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </div>
    )
}

export default Right