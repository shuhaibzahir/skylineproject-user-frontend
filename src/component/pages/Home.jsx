import Feeds from "../feeds/Feeds"
import Left from "../left-side/Left"
import Right from "../right-side/Right"
import { useState } from "react"


const Home = ({clickedUser, chattingData, closeChatBox}) => {
 
    return (
        <div  className="space-x-6 flex min-w-full   min-h-withoutHeader  mt-24   justify-between ">
        <Left flex="flex-1" clickedUser={clickedUser}/>
        <Feeds flex="flex-3"/>
        <Right flex="flex-1" chattingData={chattingData} closeChatBox={closeChatBox} />
        </div>
    )
}

export default Home
