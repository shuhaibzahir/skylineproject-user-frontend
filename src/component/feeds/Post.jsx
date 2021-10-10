import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { decryptData } from "../../Middleware/crypto";
import ReactPlayer from "react-player/lazy";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Post = ({ postData,deletePost }) => {
  // take the user details
  let checkUserData = localStorage.getItem("userChecking");
  let decrypedUserDetails = decryptData(checkUserData);


  // chek the user is there for some post option
  const checkUserIdforMenuOption = (data) => {
    if (data.user == decrypedUserDetails.user._id) {
      return (
        <>
          <MenuItem onClick={()=>{handleClose();deletePost(data._id)}}>Delete</MenuItem>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
        </>
      );
    } else {
      return <MenuItem onClick={handleClose}>Report</MenuItem>;
    }
  };

  // the menu options
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  // check media to react player or image
  const checkMediaVideOrPhoto = () => {
    if (postData.videoType) {
      return (
        <div className="flex justify-center">
          <ReactPlayer controls={true} width="100%" url={postData.mediaLink} />
        </div>
      );
    } else if (postData.imageType) {
      return (
        <div className="flex justify-center">
          <img src={postData.mediaLink} alt="" />
        </div>
      );
    }
  };
 

  // change the date format

  const checkTheDatePosted = (dateOfPost) => {
    let current = new Date().toDateString();
    let postDate = new Date(dateOfPost).toDateString();
    let toTimeString = new Date(dateOfPost).toLocaleTimeString();
    if (current == postDate) {
      return <p>{`Today ${toTimeString}`}</p>;
    } else {
      return <p>{postDate}</p>;
    }
  };

  // delete the post


  return (
    <div>
      <div className="shadow  rounded-2xl mb-10 p-4">
        <div className="p-3 flex justify-between items-center ">
          <div className=" space-x-4 flex items-center">
            <img
              src="https://pbs.twimg.com/profile_images/1390886031851855880/wktTnTP3_400x400.jpg"
              className="w-12 h-12  rounded-full"
              alt=""
            />
            <div className="text-sm text-dark-gray">
              <p>shuhaib</p>
              {checkTheDatePosted(postData.date)}
            </div>
          </div>
          <MoreVertIcon
            onClick={handleClick}
            ria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            className="cursor-pointer"
          />
          {/* this is for mennu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {checkUserIdforMenuOption(postData)}
          </Menu>
        </div>
        {/* content part */}
        <div className="p-4  mb-4">
          <h1 className="text-lg mb-2">{postData.title}</h1>
          <p className="text-gray-700">{postData.content}</p>
        </div>

        {/* media part */}

        {checkMediaVideOrPhoto()}

        {/* options  */}

        <div className="flex justify-between  p-4">
          <div className="space-x-3 text-3xl ">
            <di>
              <FavoriteIcon
                className="cursor-pointer "
                color="error"
                fontSize="string"
              />
              <span className="text-sm">111</span>
            </di>
            <ChatBubbleOutlineIcon
              className="cursor-pointer"
              fontSize="string"
            />
          </div>
          <BookmarkBorderIcon
            className="cursor-pointer text-3xl"
            fontSize="string"
          />
        </div>
        {/* comments */}
        <div className=" p-4">
          <div className="flex  bg-white-100 items-center p-5 rounded-2xl rounded-bl-none justify-between">
            <div className="flex space-x-2">
              <img
                src="https://pbs.twimg.com/profile_images/1390886031851855880/wktTnTP3_400x400.jpg"
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <p className="text-sm  ">
                int iusto qui impedit quibusdam debitis, nobis aliquam nam,
                corporis reiciendis expedita quos saepe quasi.
              </p>
            </div>
            <MoreVertIcon className="cursor-pointer" />
          </div>
        </div>
        {/* add comments */}
        <div className="w-full p-4 flex items-center">
          <TextField
            id="standard-basic"
            fullWidth
            label="Leave a comment"
            variant="standard"
          />
          <SendIcon className="cursor-pointer " />
        </div>
      </div>
    </div>
  );
};

export default Post;
