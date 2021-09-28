import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ContactForm from "./ContracterForm"
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30%",
  bgcolor: 'background.paper',
  
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({open, handleClose}) {

  return (
    <div >
       <Modal
         aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-2xl">
             <ContactForm  modalClose={handleClose}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}