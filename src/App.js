import React,{useState} from 'react'
 
import Header  from './component/header/Header'
import Home from './component/pages/Home'

const App = () => {
    const [chattingData, setChatting]=useState(null)
    function openChatBoxWithUserDetails(data){
         
            setChatting(data)
    }
    function closeChat(){
        setChatting(null)
    }
    return (
        <>
           <Header /> 
           <Home clickedUser={openChatBoxWithUserDetails} chattingData={chattingData} closeChatBox={closeChat}/>
           
        </>
    )
}

export default App
