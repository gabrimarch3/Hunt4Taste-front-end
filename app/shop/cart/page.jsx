'use client';
import React from 'react';
import { useCart } from '../../context/CartContex'; // Assicurati di avere il percorso corretto

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div>
      <h1>Il tuo carrello</h1>
      {cartItems.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => removeFromCart(item.id)}>Rimuovi</button>
        </div>
      ))}
      {/* Qui aggiungerai il pulsante di checkout */}
    </div>
  );
};

export default CartPage;
