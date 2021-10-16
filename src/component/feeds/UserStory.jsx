import React, { useRef, useState } from "react";

import { styled } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
import { decryptData, encryptData } from "../../Middleware/crypto";
import StoryViewModal from "./StoryViewModal"
const Input = styled("input")({
  display: "none",
});

const UserStory = ({existStory,setUserStory}) => {
  let checkUserData = localStorage.getItem("userChecking");
  let decryptedUserDetails = decryptData(checkUserData);
  const inputRef = useRef(null);
  const [storyFile, setStory] = useState("");
  const [storyBlob, setStoryBlob] = useState("");

  const SelectTheFile = (e) => {
    let file = e.target.files[0];
    setStory(file);
    let imageBlob = URL.createObjectURL(file);
    setStoryBlob(imageBlob);
  };

  const clickTheButton = () => {
    inputRef.current.click();
  };

  const cancelTheStory = () => {
    setStory(null);
    setStoryBlob(null);
  };

  const createStory = () => {
    let formData = new FormData();
    formData.append("file", storyFile);

    axios.post("/api/user/story/update",formData, {
      headers: {
        Authorization: `Bearer ${decryptedUserDetails.token}`,
      },
    }).then((response)=>{
      setUserStory(response.data.story)
    }).catch((err)=>{
      console.log(err)
    })
  };


 

const deleteUserStory =()=>{
  console.log("this is deleter funtion")
  axios.delete("/api/user/delete/story",{
    headers: {
      Authorization: `Bearer ${decryptedUserDetails.token}`,
    },
  }).then((response)=>{
    setUserStory(null)
    setStory(null);
    setStoryBlob(null);
  }).catch((err)=>{
    console.log(err.data)
  })
}






  //   button

  const cameraButton = (
    <IconButton color="primary" aria-label="upload picture" component="span">
      <PhotoCamera onClick={() => clickTheButton()} />
    </IconButton>
  );

  const CancelAndUpdate = (
    <ButtonGroup variant="outlined">
      <Button onClick={() => createStory()}>
        <CheckCircleIcon />
      </Button>
      <Button
        onClick={() => {
          cancelTheStory();
        }}
        color="error"
      >
        <HighlightOffIcon />
      </Button>
    </ButtonGroup>
  );


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);



if(existStory){
  return (
    <div className="">
      <div  onClick={()=>{handleOpen()}}>
        <img
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://launchfulfillment.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg";
            }}
          src={existStory.imageLink}
          className={` border-white-100 border-4 h-24 w-24  cursor-pointer rounded-full`}
          alt=""
        />
            <IconButton color="primary" aria-label="upload picture" component="span">
           <DeleteIcon onClick={() => deleteUserStory() } />
          </IconButton>
      </div>
      {existStory&&<StoryViewModal data={existStory} open={open} setOpen={setOpen} handleOpen={handleOpen}/>}
    </div>
  );
}else{
  return (
    <div className="">
      <div>
        <img
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://launchfulfillment.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg";
          }}
          src={storyBlob}
          className={` border-white-100 border-4 h-24 w-24  cursor-pointer rounded-full`}
          alt=""
        />
        <Input
          accept="image/*"
          ref={inputRef}
          onChange={SelectTheFile}
          id="icon-button-file"
          type="file"
        />

        {storyBlob ? CancelAndUpdate : cameraButton}
      </div>
     
    </div>
  );
}

};

export default UserStory;
