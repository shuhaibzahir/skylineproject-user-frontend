import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import ReactPlayer from "react-player/lazy";
 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
    boxShadow: 24,
  p: 4,
};

export default function EditPost({editMOdalOpen,editModalClose,modalData,updatePost}) {
 
    //  this is for values
     const [title,setTitle] = useState(modalData.title) 
    const [content,setDescription] = useState( modalData.content) 

    const updateOnlick =()=>{
        updatePost({title,content,postId:modalData._id})
    }
    


    const checkMediaVideOrPhoto = () => {
        if(!modalData){
            return 
        }
        if (modalData.videoType) {
          return (
            <div className="flex justify-center">
              <ReactPlayer controls={true} width="100%" url={modalData.mediaLink} />
            </div>
          );
        } else if (modalData.imageType) {
          return (
            <div className="flex justify-center">
              <img src={modalData.mediaLink} alt="" />
            </div>
          );
        }
      };
  return (
    <div>
    
      <Modal
        open={editMOdalOpen}
        onClose={()=>{editModalClose()}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="space-y-3">
              <div className="space-y-3 w-full">
              <TextField id="standard-basic" fullWidth label="Title" value={title} onChange={(e)=>setTitle(e.target.value)} variant="standard" />
              <TextField id="standard-basic" fullWidth label="Description" value={content} onChange={(e)=>setDescription(e.target.value)} variant="standard" />
              </div>
              <div>
                 {checkMediaVideOrPhoto()}
              </div>
              <div className="flex justify-end  space-x-4 p-4">
              <button className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-white-100 hover:text-dark-gray  transition duration-400 " onClick={()=>editModalClose()}> Cancel</button>
                  <button className="px-5 py-2 bg-dark-gray text-white  hover:bg-dark hover:text-white transition duration-300 rounded-full " onClick={updateOnlick}>  update</button>
              </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
