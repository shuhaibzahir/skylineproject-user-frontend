 
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Locations from "./LocationTaking"
const useStyles = makeStyles((theme)=>({

    inputfull:{
        width:"90%",
    }

}));

const Register = () => {
   const classes = useStyles();
   return (
        <div className="flex">
            <div className="flex-1 h-screen bg-signin  bg-cover bg-no-repeat">
             </div>
                
            <div className="flex-3  ">
                {/* form div */}
                <div className="relative flex justify-center">
                <div className=" flex items-center w-1/2   relative flex-col justify-center  space-y-4 h-screen p-6">
                <div className="space-x-4 ">
                   <TextField id="outlined-basic" label="Username" variant="outlined" />
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                  </div>
                 
                  <TextField id="outlined-basic" className={classes.inputfull}   label="Outlined" variant="outlined" />
                  <TextField id="outlined-basic" className={classes.inputfull}   label="Outlined" variant="outlined" />
                    <div style={{width:"90%"}}>
                    <Locations   className={classes.inputfull}/>
                    </div>
                  
                  
                </div>
                </div>
            
          
            </div>            
        </div>
    )
}

export default Register
