"use client";
import React from "react";
import Image from "next/image";
import ProductModal from "./ProductModal";
import { useState } from "react";
import { useCart } from "../context/CartContex";
import { FaRegHeart } from "react-icons/fa";
import Cookies from 'js-cookie';

const ProductCard = ({ product, onProductClick }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const translations = {
    it: {
      discoverMore: 'Scopri di più'
    },
    en: {
      discoverMore: 'Discover More'
    },
    fr: {
      discoverMore: 'Découvrir plus'
    },
    de: {
      discoverMore: 'Mehr entdecken'
    },
    es: {
      discoverMore: 'Descubrir más'
    }
  };

  const lang = Cookies.get('lang') || 'en'; // Recupera la lingua dai cookie, predefinita a 'en'
  const t = translations[lang];

  const handleAddToCartClick = (e) => {
    e.stopPropagation(); // Impedisce al click di propagarsi al div genitore
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Resetta lo stato dopo 2 secondi
  };

  const handleCardClick = () => {
    onProductClick(product);
  };

  return (
    <div className="border rounded-xl shadow-2xl p-4 min-w-10 flex flex-col items-center" onClick={handleCardClick}>
      <Image 
        src={product.image_url} 
        alt={product.name} 
        layout="responsive" 
        width={128} 
        height={128} 
        objectFit="cover" 
        className="w-32 h-64 rounded"
        style={{ marginBottom: '20px' }} // Aggiungi un margine superiore fisso di 20px
      />

      <button
        className={`bg-[#485d8b] hover:bg-purple-[#485d8b] text-white font-bold py-2 px-3 rounded-full min-h-[40px] transition-colors duration-300 ${
          added ? "bg-green-500 hover:bg-green-600" : ""
        }`}
        style={{ 
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#8B487E",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          fontSize: "0.9rem",
        }}
      >
        {t.discoverMore}
      </button>
      
      <h3 className="text-gray-700 font-medium text-center mt-2">{product.name}</h3>
      
      <div className="text-gray-500 text-sm flex flex-col justify-center items-center w-full">
        <span className="font-medium">{product.year}</span>
        <span className="mt-1 font-light">€{product.price}</span>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        product={selectedProduct} 
        addToCart={addToCart}
      />
    </div>
  );
};

export default ProductCard;
