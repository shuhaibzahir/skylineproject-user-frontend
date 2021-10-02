import React,{useContext} from 'react'
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import UserContext from "../../Contexts/userDetails"
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/EditLocationAlt';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
const Input = styled('input')({
    display: 'none',
  });
const ProfileDiv = () => {
    let checkUserData = localStorage.getItem("userChecking")
    checkUserData = checkUserData?JSON.parse(checkUserData):null
    return (
        <div className="shadow p-4 rounded-2xl relative ">
           <div className="h-48 overflow-hidden flex items-center rounded-2xl">
               <img src="https://previews.123rf.com/images/artshock/artshock1210/artshock121000046/15557821-imag-of-water-drops-on-window-and-blue-sky-background.jpg" className="w-full  " alt="" />
              
           </div>
          <div className="rounded-2xl flex items-center  ">
             <img src="https://thumbs.dreamstime.com/b/planet-earth-blue-human-eye-image-represents-56099889.jpg" className="w-36 h-36 rounded-full shadow-inside -mt-20 ml-5" alt="" />
             <div className="p-3 flex justify-between w-full items-center ">
             <div>
             <h1 className="text-xl text-pink font-bold">{checkUserData.user?.username ||''}</h1>
             <p className="w-26">{`${checkUserData?.user?.constructorPower&&checkUserData.user.services.join(" ")}`}</p>
             </div>
            <Button variant="outlined" endIcon={<EditIcon/>} >Edit Profile</Button>
 
            </div>
            </div>
           <div className=" inline absolute -mt-20 ml-4">
           <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                  <IconButton color="primary" aria-label="upload picture" component="span">
                  <AddAPhotoIcon />
                 </IconButton>
            </label>
             </div>

        </div>
    )
}

export default ProfileDiv
