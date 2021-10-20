import React,{useState,useEffect,useRef} from 'react'
import {BrowserRouter as Router , Route, Switch} from "react-router-dom"
import Header  from './component/header/Header'
import Home from './component/pages/Home'
import ChattindContext from "./Contexts/ChatDetails"
import Singin from "./component/LoginAndSignup/Register"
import UserContext from "./Contexts/userDetails"
import Logout from "./component/LoginAndSignup/Singout"
import Profile from "./component/pages/Profile"
import { decryptData } from './Middleware/crypto'
import UserProfile from "./component/pages/UsersProfile"
import Followers from "./component/pages/Followers"
import Following from "./component/pages/Following"
import Chat from "./component/pages/Chat"
 
const App = () => {

 const [chatDetails, changeChattingDetails]=useState(null);
 const [userDataFromDatabase,setUserDataFromServer] = useState(null)
 
 
   let data = localStorage.getItem("userChecking")
   var decryptedUserDetails;
   if(data) {
   decryptedUserDetails = decryptData(data)
   }
  

    const header =()=>{
      if(decryptedUserDetails){
        return <Header/>
      }else if(userDataFromDatabase){
        return <Header/>
      }
    }
    
 
   return (
        <>
          <Router> 
       <UserContext.Provider value={{userDataFromDatabase, setUserDataFromServer}}>  
     
        <ChattindContext.Provider value={{chatDetails, changeChattingDetails}}>
         

           {header()}
      
           <Switch>
            
             <Route  path="/" exact component={Home} />
             <Route path="/signin" exact component={Singin} />
             <Route path ="/profile/" component={Profile} />
             <Route path ="/logout" component={Logout} />
             <Route path ="/user/profile/:userId"  component={UserProfile} />
             <Route path ="/followers"  component={Followers} />
             <Route path ="/following"  component={Following} />
             <Route path="/message" component={Chat} />
           </Switch>
            </ChattindContext.Provider>
         
           </UserContext.Provider>
           </Router>
        </>
    )
}

export default App
