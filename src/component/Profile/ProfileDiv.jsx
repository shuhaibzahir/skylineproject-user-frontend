import React, { useContext, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import UserContext from "../../Contexts/userDetails";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/EditLocationAlt";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { decryptData,encryptData } from "../../Middleware/crypto";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";


const Input = styled("input")({
  display: "none",
});

const ProfileDiv = ({userPost}) => {
   
  let checkUserData = localStorage.getItem("userChecking");
  let decryptedUserDetails = decryptData(checkUserData);
 
 
  const [image, setImage] = useState();
  const [keepUpdateImage ,setKeepUpdate] = useState('')
  const [editProfileButtonOrProfileUpdate, setButton] = useState(false);
 const [followers,setFollowers] = useState([])
 const [ following, setFollowing] = useState([])
  const [progress,setProgress] =useState(false)
  useEffect(()=>{
    axios.get("/api/user/info",{
      headers:{
        'Authorization':`Bearer ${decryptedUserDetails.token}`
      }
    }).then((response)=>{
      console.log(response, "----------------------")
      let checkUserData = localStorage.getItem("userChecking");
      let decryptedUserDetails = decryptData(checkUserData);
      const newUserData = {...response.data.userData}
    
      let newData = {user:newUserData,...decryptedUserDetails}
     
      let encryptedData = encryptData(newData)
      localStorage.setItem("userChecking",encryptedData)
      let profilePhoto= response.data.user.photo || ''
      
      setImage(profilePhoto)
     
    }).catch((err)=>{
      console.log(err)
    })
  },[])





  const changeProfilePic = (e) => {
    let newImage = URL.createObjectURL(e.target.files[0]);
    setKeepUpdate(e.target.files[0])
    setButton(true);
    setImage(newImage);
  };

  const cancelUpdateProfilePic =()=>{
    let checkUserData = localStorage.getItem("userChecking");
    let decryptedUserDetails = decryptData(checkUserData);
   
    const updateOld = decryptedUserDetails.user.photo 
    setImage(updateOld);
    setButton(false)
  }
// updating profile photo
  const updateProfilePhoto = ()=>{
    setButton(false);
    setProgress(true)
    let newform = new FormData()
 
    newform.append("file",keepUpdateImage)
    console.log(newform)
     axios.put("/api/profile-pic/upload",newform,{
      headers:{
        'Authorization':`Bearer ${decryptedUserDetails.token}`
      
      }
     }).then((response)=>{
      
      toast("Profile Picture Updated!")
      setProgress(false)
      const newUserData = {...response.data.user}
      let checkUserData = localStorage.getItem("userChecking");
      let decryptedUserDetails = decryptData(checkUserData);
      
      let newData = { user:newUserData,...decryptedUserDetails}
   
      let encryptedData = encryptData(newData)
      localStorage.setItem("userChecking",encryptedData)
      setImage(response.data.user.photo)

     }).catch((err)=>{
      toast("try agin later!")
      setButton(false);
      setProgress(false)
       console.log(err)
     })
  }

  useEffect(()=>{
    axios.get("/api/user/network/data",{
      headers:{
        'Authorization':`Bearer ${decryptedUserDetails.token}`
       }
    }).then((response)=>{
      let followers = response.data.result[0].followers ?response.data.result[0].followers :[]
      let folowing = response.data.result[0].following ?response.data.result[0].following: []
      setFollowers(followers)
     setFollowing(folowing)
    }).catch((err)=>{
      console.log(err)
    })
  },[])

 



 



  /*******************************  Profile Div *******************************************/
  return (
    <div className="shadow p-4 rounded-2xl relative ">
      <ToastContainer />
      <div className="h-48 overflow-hidden flex items-center rounded-2xl">
        {/* cover photo */}
        <img
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://media.istockphoto.com/photos/colorful-gradient-pink-magenta-abstract-background-picture-id1059836414?k=20&m=1059836414&s=170667a&w=0&h=5WVpLbctBNZo406v7r8UmuuPbkyE-lwhDcJTfqgP_hE=";
          }}
          src=""
          className="w-full  "
          alt=""
        />
      </div>
      <div className="rounded-2xl flex items-center  ">
        {/* profile photo */}
        <img
          onError={(e) => {
            e.target.onerror = null;
            e.target.src ="https://global-uploads.webflow.com/5e4627609401e01182af1cce/5eb13bfdb4659efea4f8dace_profile-dummy.png";
          }}
          src={image}
          className="w-36 h-36 rounded-full  -mt-20 ml-5"
          alt=""
        />

        <div className="p-3 flex justify-between w-full items-center ">
          <div>
            <h1 className="text-xl text-pink font-bold">
              {decryptedUserDetails.user?.username || ""}
            </h1>
            <p className="w-26">{`${
              decryptedUserDetails.user.constructorPower
                ? decryptedUserDetails.user.services.join(" ")
                : ""
            }`}</p>
          </div>

          {/* updat profile pic or edit profile button */}
          {editProfileButtonOrProfileUpdate ? (
            <ButtonGroup
              variant="outlined"
              
            >
              <Button onClick={()=>{updateProfilePhoto()}}><CheckCircleIcon/></Button>
              <Button onClick={()=>{cancelUpdateProfilePic()}} color="error"><HighlightOffIcon/></Button>
             
            </ButtonGroup>
          ) : (
            <Button variant="outlined" endIcon={<EditIcon />}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>
      <div className=" inline absolute bg-white-100 rounded-full -mt-10 ml-3">
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            onChange={(e) => changeProfilePic(e)}
            id="icon-button-file"
            type="file"
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <AddAPhotoIcon />
          </IconButton>
        </label>
      </div>
      <div className="shadow bg-pink text-white flex text-center p-3 rounded-3xl mt-3 items-center justify-around">
         <div>
            <p>Followers</p>
            <p>{ followers.length}</p>
         </div>
         <div>
            <p>Following</p>
            <p>{following.length}</p>
         </div>
         <div>
            <p>Posts</p>
            <p>{userPost.length}</p>
         </div>
      </div>
     <div className={`w-full mt-3 ${!progress&&"hidden"}`}>
     <LinearProgress/>
     </div>
    </div>
  );
};

export default ProfileDiv;
