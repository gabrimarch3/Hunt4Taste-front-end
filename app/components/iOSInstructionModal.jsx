import React from 'react';
import { Modal, Typography, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const iOSInstructionsModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
        <Typography variant="h6" component="h2">
          Installa questa applicazione sulla tua schermata Home
        </Typography>
        <Box className="instruction">
          <Typography>1. Tocca l'icona di condivisione nella barra del browser.</Typography>
          {/* Inserisci qui un'immagine o un'icona se necessario */}
        </Box>
        <Box className="instruction">
          <Typography>2. Scorri verso il basso e tocca 'Aggiungi a schermata Home'.</Typography>
          {/* Inserisci qui un'immagine o un'icona se necessario */}
        </Box>
        <Box className="instruction">
          <Typography>3. Conferma toccando 'Aggiungi'.</Typography>
          {/* Inserisci qui un'immagine o un'icona se necessario */}
        </Box>
      </Box>
    </Modal>
  );
};

export default iOSInstructionsModal;
