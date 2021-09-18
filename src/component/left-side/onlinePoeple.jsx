
 import People  from "./People"
const OnlinePoeple = ({chattingUser}) => {
    return (
        <div className="p-6 mt-3 overscroll-auto ">
            <div className="flex space-y-4 flex-col">
             <People chattingUser={chattingUser} />
           
             <People chattingUser={chattingUser} />
             <People chattingUser={chattingUser} />
             <People chattingUser={chattingUser} />
             <People chattingUser={chattingUser} />
             <People chattingUser={chattingUser} />
             
             <People />
              
            </div>
        </div>
    )
}

export default OnlinePoeple
