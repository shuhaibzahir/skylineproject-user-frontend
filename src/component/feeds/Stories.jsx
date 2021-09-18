import React,{useState} from 'react'
import Story from './Story'
 
const Stories = () => {
    const [mouseover, setScroll ]= useState(false)
    return (
        <div className={`flex relative duration-400 ${mouseover?"overflow-x-auto":"overflow-x-hidden"} flex-row items-center justify-start space-x-4 cursor-pointer`} onMouseEnter={()=>{setScroll(!mouseover)}} onMouseLeave={()=>{setScroll(!mouseover)}} >
       <div className="w-20 p-5">
       <div className="flex space-x-3   w-max ">
                <Story viewd={true}/>
                <Story  viewd={true}/>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
                <Story/>
             </div>
       </div>
 

   </div>
    )
}

export default Stories
