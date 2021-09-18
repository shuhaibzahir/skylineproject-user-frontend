import React,{useState} from 'react'
 
import Header  from './component/header/Header'
import Home from './component/pages/Home'

const App = () => {
    const [chattingData, setChatting]=useState(null)
    function openChatBoxWithUserDetails(data){
         
            setChatting(data)
    }
    return (
        <>
           <Header /> 
           <Home clickedUser={openChatBoxWithUserDetails} chattingData={chattingData}/>
           
        </>
    )
}

export default App
