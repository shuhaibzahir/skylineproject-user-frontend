import React,{useRef} from 'react'
import {RiRadioButtonLine} from "react-icons/ri"
const People = ({chattingUser}) => {
    const poepleName = useRef()
    const peopleImage = useRef()

    function getUserMessageDetails(){
        
        let imageLInk = peopleImage.current.src
        let name = poepleName.current.name
        let messages = [{recived:"hahha"},{send:"hoooooo"},{recived:"hahha"},{send:"hoooooo"},{recived:"hahha"},{send:"hoooooo"}]
        let chattingData={image:imageLInk, name:name,messages:messages,open:true}
         chattingUser(chattingData)
    }
    return ( 
          <div className="flex justify-between items-center cursor-pointer" onClick={getUserMessageDetails}>
                   <div className="flex space-x-4 items-center">
                   <img ref={peopleImage} src="https://static.toiimg.com/thumb/msid-72109105,imgsize-129322,width-800,height-600,resizemode-75/72109105.jpg" className="h-8 w-8 rounded-full" alt="" />
                    <h1 ref={poepleName} name="Jasmin Algo">Jasmin Algo</h1>
                   </div>
                    <RiRadioButtonLine color="green" />
                </div>
    )
}

export default People
