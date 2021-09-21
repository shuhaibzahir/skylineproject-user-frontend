import React,{useState} from 'react'
import {BrowserRouter as Router , Route, Switch} from "react-router-dom"
import Header  from './component/header/Header'
import Home from './component/pages/Home'
import ChattindContext from "./Contexts/ChatDetails"
import Singin from "./component/LoginAndSignup/Register"
const App = () => {
 const [chatDetails, changeChattingDetails]=useState(null);
   return (
        <>
        <ChattindContext.Provider value={{chatDetails, changeChattingDetails}}>
           <Router>
           {chatDetails&&<Header/> }
           <Switch>
             <Route  path="/" exact component={Home} />
             <Route path="/signin" component={Singin} />
           </Switch>
          
           </Router>
           </ChattindContext.Provider>
        </>
    )
}

export default App
