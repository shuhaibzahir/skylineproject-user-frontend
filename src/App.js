import React,{useState} from 'react'
import {BrowserRouter as Router , Route, Switch} from "react-router-dom"
import Header  from './component/header/Header'
import Home from './component/pages/Home'
import ChattindContext from "./Contexts/ChatDetails"
import Singin from "./component/LoginAndSignup/Register"
import UserContext from "./Contexts/userDetails"
const App = () => {
 const [chatDetails, changeChattingDetails]=useState(null);
 const [userDataFromDatabase,setUserDataFromServer] = useState(null)
   return (
        <>
          <Router> 
       <UserContext.Provider value={{userDataFromDatabase, setUserDataFromServer}}>    
        <ChattindContext.Provider value={{chatDetails, changeChattingDetails}}>
         
         
           {userDataFromDatabase&&<Header/> }
           <Switch>
             <Route  path="/" exact component={Home} />
             <Route path="/signin" component={Singin} />
           </Switch>
          
         
           </ChattindContext.Provider>
           </UserContext.Provider>
           </Router>
        </>
    )
}

export default App
