import React,{useContext} from 'react'
import { useHistory } from 'react-router-dom'
import userContext from '../../Contexts/userDetails'
const Singout = () => {
    const history = useHistory()
    const {userDataFromDatabase,setUserDataFromServer} = useContext(userContext)
    if(userDataFromDatabase){
        setUserDataFromServer(null)
        history.push("/signin")
        return true
    }else{
        history.push("/signin")
        return true
    }
   
}

export default Singout
