import React,{useContext,useEffect} from "react"
import { useHistory } from 'react-router-dom';
import Feeds from "../feeds/Feeds"
import Left from "../left-side/Left"
import Right from "../right-side/Right"
import userContext from "../../Contexts/userDetails"

const Home = () => {
    let history = useHistory();
    const {userDataFromDatabase,setUserDataFromServer} = useContext(userContext)
 
    if(userDataFromDatabase){
        return (
            <div  className="space-x-6 flex min-w-full   min-h-withoutHeader  mt-24   justify-between ">
            <Left flex="flex-1" />
            <Feeds flex="flex-3"/>
            <Right flex="flex-1"  />
            </div>
        )
    }else{
        history.push("/signin")
        return true
    }
  
}

export default Home
