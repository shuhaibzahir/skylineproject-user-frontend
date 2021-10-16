import React from "react"
import { useHistory } from 'react-router-dom';
import Center from "../../component/UsersProfile/Center"
import Left from "../../component/left-side/Left"
import RightSide from "../../component/UsersProfile/Rightside"
import { decryptData } from "../../Middleware/crypto"; 

const Profile = () => {
    let history = useHistory();
    let checkUserData = localStorage.getItem("userChecking")
   let decryptedUserDetails = decryptData(checkUserData)
// checking user if the user is there run the next else the router will be executed
    if(!decryptedUserDetails){
        history.push("/signin")
        return true 
    }
 
            return (
                <div  className="space-x-6 flex min-w-full   min-h-withoutHeader  mt-24   justify-between ">
                <Left flex="flex-1" />
                <Center flex="flex-3"/>
                <RightSide flex="flex-1"  />
                </div>
            )
  
}

export default Profile