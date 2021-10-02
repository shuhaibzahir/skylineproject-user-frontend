import React,{useContext} from 'react'
import { useHistory } from 'react-router-dom'
import userContext from '../../Contexts/userDetails'
const Singout = () => {
    const {setUserDataFromServer} = useContext(userContext)
    const history = useHistory()
    setUserDataFromServer(null)
   localStorage.removeItem("userChecking")
   
   history.push("/signin")
   
   
   return true
   
   
}

export default Singout
