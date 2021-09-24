 
import React, { useState,useContext ,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Locations from "./LocationTaking"
import {AiOutlineLogin} from "react-icons/ai"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import validator from 'validator';
import SendIcon from '@mui/icons-material/Send';
import axios  from 'axios';
import userContext from "../../Contexts/userDetails"

// makestyle........................................
const useStyles = makeStyles((theme)=>({
    
    inputfull:{
        width:"90%",
        '& label.Mui-focused': {
            color: '#152D35',
          },
           
    },
    textColor:{
        '& label.Mui-focused': {
            color: '#152D35',
          },
    },
  


}));


// create theme
const theme = createTheme({
    palette:{
        primary:{
            main:"#9D9D9D"
        },
       
    }
})


// validation useStates.....................
const Register = () => {
    let history = useHistory()
    const {userDataFromDatabase,setUserDataFromServer}= useContext(userContext)
   const classes = useStyles();
   const [signin, setSignin]= useState(true)
   const [  usernameValidate,setUserNameVallidate]= useState(false)
   const [  passwordValidate,setPasswordValidate]= useState(false)
   const [  confirmPassValidate,setConfirmPassValidate]= useState(false)
   const [  phoneNumberValidate,setPhoneNumberValidate]= useState(false)
   const [  emailValidation,setEmailValidation]= useState(false)
 
    useEffect(() => {
        if(userDataFromDatabase){
            history.push('/')
        }
    }, [userDataFromDatabase])

   const [signUpData, setSingupData] = useState({
       username:'',
       email:'',
       phone:'',
       password:'',
       confirmPassword:'',
       preferredLocation:''
   }) 






//update setSignupdata.............................

const updateData=(e)=>{
    let name = e.target.name
    let value = e.target.value
    setSingupData((prev)=>{
        return{...prev,[name]:value}
    })
}


//   validation ..............................
   const checkUserName = (e)=>{
    
      let validation = validator.isAlpha(e.target.value, 'en-US', {ignore:' '})
      if(validation){
        setUserNameVallidate(false)
      }else{
        setUserNameVallidate(true)
      }
      updateData(e)
   }

   const checkEmail = (e)=>{
    let validation = validator.isEmail(e.target.value)
    if(validation){
        setEmailValidation(false)
    }else{
        setEmailValidation(true)
    }
    updateData(e)
 }

 const phoeNumber = (e)=>{
    let validation = validator.isNumeric(e.target.value)
    let checkLength = validator.isLength(e.target.value,{min:10, max:10})
    if(validation&&checkLength){
        setPhoneNumberValidate(false)
    }else{
        setPhoneNumberValidate(true)
    }
    updateData(e)
 }

 const passwordVal = (e)=>{
     let exist = validator.isEmpty(e.target.value)
    let validation = validator.isLength(e.target.value,{min:4})
    if(validation&&exist===false){
        setPasswordValidate(false)
    }else{
        setPasswordValidate(true)
    }
    updateData(e)
 }

 const confirmPassword =(e)=>{
     if(signUpData.password===e.target.value){
        setConfirmPassValidate(false)
     }else{
        setConfirmPassValidate(true)
     }
     updateData(e)
 }



 // api calling.................................................
    const [apierror ,setApierror]=useState()

   const signupApiCalling= ()=>{
    setApierror('')
    if(!signUpData.username){
        setUserNameVallidate(true)
        return
    }   
    if(!signUpData.password){
        setPasswordValidate(true)
        return
    } 
    if(!signUpData.confirmPassword){
        setConfirmPassValidate(true)
        return
    } 

    if(signUpData.preferredLocation.length===0){
        alert("please Select Perfered location")
       
    }  else if(!usernameValidate&&!passwordValidate&&!confirmPassValidate&&!phoneNumberValidate&&!emailValidation&&signUpData.preferredLocation.length >0){
            // data passing to backend

        axios.post("/userSignup",signUpData,{
            headers: { 
                'content-type': 'application/json'
             },
        }).then((response)=>{
            console.log('data evide ethi')
            setUserDataFromServer(response.data)
            history.push("/")
        }).catch((err)=>{
          
            console.log("error found")
            let errors = err.response.data.error
            let apierror = err.response.data.apiError
             if(errors){
                errors.error.forEach((i)=>{
                    if(i.phone){
                        setPhoneNumberValidate(true)
                    }else if(i.email){
                        setEmailValidation(true)
                    } 
                })
            }
            if(apierror){
                setApierror(apierror)
             }

        })

      }else{
        alert('please Enter Details') 
      } 
   }
    
   

//   final return ............................... 
if(!userDataFromDatabase){
    return (
        <ThemeProvider theme={theme}>
         <div className="flex">
             <div className="flex-1 h-screen bg-signin relative bg-cover bg-no-repeat">
                 <div className={` ${signin?"bg-pink bg-opacity-60":"bg-black bg-opacity-60"} text-center flex items-center  flex-col  justify-center space-y-5 h-screen w-full absolute top-0 left-0 p-6`}> 
                     <h1 className="text-white font-main text-5xl">Skyline</h1>
                     <h1 className="text-white text-3xl "> {signin?"Open":"Hurry up !"} <br /> Door to Your Greate Dream</h1>
                 </div>
              </div>
                 
             <div className="flex-3 bg-white-100 ">
                 {/* form div */}
                {signin?( <div className="relative flex justify-center">
                     
                     <div className=" flex items-center w-1/2   relative flex-col justify-center  space-y-5 h-screen p-6">
                       <h1 className="text-2xl" > Sign In to <span className="text-pink capitalize font-bold">skyline</span> </h1>
     
                     
                       <TextField id="outlined-email"    className={classes.inputfull}   label="Email or phone number" variant="outlined" />
                       <TextField id="outlined-pass"    className={classes.inputfull}   label="Password" variant="outlined" />
                       
                         <div className="w-full px-7  flex items-center justify-between">
                         <Button variant="contained" style={{backgroundColor:"#FF005C", color:"#ffff" }} endIcon={<SendIcon  />}> Sign In</Button>
                         <p className="  ml-4">Doesn't have an account? <AiOutlineLogin onClick={()=>{setSignin(!signin)}} className="inline ml-4 text-dark-gray hover:text-pink cursor-pointer"  size="1.6rem "/></p>           
                         </div>
                      
                        
                       
                     </div>
                     </div>):
                     ( <div className="relative flex justify-center">
                     
                     <div className=" flex items-center w-1/2   relative flex-col justify-center  space-y-5 h-screen p-6">
                       <h1 className="text-2xl" > Sign up to <span className="text-pink capitalize font-bold">skyline</span> </h1>
     
                      <div className="space-x-4 ">
                       
                        <TextField id="outlined-username" name="username" value={signUpData.username} className={classes.textColor} error={usernameValidate} onChange={(e)=>{checkUserName(e)}} label={`${usernameValidate?"Invalid UserName":"Username"}`} variant="outlined" />
                         
                         <TextField id="outlined-email" name="email" value={signUpData.email} className={classes.textColor} error={emailValidation} onChange={(e)=>{checkEmail(e)}} label={`${emailValidation?"Invalid Email":"Email"}`} variant="outlined" />
                       </div>
                       <TextField id="outlined-phone" name="phone" value={signUpData.phone}  className={classes.inputfull} error={phoneNumberValidate}  onChange={(e)=>{phoeNumber(e)}} label={`${phoneNumberValidate?"Invalid Phone Number":"Phone Number"}`} variant="outlined" />
                       <TextField id="outlined-password"  name="password" value={signUpData.password}  className={classes.inputfull} error={passwordValidate} onChange={(e)=>{passwordVal(e)}}  label={`${passwordValidate?"Enter at least 4 characters":"password"}`} variant="outlined" />
                       <TextField id="outlined-cpass"   name="confirmPassword" value={signUpData.confirmPassword} className={classes.inputfull}  error={confirmPassValidate} onChange={(e)=>{confirmPassword(e)}} label={`${confirmPassValidate?"Password didn't match":"Confrim Password"}`} variant="outlined" />
                         <div style={{width:"90%"}}>
                         <Locations locationDetails={setSingupData}  />
                         </div>
                         <p className="text-red-400">{apierror||''}</p>
                         <div className="w-full px-7  flex items-center justify-between">
                         <Button variant="contained" style={{color:"#ffff"}} onClick={()=>{signupApiCalling()}} endIcon={<SendIcon />}> Sign Up</Button>
                         <p className="  ml-4">Do you have already account? <AiOutlineLogin  onClick={()=>{setSignin(!signin)}}  className="inline ml-4 text-dark-gray hover:text-pink cursor-pointer"  size="1.6rem "/></p>           
                         </div>
                      
                        
                       
                     </div>
                     </div>) 
                       }
              </div>            
         </div>
         </ThemeProvider>
     )
}else{
    history.push("/")
    return true
}
  
}

export default Register
