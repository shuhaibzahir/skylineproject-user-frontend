import  React,{useState} from 'react';
import Box from '@mui/material/Box';
 
import Modal from '@mui/material/Modal';
 
 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight:700,
  overflow:'auto',
  bgcolor: 'background.paper',
    boxShadow: 24,
  p: 4,
};

export default function AllComments({commentMOdalOpen,commentMOdalClose,comments}) {
   return (
    <div>
     <Modal
        open={commentMOdalOpen}
        onClose={()=>{commentMOdalClose()}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
       {comments.map((i,index)=> <div key={index} className=" p-2 ">
        <div className="flex  bg-white-100 items-center p-5 rounded-2xl rounded-bl-none justify-between">
        <div className="flex space-x-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijG7DrhwuN3-8ccFfUJVOeHA3NojRTA9rECPbCX7wg-NY4KgnDbK_9vZO2c0ARCN3k8Q&usqp=CAU"
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <p className="text-sm  ">
             {i.comment}
          </p>
        </div>
         </div>
      </div>)}
        </Box>
      </Modal>
    </div>
  );
}
