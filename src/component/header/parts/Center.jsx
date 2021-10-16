import React from "react";
import {Link} from "react-router-dom"
import { RiHomeWifiLine } from "react-icons/ri";
import {HiOutlineUserGroup} from "react-icons/hi";
import {AiOutlineMessage} from "react-icons/ai"
import {IoMdNotificationsOutline} from "react-icons/io"
 
const Center = ({ flex }) => {
  return (
    <div className={`${flex} items-center  w-full shadow-md rounded-full`}>
      <div className="flex rounded-2xl h-16  text-dark-gray bg-dark-white  justify-around items-center w-full">
        <Link to="/">
        <div className="hover:bg-pink duration-300  ease-linear bg-white cursor-pointer hover:text-white p-2 rounded-2xl     ">
          <RiHomeWifiLine size="2rem" />
        </div>
        </Link>
        <Link to="/following">
        <div className="hover:bg-pink duration-300  ease-linear bg-white cursor-pointer hover:text-white p-2 rounded-2xl     ">
          <HiOutlineUserGroup size="2rem" />
        </div>
        </Link>
        <div className="group hover:bg-pink duration-300 relative ease-linear bg-white cursor-pointer hover:text-white p-2 rounded-2xl     ">
        <span className="p-0.5 absolute group-hover:bg-dark-gray duration-300  text-sm h-6 w-6 text-center text-white -top-1 -right-1 rounded-full bg-pink">{"3"}</span> 
          <AiOutlineMessage size="2rem" />
        </div>
        
        <div className="group hover:bg-pink duration-300 relative ease-linear bg-white cursor-pointer hover:text-white p-2 rounded-2xl     ">
            <span className="group-hover:bg-dark-gray p-0.5 duration-300  absolute text-sm h-6 w-6 text-center text-white -top-1 -right-1 rounded-full bg-pink">{"3"}</span> 
          <IoMdNotificationsOutline size="2rem" />
        </div>  
      </div>
    </div>
  );
};

export default Center;
