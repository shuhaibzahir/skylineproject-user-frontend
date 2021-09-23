import React ,{useState} from 'react';
 
 
import {
    geocodeByAddress,
    
  } from 'react-places-autocomplete';
 
  import Checkbox from '@mui/material/Checkbox';
  import TextField from '@mui/material/TextField';
  import Autocomplete from '@mui/material/Autocomplete';
  import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
  import CheckBoxIcon from '@mui/icons-material/CheckBox';
  
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  
  export default function CheckboxesTags({locationDetails} ) {
   
    const [selectLocation,setLocation]=useState([])
 
    const getAllLocation=async (input)=>{
      geocodeByAddress(input).then((result)=>{
        setLocation( result[0].address_components)
      }).catch((er)=>{
        console.log(er)
      })
    
     
    }
    return (
    
        <Autocomplete
        onChange={(e,value)=>{
          locationDetails((prev)=>{
            return{
              ...prev,
              preferredLocation:value.map((i)=>i.long_name)
            }
          })
        }}
        
        multiple
        id="checkboxes-tags-demo"
        options={selectLocation}
        disableCloseOnSelect
        getOptionLabel={(option) => option.long_name}
        renderOption={(props, option, { selected }) => (
           <li   {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.long_name}
          </li>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField   {...params} label="Select Prefered Locations" placeholder="Locations"  onChange={(e)=>{getAllLocation(e.target.value)}} />
        )}
      />
       
    )
  }
  
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
 