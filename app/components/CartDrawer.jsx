"use client";
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Image from "next/image";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContex";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CartDrawer = ({ isOpen, toggleDrawer }) => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();

  const drawerStyle = {
    height: "auto",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    paddingBottom: "env(safe-area-inset-bottom)",
  };

  const total = cartItems.reduce((acc, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 0);
    return acc + itemTotal;
  }, 0);

  const formattedTotal = total.toFixed(2);
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch("api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cartItems }),
      });
  
      if (response.ok) {
        const { url } = await response.json(); // Ottieni l'URL dal JSON
  
        // Esegui il reindirizzamento dell'utente all'URL di pagamento Stripe
        window.location.href = url;
      } else {
        alert("Errore nella creazione della sessione di checkout");
      }
    } catch (error) {
      console.error("Errore durante il checkout:", error);
      // Gestisci l'errore qui, ad esempio mostrando un messaggio all'utente
    }
  };
  


  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={toggleDrawer(false)}
      ModalProps={{
        keepMounted: true,
      }}
      className="relative"
    >
      <div className="bg-white rounded-t-lg p-6 space-y-6 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center">
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <div>
            <ShoppingCartIcon fontSize="large" />
          </div>
          {/* Invisible placeholder to balance the layout */}
          <div className="w-12 h-12 invisible"></div>
        </div>
        <List>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ListItem key={item.id} className="border-b last:border-b-0">
                <div className="flex items-center space-x-4">
                <Image src={item.image_url} alt={item.name} layout="fixed" width={64} height={64} objectFit="cover" className="h-16 w-16 rounded" />

                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ className: "font-semibold" }}
                    secondary={
                      <>
                        Quantità:{" "}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              const newQuantity = item.quantity - 1;
                              if (newQuantity >= 1) {
                                updateCartItemQuantity(item.id, newQuantity);
                              }
                            }}
                            className="px-2 py-1 bg-gray-200 rounded-full focus:outline-none"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => {
                              const newQuantity = item.quantity + 1;
                              updateCartItemQuantity(item.id, newQuantity);
                            }}
                            className="px-2 py-1 bg-gray-200 rounded-full focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </>
                    }
                  />
                </div>
                <IconButton onClick={() => removeFromCart(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <ListItem className="text-center">
              <ListItemText primary="Il tuo carrello è vuoto" />
            </ListItem>
          )}
        </List>
        <div className="p-4">
          <h3 className="text-lg font-semibold">Totale: {formattedTotal}€</h3>
          <Button onClick={handleCheckout} variant="contained" color="primary">
            Vai al Checkout
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
