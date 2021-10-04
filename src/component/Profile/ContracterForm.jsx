import React ,{useContext, useState} from 'react'
import TextField from '@mui/material/TextField';
 import Addservice from "./AddServices"
 import SendIcon from '@mui/icons-material/Send';
 import Button from '@mui/material/Button';
 import { makeStyles } from '@mui/styles';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import UserContext from "../../Contexts/userDetails"
import {decryptData,encryptData} from "../../Middleware/crypto"

const useStyle = makeStyles({
  btn:{
    backgroundColor:"#FF005C",
 
    margin:"10px"
  }
})




const ContracterForm = ({modalClose}) => {
  const {userDataFromDatabase,setUserDataFromServer} =useContext(UserContext)
  let checkUserData = localStorage.getItem("userChecking")
   let decryptedUserDetails = decryptData(checkUserData)
  const classes = useStyle()
  const [services, setServices] = useState([]);
  const [fieldError,setFieldErro]= useState('')
  const [progress, setProgress]= useState(false)
  const [constructorDetails,setContractor] =useState({
    constructorId:'',
    companyName:'',
    address:'',
    services:[]
  })
  
  // set all data to the useState
  const setAllDetails =(e)=>{
    let name =  e.target.name
    let value = e.target.value
    setContractor((i)=> {return {...i,[name]:value}})
  }

  // sending all data to the server
   const submitAllDetails =()=>{
    
    if(constructorDetails.constructorId.length <=4){
      setFieldErro("Invalid Constructor Id")
      return
    }else if(constructorDetails.companyName.length <=2){
      setFieldErro("Invalid Company Name")
      return
    }else if(constructorDetails.address.length <=4){
      setFieldErro("Invalid Address")
      return
    }else if(constructorDetails.services.length==0){
     
      setFieldErro("Please Select Services")
      return
    } 
    
     
    setFieldErro('')
    // api sending 
    setProgress(true)
    axios.put("/api/constructor/apply/",constructorDetails,{
      headers:{
        'Authorization':`Bearer ${decryptedUserDetails.token}`
      }
    }).then((response)=>{
      setProgress(false)
      let storageData = localStorage.getItem("userChecking")
       let decryptingData  = decryptData(storageData) 
       
        let newData = {...decryptingData,user:response.data.user}
        let encryptingNewData = encryptData(newData)
        localStorage.setItem("userChecking",encryptingNewData)
      modalClose()
    }).catch((error)=>{
      console.log(error)
      setFieldErro(error.data.apiError)
       console.log(error)
      
    })

   }
  return (
    <div className="">
         {progress&&<LinearProgress color="primary"/>} 
            <div className="m-3">
            <TextField id="standard-basic" name="companyName"  value={constructorDetails.companyName} onChange={setAllDetails} label="Company Name " fullWidth variant="standard" />
            </div>
            <div className="m-3">
            <TextField id="standard-basic" name="constructorId" value={constructorDetails.constructorId} onChange={setAllDetails} label="Constructor Id " fullWidth variant="standard" />
            </div>
            <div className="m-3">
            <TextField id="standard-basic" name="address"  value={constructorDetails.address} onChange={setAllDetails} label="Address " fullWidth variant="standard" />
            </div>
              <div className=" -ml-3">
               <Addservice setServices={setServices} services={services} setContractor={setContractor}/>
             </div>
             <div>
               <p className="text-red-600 m-2">{fieldError}</p>
             </div>
             <Button variant="contained" onClick={()=>{submitAllDetails()}} className={classes.btn} endIcon={<SendIcon />}>
                Apply
           </Button>
     </div>
  )
}

export default ContracterForm
