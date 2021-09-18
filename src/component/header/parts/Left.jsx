import React from 'react'
import {BiSearchAlt} from 'react-icons/bi'
const Left = ({flex}) => {
    return (
        <div className={`${flex} flex  h-16  rounded-2xl px-3  w-full justify-around items-center `}>
            <h1 className="mr-2 font-main text-pink text-4xl font-bold cursor-pointer">skyline</h1>
            <div className=" flex items-center rounded-full bg-white-100 px-4" >
                <BiSearchAlt size="1.5rem" className="text-dark-gray"/>
                <input className=" px-4 py-2 text-pink bg-transparent focus:outline-none" placeholder="search post, company.." type="text" />
            </div>
         </div>
    )
}

export default Left
