import axios from 'axios'
import React,{useState,useEffect,useRef} from 'react'
import {BiSearchAlt} from 'react-icons/bi'
import {Link } from "react-router-dom"
import { decryptData } from "../../../Middleware/crypto"; 
import validator from 'validator';
const Left = ({flex}) => {
    let checkUserData = localStorage.getItem("userChecking")
    let decryptedUserDetails = decryptData(checkUserData)


    const [searchResult, setSearchResult] = useState([])
 
    const [resultBox, setResultBox] =useState(false)

    const searchingInput=(e)=>{
        let value = e.target.value
        let check = validator.isLength(value,{min:3})
        console.log(check)
        let valueExist = value.replaceAll(" ","")
         if(valueExist.length ===0){
            setResultBox(false)
            setSearchResult(()=>[])
            return
         }else{
            axios.get(`/api/search/result?key=${value}`,{
                headers:{
                    'Authorization':`Bearer ${decryptedUserDetails.token}`
                  
                  }
            }).then((result)=>{
                let data = result.data.result
                if(data.length==0){
                    setResultBox(false)
                    setSearchResult(()=>[])
                }else{
                    setResultBox(true)
                    setSearchResult(()=>[...data])
                }
              
                
            })
         }
    }



    return (
        <div className={`${flex}  `}>
            <div className="flex   h-16  rounded-2xl px-3  w-full justify-around items-center">
            <h1 className="mr-2 font-main text-pink text-4xl font-bold cursor-pointer">skyline</h1>
           
           <div className=" flex items-center rounded-full bg-white-100 px-4" >
               <BiSearchAlt size="1.5rem" className="text-dark-gray"/>
               <input onChange={(e)=>searchingInput(e)} className=" px-4 py-2 text-pink bg-transparent focus:outline-none" placeholder="search post, company.." type="text" />
             
            </div>
            </div>
          <div className={`bg-pink   absolute  rounded-2xl p-4    w-1/4 ${resultBox?'':'hidden'}`}>

              {searchResult.map((i)=>{
                 return <Link to={`/user/profile/${i._id}`}  >
                  <div className="flex items-center cursor-pointer rounded-full bg-white-100 p-2 m-2 space-x-3">
                       <img src={i.photo} className="w-8 h-8 rounded-full" alt="" />
                        <h1>{i.username}</h1>
                   </div>
                   </Link>
              })}
         
            

          </div>
            
           
    
         </div>

    )
}

export default Left
