import React, { useState,useRef,useEffect } from "react";
import {Link} from "react-router-dom"
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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AllComments from "../AllComments/AllComments"

const Post = ({ postData  }) => {
  // take the user details

  let checkUserData = localStorage.getItem("userChecking");
  let decrypedUserDetails = decryptData(checkUserData);


 const [singlePost,setPostData] =useState(postData)


  // add comment
  let commentFromBackend = postData.comments || [];
 
  const [comments, setComments] = useState(commentFromBackend);
  const [userComment, setUserComment] = useState();



  //  view all comments
const [commentModalOpen, setCommentMOdalOpen] = useState(false);
 
const CommentModalClose = () => {
  setCommentMOdalOpen(false)
 

};

const openAllComment =()=>{
  setCommentMOdalOpen(true)
   
}


   

 // the menu options
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [commentEl, setCommentEl] = useState(null);
  const openCommentDelete = Boolean(commentEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const deleteCommentOption = (event) => {
    setCommentEl(event.currentTarget);
  };

  const deleteCommentClose = (event) => {
    setCommentEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



    // delete Comment
    const deleteComment = (data) => {

      axios.put(`http://localhost:4040/api/delete/comment/${postData._id}/${data._id}`,{},  {
        headers: {
          Authorization: `Bearer ${decrypedUserDetails.token}`,
        },
      }).then((response)=>{
        toast.success('Comment Deleted !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        setComments((prev)=>{
          return prev.filter((i)=>i._id!==data._id)
        })
      })
    
    };
  

  // check media to react player or image
  const checkMediaVideOrPhoto = () => {
    if (singlePost.videoType) {
      return (
        <div className="flex justify-center">
          <ReactPlayer
            controls={true}
            width="100%"
            url={singlePost.mediaLink}
          />
        </div>
      );
    } else if (singlePost.imageType) {
      return (
        <div className="flex justify-center">
          <img src={singlePost.mediaLink} alt="" />
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

  //  liked or not

  const checKingLikedOrNot = (likedData) => {
    let length = likedData.length;
    let check = likedData.findIndex((i) => i == decrypedUserDetails.user._id);
    if (check !== -1) {
      return (
        <>
          <FavoriteIcon
            className="cursor-pointer "
            color="error"
            fontSize="string"
            onClick={() => unlike()}
          />
          <span className="text-sm">{length}</span>
        </>
      );
    } else {
      return (
        <>
          <FavoriteBorderIcon
            className="cursor-pointer "
            fontSize="string"
            onClick={() => likePost()}
          />
          <span className="text-sm">{length}</span>
        </>
      );
    }
  };

  // unlike function
  const unlike = () => {
    axios
      .put(
        `http://localhost:4040/api/post/dislike/${singlePost._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${decrypedUserDetails.token}`,
          },
        }
      )
      .then((response) => {
        setPostData((prev) => {
          let like = prev.like.filter(
            (i) => i !== decrypedUserDetails.user._id
          );

          return { ...prev, like };
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  // like post

  const likePost = () => {
    axios
      .put(
        `http://localhost:4040/api/post/like/${singlePost._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${decrypedUserDetails.token}`,
          },
        }
      )
      .then((response) => {
        setPostData((prev) => {
          let like = [...prev.like];
          like.push(decrypedUserDetails.user._id);

          return { ...prev, like: like };
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  // scroll to bottm 
  const commentAdded = useRef(null)
 
  useEffect(() => {
    if (commentAdded) {
      commentAdded.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [comments])

  // addComment

  const addCommentToPost = (postData) => {
    console.log(postData)
    if (userComment.replaceAll(" ", "").length > 1) {
      axios
        .put(
          `http://localhost:4040/api/post/add/comment/${postData._id}`,
          { comment: userComment },
          {
            headers: {
              Authorization: `Bearer ${decrypedUserDetails.token}`,
            },
          }
        )
        .then((response) => {
          let newComment = response.data.result
          setUserComment('')
          setComments((prev)=>{
            return [...prev,newComment]
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <div className="shadow  rounded-2xl mb-10 p-4">
        <div className="p-3 flex justify-between items-center ">
          <Link to={`/user/profile/${postData.user}`} > 
          <div className=" space-x-4 flex items-center">
            <img
              src="https://pbs.twimg.com/profile_images/1390886031851855880/wktTnTP3_400x400.jpg"
              className="w-12 h-12  rounded-full"
              alt=""
            />
            <div className="text-sm text-dark-gray">
              <p>shuhaib</p>
              {checkTheDatePosted(singlePost.date)}
            </div>
          </div>
          </Link>
         
        </div>
        {/* content part */}
        <div className="p-4  mb-4">
          <h1 className="text-lg mb-2">{singlePost.title}</h1>
          <p className="text-gray-700">{singlePost.content}</p>
        </div>

        {/* media part */}

        {checkMediaVideOrPhoto()}

        {/* options  */}

        <div className="flex justify-between  p-4">
          <div className="space-x-3 text-3xl ">
            {checKingLikedOrNot(singlePost.like)}

            <ChatBubbleOutlineIcon
              className="cursor-pointer"
              fontSize="string"
              onClick={()=>openAllComment()}
            />
            <span className="text-sm cursor-pointer" onClick={()=>openAllComment()} >View All</span>
          </div>
          <BookmarkBorderIcon
            className="cursor-pointer text-3xl"
            fontSize="string"
          />
        </div>
        {/* comments */}
        <div className=" max-h-40 overflow-auto" ref={commentAdded}>
        {comments.map((i)=> <div className=" p-2 ">
        <div className="flex  bg-white-100 items-center p-5 rounded-2xl rounded-bl-none justify-between">
        <div className="flex space-x-2">
          <img
            src="https://pbs.twimg.com/profile_images/1390886031851855880/wktTnTP3_400x400.jpg"
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <p className="text-sm  ">
             {i.comment}
          </p>
        </div>
        <Menu
            anchorEl={commentEl}
            open={openCommentDelete}
            onClose={deleteCommentClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={()=>{
           deleteCommentClose();
           deleteComment(i);
         }}>Delete</MenuItem>
          </Menu>
        {i.user==decrypedUserDetails.user._id&&<MoreVertIcon className="cursor-pointer"  onClick={deleteCommentOption} />}
        </div>
      </div>)}
        </div>


        {/* add comments */}
        <div className="w-full p-4 flex items-center">
          <TextField
            id="standard-basic"
            fullWidth
            label="Leave a comment"
            variant="standard"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
          <SendIcon className="cursor-pointer " onClick={()=>addCommentToPost(postData)} />
        </div>
      </div>
      <AllComments commentMOdalOpen={commentModalOpen} commentMOdalClose={CommentModalClose} comments={comments} />
    </div>
  );
};

export default Post;
