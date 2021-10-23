import React,{useState} from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import axios from "axios"
import { decryptData,encryptData } from "../../Middleware/crypto";
 
import DoneAllIcon from '@mui/icons-material/DoneAll';
const Recomended = ({ data, changeState }) => {
  let checkUserData = localStorage.getItem("userChecking");
  let decryptedUserDetails = decryptData(checkUserData);

  const [follow, setFollow] = useState(false)
  const [loading,setLoading] = useState(false)


  // following 
  const followAuser = (userId)=>{
    setLoading(true)
    axios.put(`https://skyline.shuhaib.host/server/api/follow/user/${userId}`,{},{
      headers:{
        'Authorization':`Bearer ${decryptedUserDetails.token}`
      
      }
    }).then((response)=>{
      setLoading(false)
      
      setFollow(true)
    }).catch((err)=>{
      setLoading(false)
      console.log(err)
    })
  }


// unFollow 

const unFollow =(userId)=>{
  setLoading(true)
  axios.put(`https://skyline.shuhaib.host/server/api/unfollow/user/${userId}`,{},{
    headers:{
      'Authorization':`Bearer ${decryptedUserDetails.token}`
    
    }
  }).then((response)=>{
    setLoading(false)
    
    setFollow(false)
  }).catch((err)=>{
    setLoading(false)
    
  })
}


  return (
    <div className="flex justify-between items-center bg-white-100 p-4 rounded-2xl">
      <img
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://media.istockphoto.com/photos/colorful-gradient-pink-magenta-abstract-background-picture-id1059836414?k=20&m=1059836414&s=170667a&w=0&h=5WVpLbctBNZo406v7r8UmuuPbkyE-lwhDcJTfqgP_hE=";
        }}
        src={data.photo}
        className="h-10 w-10 rounded-full"
        alt=""
      />
      <h3>{data.username}</h3>

      {loading?<CircularProgress color="success"/>:<IconButton >
      {follow?<DoneAllIcon color="error" onClick={()=>unFollow(data._id)}/>: <PersonAddIcon onClick={()=>followAuser(data._id)} className/>} 
      </IconButton>}
      
    </div>
  );
};

export default Recomended;
