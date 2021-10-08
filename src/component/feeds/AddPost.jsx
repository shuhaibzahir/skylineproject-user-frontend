import { useRef, useState, Fragment } from "react";
import { BiImageAdd, BiVideoPlus  } from "react-icons/bi";
import SendIcon from '@mui/icons-material/Send';
import { AiOutlineTags } from "react-icons/ai";
import Button from '@mui/material/Button';
import { Dialog, Transition } from "@headlessui/react";
import { decryptData,encryptData } from "../../Middleware/crypto";
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react'
import ReactPlayer from 'react-player/lazy'
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
// Lazy load the YouTube player

const AddPost = () => {


  let checkUserData = localStorage.getItem("userChecking");
  let decryptedUserDetails = decryptData(checkUserData);
  const [progress,setProgress] = useState(false)
  const fileInputPhoto = useRef(null);
  const videoInputRef = useRef(null);
  const titleRef= useRef(null)
  const contentRef = useRef(null)
  const [cancelButton, setCancelButton] = useState(false)
  const [blobUr,setBlobUrl] =useState()
  // video file useState
  const [videoFile,setVideofile]=useState(false)

   //phot file useState 
  const [photoFile,setPhotoFile]=useState(false)
  const [open, setOpen] = useState(false);


  const cancelButtonRef = useRef(null);
  const [tag, setTags] = useState('');
  const [privacy, setPrivacy] = useState('public');
 

 
 

  // selecting vide
const vidoFileOnchange =(e)=>{
  if(e.target.files[0]){
  setVideofile(true)
  setPhotoFile(false)
  setCancelButton(true)
 let selectedVideo = e.target.files[0]
 
 let blobedURL = URL.createObjectURL(selectedVideo)
 setBlobUrl(blobedURL)
  }
}

// selecting Photo

const photoFileOnchange =(e)=>{
  if(e.target.files[0]){
  setVideofile(false)
  setPhotoFile(true)
  setCancelButton(true)
  let selectedPhoto = e.target.files[0]
 
  let blobedURL = URL.createObjectURL(selectedPhoto)
  setBlobUrl(blobedURL)
  }
  
}

// clearing all data to be uploaded
const clearAllDataToPost =()=>{
  
  setCancelButton(false)
  setVideofile(false)
  setPhotoFile(false)
  setBlobUrl('')
}

// cellecting the data to the server 

const sendingTheData = ()=>{
  let mainTitle = titleRef.current.value
  let mainContent = contentRef.current.value
  let tags = tag;
  let titleExist = mainTitle.replace(" ",'')
  let contentExist =  mainContent.replace(" ",'')
   if(titleExist==false||contentExist==false){
    alert("please Enter some data")
   return true
   }

// if data exist then it will proceed the below setups
  let postMedia ;
  if(photoFile){
    postMedia = fileInputPhoto.current.files[0]
  }else if(videoFile){
    postMedia = videoInputRef.current.files[0]
  }

  
 
 
  console.log(mainTitle,mainContent,tags,privacy,postMedia)
  setProgress(true)
  const body = new FormData()
  body.append("title",mainTitle)
  body.append("content",mainContent)
  body.append("tags",tags)
  body.append("privacy",privacy)
  body.append("media",postMedia)
   
  axios.post("/api/post/uploading", body,{
    headers:{
      'Authorization':`Bearer ${decryptedUserDetails.token}`
     }
  }).then((response)=>{
    toast("Post Succesfully updated !")
  titleRef.current.value=''
   contentRef.current.value='' 
   setCancelButton(false)
   setVideofile(false)
   setPhotoFile(false)
   setBlobUrl('')
    setProgress(false)
  }).catch((err)=>{
    toast("Try Again Later !")
    titleRef.current.value=''
     contentRef.current.value='' 
     setCancelButton(false)
     setVideofile(false)
     setPhotoFile(false)
     setBlobUrl('')
      setProgress(false)
    console.log(err)
  })
 
}


  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6 mb-5">
      <ToastContainer/>
      <div className="p-6">
        {/* add post main phot and name div */}
        <div className="flex space-x-3 items-center">
          <img
            src="https://image.shutterstock.com/image-photo/sky-cloulds-blackgroundselection-focus-only-260nw-1202241937.jpg"
            className="h-9 w-9 rounded-full"
            alt=""
          />
          <div>
            <h1>Jones Augestine</h1>
            <select value={privacy} title="asa" onChange={(e)=>{setPrivacy(e.target.value)}}>
              <option value="public" selected>
                Public
              </option>
              <option value="onlyme">Only me</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="title"
              className="h-4 p-4 m-2 outline-none"
              ref={titleRef}
            />
            <textarea
              type="text"
              placeholder="Content"
              className=" p-4 m-2 outline-none resize-none"
              rows=""
              ref={contentRef}
            />
            <hr />
          </div>
          <div className="flex items-center justify-center p-2  ">
          {photoFile&& <img className="h-96 w-atuo" src={blobUr} alt="postImages"/>}
          {videoFile&&<ReactPlayer url={blobUr}  controls/>}

          </div>
          <div className="flex items-center justify-between mt-4">
              {/* options */}
          <div>
            <div className="flex space-x-4 text-xl mt-3 capitalize">
              {/* photo and video upload */}
              <div
                className="cursor-pointer flex space-x-3"
                onClick={() => {
                  fileInputPhoto.current.click();
                }}
              >
                <BiImageAdd style={{ color: "#FF005C" }} size="1.7rem" />
                <p>photos</p>
                <input type="file" ref={fileInputPhoto} onChange={(e)=>{photoFileOnchange(e)}}  accept="image/*"  hidden />
              </div>

              {/* video upload  */}
              <div
                className="cursor-pointer flex space-x-3"
                onClick={() => {
                  videoInputRef.current.click();
                }}
              >
                <BiVideoPlus style={{ color: "#4CAF50" }} size="1.7rem" />
                <p>Video </p>
                <input type="file"  hidden ref={videoInputRef} onChange={(e)=>{vidoFileOnchange(e)}} accept="video/*" />
              </div>

              {/* tag setting */}
              <div
                className="cursor-pointer flex space-x-3"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <AiOutlineTags style={{ color: "#FF005C" }} size="1.7rem" />
                <p>Tag </p>
              </div>
            </div>
          </div>
          {/* send and cancel button */}
          <div className={`space-x-4 ${progress&&"hidden"}`}>
            {cancelButton&&<Button variant="contained" color="secondary"  onClick={()=>{clearAllDataToPost()}}  endIcon={<CloseIcon />}>
            Cancel
          </Button>}
         
          <Button variant="contained" style={{backgroundColor:"#FF005C"}} onClick={()=>{sendingTheData()}} endIcon={<SendIcon />}>
            Send
         </Button>
          </div>
          </div>
        
        </div>
            <div className={`mt-5 px-5 ${progress?'':'hidden'}`}>
            <LinearProgress color="success"/>
            </div>
      </div>

      {/* modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0  w-full sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6  font-medium text-gray-900"
                      >
                        Add Your Tags with comma
                      </Dialog.Title>
                      <div className="mt-2 ">
                        <input
                          value={tag}
                          onChange={(e) => {
                            let text = e.target.value;
                            setTags(text);
                          }}
                          type="text"
                          placeholder="add your text with comma"
                          className="outline-none w-full "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpen(false);
                     }}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {setTags('');setOpen(false)}}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default AddPost;
