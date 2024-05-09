'use client';
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DOMPurify from 'dompurify';


const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
    overflow: "visible", // Modificato da 'hidden' a 'visible' per mostrare elementi fuori dal modale
    transition: "all 0.3s ease-in-out",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: "#485d8b",
  color: "white",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
  color: "#444",
  "& p": {
    margin: theme.spacing(1, 0),
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(1),
  justifyContent: "center",
  background: "#f8f8f8",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#8B487E",
  fontWeight: "bold",
  padding: "10px 30px",
  margin: theme.spacing(1),
  borderRadius: "50px",
  backgroundColor: "#c5b473",
  "&:hover": {
    backgroundColor: "#863854",
    color: "white",
    transform: "scale(1.05)",
  },
  transition: "transform 0.2s, background-color 0.3s",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(-2.5),
  top: theme.spacing(-2.5),
  color: "#8B487E", // Colore originale della "X"
  backgroundColor: "white", // Assicurati che lo sfondo sia bianco
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
  borderRadius: "50%",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  // Aggiunto per assicurare che lo sfondo non sia trasparente
  border: "2px solid white",
}));

const ProductModal = ({ isOpen, onClose, product, addToCart }) => {
  if (!product) return null;

  const cleanDescription = DOMPurify.sanitize(product.description);

  return (
    <StyledDialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="product-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <StyledDialogTitle id="product-dialog-title">
        {product.name}
        <CloseButton
          aria-label="close"
          onClick={onClose}
          className="bg-white"
        >
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>
      <StyledDialogContent dividers>
        <img
          src={product.image_url}
          alt={product.name}
          style={{ maxWidth: "80%", height: "auto", borderRadius: "10px", marginBottom: "20px" }}
        />
        <p dangerouslySetInnerHTML={{ __html: cleanDescription }}></p>
      </StyledDialogContent>
      <StyledDialogActions>
      <StyledButton onClick={() => {addToCart(product); onClose();}} style={{backgroundColor: "#c5b473", color: "white"}}>
          Aggiungi al Carrello
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default ProductModal;
