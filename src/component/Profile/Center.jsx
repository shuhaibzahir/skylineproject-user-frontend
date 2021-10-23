import React, { useContext, useEffect, useState } from "react";
import ProfileDiv from "./ProfileDiv";
import userContext from "../../Contexts/userDetails";
import axios from "axios";
import Posts from "../feeds/Post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decryptData, encryptData } from "../../Middleware/crypto";
import EditPost from "../EditPost/EditPost"
const Feeds = ({ flex }) => {
  const { userDataFromDatabase } = useContext(userContext)
  let checkUserData = localStorage.getItem("userChecking");
  let decryptedUserDetails = decryptData(checkUserData);


  let [userPost, setUserPost] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editModalData , setEditMOdalData] = useState(null)
  const editModalClose = () => {
    setEditMOdalData(null)
    setEditModal(false); 

  };
 
 

  // delete post
  const deletePost = (postId) => {
    axios
      .delete(`https://skyline.shuhaib.host/server/api/post/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${decryptedUserDetails.token}`,
        },
      })
      .then((response) => {
        toast.success("Post Successfully Deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setUserPost((prev) => {
          return prev.filter((i) => i._id !== postId);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  // get own posts
  useEffect(() => {
    axios
      .get("https://skyline.shuhaib.host/server/api//user/own/post", {
        headers: {
          Authorization: `Bearer ${decryptedUserDetails.token}`,
        },
      })
      .then((response) => {
        setUserPost(response.data.posts);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);



  // update post 
   // edit post modal

   const editPost =(editPostData)=>{
    setEditMOdalData(editPostData)
    setEditModal(true)
  }

  // updatePost 
  
  const updatePost =(data)=>{
      axios.put(`https://skyline.shuhaib.host/server/api/post/edit/${data.postId}`,data,{
        headers: {
          Authorization: `Bearer ${decryptedUserDetails.token}`,
        },
      }).then((response)=>{
     toast.success('Post Successfully Updated', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        
          setUserPost(()=>{
          return userPost.map(i=>{return i._id==data.postId?{title:data.title,content:data.content,...i}:i})
          
          })
          editModalClose()
      }).catch(err=>{
        console.log(err)
      })
  }

  return (
    <div className={`${flex} min-h-withoutHeader w-full`}>
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
      <div className="p-6 ml-6 w-full ">
        <div className="bg-re-400">
        
          <ProfileDiv userPost={userPost} />
        </div>
        {userPost.map((p,index) => (
            <Posts postData={p} deletePost={deletePost} editPost={editPost} key={index} />
        ))}
      </div>
      {editModalData&&<EditPost  updatePost={updatePost} editMOdalOpen={editModal} editModalClose={editModalClose} modalData={editModalData}/>}
    </div>
  );
};

export default Feeds;
