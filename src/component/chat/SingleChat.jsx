import React from 'react'
import { format } from 'timeago.js'
const SingleChat = ({own,m}) => {

    return (
        <div className={` flex flex-col ${own?" justify-end items-end  ":"justify-start items-start "}`}>
            <div className={`   rounded-2xl m-3 p-3  ${own?'justify-end   rounded-br-none bg-white shadow  ':'rounded-bl-none bg-pink text-white'}`}>
                       <div className={`pl-3 `}>
                       <p>{m.text}</p>
                        </div>
                       
                 </div>
                 <p  className={`${own?' mr-3':'text-left ml-3'} text-sm`}>{format(m.createdAt)}</p>
        </div>
    )
}

export default SingleChat
