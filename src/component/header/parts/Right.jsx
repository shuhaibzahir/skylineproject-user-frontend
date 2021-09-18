import React from 'react'
 import {FiSettings} from "react-icons/fi"
const Right = ({flex}) => {
    return (
        <div className={`${flex}   items-center rounded-full     w-full `}>
        <div className="flex rounded-2xl h-16   bg-dark-white  ml-4 shadow-md justify-around items-center w-full">
                <div className="flex items-center justify-center space-x-4">
                <img src="https://yt3.ggpht.com/ytc/AKedOLTIbYSBxZvTQV8isj_TFE3KkXyyLBTxfdAypcfiqQ=s900-c-k-c0x00ffffff-no-rj" className="rounded-full h-8 " alt="" />
                <h3>Shuhaib Zahir</h3>
                 </div>
                <div  className="bg-white hover:bg-pink hover:text-white duration-200 p-2 cursor-pointer rounded-full text-pink">
                <FiSettings size="1.5rem"   />
                </div>
        </div>
      </div>
    )
}

export default Right
