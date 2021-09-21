import React,{useRef ,useContext} from 'react'
import {RiRadioButtonLine} from "react-icons/ri"
import ChatDetails from '../../Contexts/ChatDetails'
const People = ({imageUrl,profileName}) => {
    const poepleName = useRef()
    const peopleImage = useRef()
    const {changeChattingDetails}= useContext(ChatDetails)
    function getUserMessageDetails(){
        
        let imageLInk = peopleImage.current.src
        let name = poepleName.current.innerHTML
      
        let messages = [{recived:true,msg:"hahha"},{send:true,msg:"hoooooo"},{recived:true,msg:"hahha"},{recived:true,msg:"hahha"},{recived:true,msg:"hahha"},{recived:true,msg:"hahha"}]
        let chattingData={image:imageLInk, username:name,messages:messages,open:true}
         
        changeChattingDetails(chattingData)
    }
    return ( 
          <div className="flex justify-between items-center cursor-pointer" onClick={getUserMessageDetails }>
                   <div className="flex space-x-4 items-center">
                   <img ref={peopleImage} src={imageUrl} className="h-8 w-8 rounded-full" alt="" />
                    <h1 ref={poepleName} >{profileName}</h1>
                   </div>
                    <RiRadioButtonLine color="green" />
                </div>
    )
}

export default People
