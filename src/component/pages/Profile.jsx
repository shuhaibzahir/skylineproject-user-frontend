import React,{useContext,useEffect} from "react"
import { useHistory } from 'react-router-dom';
import Center from "../../component/Profile/Center"
import Left from "../../component/left-side/Left"
import RightSide from "../../component/Profile/RightSide"
import userContext from "../../Contexts/userDetails"

const Profile = () => {
    let history = useHistory();
    const {userDataFromDatabase,setUserDataFromServer} = useContext(userContext)
 
        if(userDataFromDatabase){
            return (
                <div  className="space-x-6 flex min-w-full   min-h-withoutHeader  mt-24   justify-between ">
                <Left flex="flex-1" />
                <Center flex="flex-3"/>
                <RightSide flex="flex-1"  />
                </div>
            )
        }else{
            history.push("/signin")
            return true
        }
       
 
  
}

export default Profile
