import React from 'react'
import Profile  from './Profile'
import OnlinePoeple from './onlinePoeple'
const Left = ({flex,clickedUser}) => {
    return (
        <div className={`${flex} `}>
            <div className={`min-h-withoutHeader bg-white-100  p-6 max-h-48 w-1/4 fixed overflow-auto `}>
             <div className=" h-96 p-4">
                 <h1 className="uppercase text-xl font-semibold text-dark-gray ">Profile</h1>
               {/* main div profile */}
                <Profile />
                <h1 className="uppercase text-xl mt-6 font-semibold text-dark-gray ">Networks</h1>
                {/* online persons form follwers */}
               <OnlinePoeple chattingUser={clickedUser} />
             </div>
        </div>
        </div>
    )
}

export default Left
