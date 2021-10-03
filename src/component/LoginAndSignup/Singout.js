import React,{useContext} from 'react'
import { useHistory,Redirect } from 'react-router-dom'
import userContext from '../../Contexts/userDetails'
const Singout = () => {
    const {setUserDataFromServer} = useContext(userContext)
    
    setUserDataFromServer('')
   localStorage.removeItem("userChecking")
    
    return <Redirect to="/signin"/>
   
   
}

export default Singout
