import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router , Route, Switch} from "react-router-dom"
import Header  from './component/header/Header'
import Home from './component/pages/Home'
import ChattindContext from "./Contexts/ChatDetails"
import Singin from "./component/LoginAndSignup/Register"
import UserContext from "./Contexts/userDetails"
import Logout from "./component/LoginAndSignup/Singout"
import Profile from "./component/pages/Profile"
const App = () => {
 const [chatDetails, changeChattingDetails]=useState(null);
 const [userDataFromDatabase,setUserDataFromServer] = useState(null)
 const [localToken,setLocalToken]=useState(null)
 useEffect(()=>{
   let data = localStorage.getItem("token")
   data = JSON.parse(data)
   setLocalToken(data)

 },[localToken])
   return (
        <>
          <Router> 
       <UserContext.Provider value={{userDataFromDatabase, setUserDataFromServer}}>    
        <ChattindContext.Provider value={{chatDetails, changeChattingDetails}}>
         

           {localToken&&<Header/> }
      
           <Switch>
            
             <Route  path="/" exact component={Home} />
             <Route path="/signin" exact component={Singin} />
             <Route path ="/profile/" component={Profile} />
             <Route path ="/logout" component={Logout} />
           </Switch>
            </ChattindContext.Provider>
           </UserContext.Provider>
           </Router>
        </>
    )
}

export default App
