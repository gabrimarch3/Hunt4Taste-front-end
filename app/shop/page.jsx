'use client'
import React, { useState, useEffect, useRef } from "react";
import NavigationHeader from "../components/NavigationHeader";
import Image from "next/image";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { Button } from "../../components/ui/button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawer from "../components/CartDrawer";
import { useCart } from "../context/CartContex";
import {
  IconButton,
  Badge,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from "@mui/material";
import ProductModal from '../components/ProductModal';
import axios from 'axios'; // Importa axios per effettuare le chiamate API

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAboveFooter, setIsAboveFooter] = useState(true);
  const footerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const { addToCart, cartItems } = useCart();
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://hunt4taste.it/api/categories");
        const filteredCategories = response.data.filter(category => category.user_id === 7);
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("https://hunt4taste.it/api/subcategories");
        const filteredSubcategories = response.data.filter(subcategory => subcategory.user_id === 7);
        setSubcategories(filteredSubcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
  
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://hunt4taste.it/api/products");
        const filteredProducts = response.data.filter(product => product.user_id === 7);
        setProducts(filteredProducts);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
  
    fetchCategories();
    fetchSubcategories();
    fetchProducts();
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const footerPosition = footerRect.top + window.pageYOffset;
        const scrollPosition = window.pageYOffset + window.innerHeight;
        setIsAboveFooter(scrollPosition < footerPosition);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModalWithProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const toggleCartDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsCartOpen(open);
  };

  const handleCategoryChange = (value) => {
    if (selectedCategory !== value) {
      setSelectedCategory(value);
      setSelectedSubcategory("");
    } else {
      setSelectedCategory("");
    }
  };

  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || product.category_id === selectedCategory) &&
      (!selectedSubcategory || product.subcategory_id === selectedSubcategory)
  );

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (isLoading) {
    return (
      <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2" style={{ backgroundColor: 'transparent' }}>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div> 
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationHeader />
      <CartDrawer isOpen={isCartOpen} toggleDrawer={toggleCartDrawer} />
      <div className="flex flex-col flex-grow items-center mt-4">
        <div className="flex flex-col justify-between w-screen px-3 mx-auto">
          <div className="relative flex flex-grow">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="   Cerca tra i nostri prodotti..."
              className="w-full h-12 rounded-lg bg-white text-sm text-gray-700 outline-none shadow-xl mb-3"
            />
          </div>
          {/* Visualizzazione delle categorie */}
        <div className="mb-4 self-center flex flex-col">
          <div className="flex flex-wrap justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryChange(category.value)}
                variant="contained"
                color={selectedCategory === category.value ? "primary" : "default"}
                size="large"
                style={{ margin: "0.5rem" }}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Visualizzazione delle sottocategorie */}
        {selectedCategory && (
  <div className="mb-4 self-center flex flex-col">
    <div className="flex flex-wrap justify-center">
      {subcategories
        .filter((subcategory) => subcategory.category_id === selectedCategory)
        .map((subcategory) => (
          <Button
            key={subcategory.id}
            onClick={() => handleSubcategoryChange(subcategory.name)}
            variant="outlined"
            color="primary"
            size="large"
            style={{ margin: "0.5rem" }}
          >
            {subcategory.name}
          </Button>
        ))}
    </div>
  </div>
)}
          <div
            className={`fixed bottom-[70px] right-10 z-30 transition-transform ${
              isAboveFooter ? "" : "translate-y-[100%]"
            }`}
            style={{ transition: "transform 0.3s ease-in-out" }}
          >
            <IconButton
              color="primary"
              onClick={toggleCartDrawer(true)}
              style={{
                backgroundColor: "#485d8b",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "50%",
                width: "56px",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingCartIcon style={{ color: "#ffffff" }} />
              {itemCount > 0 && (
                <Badge
                  badgeContent={itemCount}
                  color="error"
                  overlap="circular"
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "3px",
                    border: `2px solid #ffffff`,
                    padding: "0",
                  }}
                />
              )}
            </IconButton>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p>Nessun prodotto trovato per {'"'}{searchQuery}{'"'}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={openModalWithProduct}
              />
            ))}
          </div>
        )}
      </div>

      <Footer ref={footerRef} />

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
        addToCart={addToCart}
      />
    </div>
  );
};

export default Shop;
