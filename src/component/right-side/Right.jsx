import React,{useState} from 'react'
import Chat from '../chatbox/Chat'

const Right = ({flex,chattingData}) => {
     
    const [chattindDataPrint,setChattingDataPrint]=useState(null)
    chattingData&&setChattingDataPrint(chattingData)
    const [openChat, setOpenChat]=useState(false)
    chattingData?.open&&setOpenChat(true)
    
    
    
    return (
        <div className={`${flex} `}>
        <div className={`min-h-withoutHeader   p-6 max-h-48 w-1/4 fixed overflow-auto `}>
            <div className="px-4">
            {openChat&&<Chat openChatBox={setOpenChat} changeChattinDataStatus={setChattingDataPrint}/>}
            </div>
    </div>
    </div>
    )
}

export default Right
