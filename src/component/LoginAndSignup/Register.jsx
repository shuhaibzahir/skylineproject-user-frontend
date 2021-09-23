 
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Locations from "./LocationTaking"
import {AiOutlineLogin} from "react-icons/ai"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import validator from 'validator';
import SendIcon from '@mui/icons-material/Send';
const useStyles = makeStyles((theme)=>({

    inputfull:{
        width:"90%",
        '& label.Mui-focused': {
            color: 'gray',
          },
           
    },
    textColor:{
        '& label.Mui-focused': {
            color: 'gray',
          },
    }

}));

const theme = createTheme({
    palette:{
        primary:{
            main:"#FF005C"
        }
    }
})
const Register = () => {
   const classes = useStyles();
   const [signin, setSignin]= useState(true)
   const [  usernameValidate,setUserNameVallidate]= useState(false)
   const [  passwordValidate,setPasswordValidate]= useState(false)
   const [  confirmPassValidate,setConfirmPassValidate]= useState(false)
   const [  phoneNumberValidate,setPhoneNumberValidate]= useState(false)

   const [signUpData, setSingupData] = useState({
       username:'',
       email:'',
       password:'',
       confirmPassword:'',
       preferredLocation:''
   }) 



//    validation 
   const checkUserName = (e)=>{
      let validation = validator.isAlpha(e.target.value, 'en-US', {ignore:' '})
      if(validation){
        setUserNameVallidate(false)
      }else{
        setUserNameVallidate(true)
      }
   }


 
   const check= ()=>{
       console.log(signUpData.preferredLocation.join())
   }
    
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
                        <Button variant="contained" style={{backgroundColor:"#FF005C",  }} endIcon={<SendIcon  />}> Sign In</Button>
                        <p className="  ml-4">Doesn't have an account? <AiOutlineLogin onClick={()=>{setSignin(!signin)}} className="inline ml-4 text-dark-gray hover:text-pink cursor-pointer"  size="1.6rem "/></p>           
                        </div>
                     
                       
                      
                    </div>
                    </div>):
                    ( <div className="relative flex justify-center">
                    
                    <div className=" flex items-center w-1/2   relative flex-col justify-center  space-y-5 h-screen p-6">
                      <h1 className="text-2xl" > Sign up to <span className="text-pink capitalize font-bold">skyline</span> </h1>
    
                     <div className="space-x-4 ">
                      
                       <TextField id="outlined-username" className={classes.textColor} error={usernameValidate} onChange={(e)=>{checkUserName(e)}} label="Username" variant="outlined" />
                        {usernameValidate&&<p>Please enter name</p>}
                        <TextField id="outlined-email" className={classes.textColor}  label="Email" variant="outlined" />
                      </div>
                      <TextField id="outlined-phone" className={classes.inputfull}   label="Phone Number" variant="outlined" />
                      <TextField id="outlined-password" className={classes.inputfull}   label="Password" variant="outlined" />
                      <TextField id="outlined-cpass" className={classes.inputfull}   label="Confirm Password" variant="outlined" />
                        <div style={{width:"90%"}}>
                        <Locations locationDetails={setSingupData}  />
                        </div>
                        <div className="w-full px-7  flex items-center justify-between">
                        <Button variant="contained" style={{backgroundColor:"#FF005C",  }} onClick={()=>{check()}} endIcon={<SendIcon />}> Sign Up</Button>
                        <p className="  ml-4">Do you have already account? <AiOutlineLogin  onClick={()=>{setSignin(!signin)}}  className="inline ml-4 text-dark-gray hover:text-pink cursor-pointer"  size="1.6rem "/></p>           
                        </div>
                     
                       
                      
                    </div>
                    </div>) 
                    
                    
                    
                    }
               
            
          
            </div>            
        </div>
        </ThemeProvider>
    )
}

export default Register
