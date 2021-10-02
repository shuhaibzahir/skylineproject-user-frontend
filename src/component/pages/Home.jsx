import React from "react"
import { useHistory } from 'react-router-dom';
import Feeds from "../feeds/Feeds"
import Left from "../left-side/Left"
import Right from "../right-side/Right"
 

const Home = () => {
    let history = useHistory();

 //  checking the user loged in  or not 
    let checkUserData = localStorage.getItem("userChecking")
    checkUserData = checkUserData?JSON.parse(checkUserData):null
    if(!checkUserData){
        history.push("/signin")
        return true
    } 
 
// home page ........
        return (
            <div  className="space-x-6 flex min-w-full   min-h-withoutHeader  mt-24   justify-between ">
            <Left flex="flex-1" />
            <Feeds flex="flex-3" />
            <Right flex="flex-1" />
            </div>
        )
    
  
}

export default Home
