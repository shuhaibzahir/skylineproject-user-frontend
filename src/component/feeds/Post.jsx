import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { decryptData } from '../../Middleware/crypto'
import ReactPlayer from 'react-player/lazy'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
const Post = () => {
    return (
        <div  >

<div className="shadow  rounded-2xl mb-10 p-4">
                 <div className="p-3 flex justify-between items-center ">
                   <div className=" space-x-4 flex items-center" >
                   <img src="https://pbs.twimg.com/profile_images/1390886031851855880/wktTnTP3_400x400.jpg"  className="w-12 h-12  rounded-full" alt="" />
                   <div className="text-sm text-dark-gray">
                       <p>shuhaib</p>
                       <p>10 July 2020</p>
                   </div>
                   </div>
                  <MoreVertIcon   className="cursor-pointer"/>
                 </div>
                 {/* content part */}
                 <div className="p-4  mb-4">
                     <h1 className="text-lg mb-2">This is Title and this iss fsdaf sadjfksdjfkjsdf kjksjdaf </h1>
                     <p  className="text-gray-700">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam vitae maiores atque esse culpa, cum illo iure sed deleniti reprehenderit nulla qui sapiente. Dolorum quisquam quia fuga quae reiciendis impedit.</p>
                 </div>

                 {/* media part */}
                 <div className="flex justify-center">
                     <ReactPlayer width="100%" url="https://www.youtube.com/watch?v=Tn6-PIqc4UM"/>
                 </div>

                {/* options  */}

                <div className="flex justify-between  p-4">
                    <div className="space-x-3 text-3xl ">
                    <di>
                    <FavoriteIcon className="cursor-pointer " color="error" fontSize="string" />
                    <span className="text-sm">111</span>
                    </di>
                    <ChatBubbleOutlineIcon className="cursor-pointer" fontSize="string" />
                     </div>
                     <BookmarkBorderIcon className="cursor-pointer text-3xl" fontSize="string" />
                </div>
                {/* comments */}
                 <div className=" p-4">
                     <div className="flex  bg-white-100 items-center p-5 rounded-2xl rounded-bl-none justify-between">
                         <div className="flex space-x-2">
                         <img src="https://pbs.twimg.com/profile_images/1390886031851855880/wktTnTP3_400x400.jpg" className="w-8 h-8 rounded-full" alt="" />
                         <p className="text-sm  ">int iusto qui impedit quibusdam debitis, nobis aliquam nam, corporis reiciendis expedita quos saepe quasi.</p>
                         </div>
                         <MoreVertIcon   className="cursor-pointer"/>
                     </div>
                 </div>
            {/* add comments */}
             <div className="w-full p-4 flex items-center"> 
             <TextField id="standard-basic" fullWidth label="Leave a comment" variant="standard" />
             <SendIcon className="cursor-pointer " />
             </div>
             </div>
         </div>
    )
} 

export default Post
