import React from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
 
const Recomended = ({imag,followingFun, name}) => {
    return (
         
             <div className="flex justify-between items-center bg-white-100 p-4 rounded-2xl">
                     <img src="https://blog.hubspot.com/hubfs/characteristics-of-professional-salespeople.jpg" className="h-10 w-10 rounded-full" alt="" />
                     <h3>shameels jahanaki</h3>
                     <IconButton aria-label="delete">
                     <PersonAddIcon />
                       </IconButton>
                </div>
         
    )
}

export default Recomended
