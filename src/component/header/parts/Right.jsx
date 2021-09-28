import React,{Fragment,useState,useContext} from 'react'
import {FiSettings} from "react-icons/fi"
import {RiUserSharedFill} from "react-icons/ri"
import {FaUserCog,FaUser} from "react-icons/fa"
import {IoIosCloseCircleOutline} from "react-icons/io"
import UserContext from "../../../Contexts/userDetails.js"

import {  Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
 
const Right = ({flex}) => {
  const [openOption, setOpen]=useState(false)
  const {userDataFromDatabase}  =useContext(UserContext)

    return (
        <div className={`${flex}   items-center rounded-full    w-full `}>

        <div className="flex rounded-2xl h-16   bg-dark-white  ml-4 shadow-md justify-around items-center w-full">
     
       <div className={`${openOption?"hidden":"flex"} duration-300  items-center justify-center space-x-4`}>
                <img src="https://yt3.ggpht.com/ytc/AKedOLTIbYSBxZvTQV8isj_TFE3KkXyyLBTxfdAypcfiqQ=s900-c-k-c0x00ffffff-no-rj" className="rounded-full h-8 " alt="" />
                <h3>Shuhaib Zahir</h3>
        </div>
           <div  className={`${openOption?"hidden":""} bg-white hover:bg-pink hover:text-white duration-200 p-2 cursor-pointer rounded-full text-pink`} onClick={()=>setOpen(!openOption)}>
                <FiSettings size="1.5rem"   />
          </div>
      
           
         <div className={`${openOption?"flex":"hidden" } duration-300 items-center justify-around px-4  w-full space-x-4`}>
           <Link to={`/profile/${userDataFromDatabase.user._id}`}  onClick={()=>setOpen(!openOption)} className="flex items-center jusitfy-between "><FaUser size="1.4rem"  className="mr-3 text-pink hover:text-dark-gray"/>Profile</Link>
          <Link className="flex items-center jusitfy-between "  onClick={()=>setOpen(!openOption)}  ><FaUserCog size="1.4rem" className="mr-3 text-pink  hover:text-dark-gray"/>Settings</Link>
          <Link to="/logout" className="flex items-center jusitfy-between  "   onClick={()=>setOpen(!openOption)} ><RiUserSharedFill size="1.4rem" className="mr-3 text-pink  hover:text-dark-gray"/>Logout</Link>
          <div  className={` bg-white hover:bg-pink hover:text-white duration-200 p-2 cursor-pointer rounded-full text-pink`} onClick={()=>setOpen(!openOption)}>
                <IoIosCloseCircleOutline size="1.5rem"   />
          </div>
          </div>
       

         </div>
        
      </div>
    )
}

export default Right
