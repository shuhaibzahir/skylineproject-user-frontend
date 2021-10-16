import React,{useState,useEffect} from 'react'
import SingleFollower from "./SingleFollower"
 
const AllFollowers = ({flex,followers,following}) => {

   const notResult = <div className="mt-24"><h1 className="text-3xl">No Followers</h1></div>
    return (
        <div className={`${flex} min-h-withoutHeader  w-full`}>
           <div className="flex justify-evenly flex-wrap">
          {followers.length==0&&notResult}
          {followers.map((i)=><SingleFollower userData={i} Following={following} /> )}
           

           </div>
      </div>
    )
}

export default AllFollowers
