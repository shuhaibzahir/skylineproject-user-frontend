import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Stories from "./Stories";
import AddPost from "./AddPost";
import Posts from "./Post";
import { decryptData } from "../../Middleware/crypto";
import axios from "axios";
import EditPost from "../EditPost/EditPost"
const Feeds = ({ flex }) => {
  let checkUserData = localStorage.getItem("userChecking");
  let decrypedUserDetails = decryptData(checkUserData);
  const [posts, setPosts] = useState([]);
 
  const [editModal, setEditModal] = useState(false);
  const [editModalData , setEditMOdalData] = useState(null)
  const editModalClose = () => {
    setEditMOdalData(null)
    setEditModal(false); 

  };
 

  useEffect(() => {
    axios
      .get("http://localhost:4040/api/logged/get/all/post", {
        headers: {
          Authorization: `Bearer ${decrypedUserDetails.token}`,
        },
      })
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, []);


  // delete post
  const deletePost = (postId) => {
    axios
      .delete(`http://localhost:4040/api/post/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${decrypedUserDetails.token}`,
        },
      })
      .then((response) => {
        toast.success('Post Successfully Deleted', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          let deleteDated = posts.filter((i) => i._id !== postId);
          console.log("deleted and balanced ",deleteDated)
        setPosts(deleteDated);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // edit post modal

  const editPost =(editPostData)=>{
    setEditMOdalData(editPostData)
    setEditModal(true)
  }

  // updatePost 
  
  const updatePost =(data)=>{
      axios.put(`http://localhost:4040/api/post/edit/${data.postId}`,data,{
        headers: {
          Authorization: `Bearer ${decrypedUserDetails.token}`,
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
          let filterdData = posts.map(i=>{return i._id==data.postId?{title:data.title,content:data.content,...i}:i})
          setPosts(filterdData)
          editModalClose()
      }).catch(err=>{
        console.log(err)
      })
  }



  return (
    <div className={`${flex} min-h-withoutHeader  w-full`}>
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

      <div className="p-6 ml-6 w-full  ">
        <Stories />
     

        {decrypedUserDetails?.user?.constructorPower && (
          <AddPost setPosts={setPosts} />
        )}

      
       
        {posts?.length>0&&posts.map((p) => (
          <Posts postData={p} deletePost={deletePost} editPost={editPost} key={p._id} />
        ))}
      </div>

 
      {editModalData&&<EditPost  updatePost={updatePost} editMOdalOpen={editModal} editModalClose={editModalClose} modalData={editModalData}/>}
    </div>
  );
};

export default Feeds;
