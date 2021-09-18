import React,{useRef} from 'react'
import {RiRadioButtonLine} from "react-icons/ri"
const People = ({chattingUser ,imageUrl,profileName}) => {
    const poepleName = useRef()
    const peopleImage = useRef()

    function getUserMessageDetails(){
        
        let imageLInk = peopleImage.current.src
        let name = poepleName.current.innerHTML
      
        let messages = [{recived:true,msg:"hahha"},{send:true,msg:"hoooooo"},{recived:true,msg:"hahha"},{recived:true,msg:"hahha"},{recived:true,msg:"hahha"},{recived:true,msg:"hahha"}]
        let chattingData={image:imageLInk, username:name,messages:messages,open:true}
         chattingUser(chattingData)
    }
    return ( 
          <div className="flex justify-between items-center cursor-pointer" onClick={getUserMessageDetails}>
                   <div className="flex space-x-4 items-center">
                   <img ref={peopleImage} src={imageUrl} className="h-8 w-8 rounded-full" alt="" />
                    <h1 ref={poepleName} >{profileName}</h1>
                   </div>
                    <RiRadioButtonLine color="green" />
                </div>
    )
}

export default People
