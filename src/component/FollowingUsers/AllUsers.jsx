import React,{useState,useEffect} from 'react'
import SingleUsers from "./singleUser"
 
const AllUsers = ({flex,following,setFollowing}) => {

    const notResult = <div className="mt-24"><h1 className="text-3xl">No Following</h1></div>

    return (
        <div className={`${flex} min-h-withoutHeader  w-full`}>
           <div className="flex justify-evenly flex-wrap">
               {following.length==0&&notResult}
          {following.map((i)=> <SingleUsers i={i} setFollowing={setFollowing}/>)}
  
           </div>
      </div>
    )
}

export default AllUsers
