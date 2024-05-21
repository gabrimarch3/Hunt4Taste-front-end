'use client';
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
import { IconButton, Badge } from "@mui/material";
import ProductModal from '../components/ProductModal';
import Cookies from 'js-cookie';
import axios from 'axios'; // Importa axios per effettuare le chiamate API
import { ClipLoader } from 'react-spinners'; // Nuovo spinner di caricamento

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

  const translations = {
    it: {
      searchPlaceholder: 'Cerca tra i nostri prodotti...',
      noProducts: 'Nessun prodotto trovato per',
      addToCart: 'Aggiungi al Carrello'
    },
    en: {
      searchPlaceholder: 'Search among our products...',
      noProducts: 'No products found for',
      addToCart: 'Add to Cart'
    },
    fr: {
      searchPlaceholder: 'Cherchez parmi nos produits...',
      noProducts: 'Aucun produit trouvé pour',
      addToCart: 'Ajouter au Panier'
    },
    de: {
      searchPlaceholder: 'Suchen Sie unter unseren Produkten...',
      noProducts: 'Keine Produkte gefunden für',
      addToCart: 'In den Warenkorb'
    },
    es: {
      searchPlaceholder: 'Busca entre nuestros productos...',
      noProducts: 'No se encontraron productos para',
      addToCart: 'Añadir al Carrito'
    }
  };

  const lang = Cookies.get('lang') || 'en'; // Recupera la lingua dai cookie, predefinita a 'en'
  const t = translations[lang];

  useEffect(() => {
    const userId = Cookies.get('user_id'); // Retrieve the user_id from cookies
    const language = Cookies.get('lang') || 'en'; // Recupera la lingua dai cookie, predefinita a 'en'

    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://hunt4taste.it/api/categories");
        const filteredCategories = response.data.filter(category => category.user_id === parseInt(userId));
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get("https://hunt4taste.it/api/subcategories");
        const filteredSubcategories = response.data.filter(subcategory => subcategory.user_id === parseInt(userId));
        setSubcategories(filteredSubcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://hunt4taste.it/api/products?lang=${language}`);
        const filteredProducts = response.data.filter(product => product.user_id === parseInt(userId));
        setProducts(filteredProducts);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    if (userId) { // Only fetch if userId is available
      fetchCategories();
      fetchSubcategories();
      fetchProducts();
    }
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

  const openModalWithProduct = async (product) => {
    const language = Cookies.get('lang') || 'en'; // Recupera la lingua dai cookie, predefinita a 'en'
    try {
      const response = await axios.get(`https://hunt4taste.it/api/products/${product.id}?lang=${language}`);
      setSelectedProduct(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Errore nel recupero dei dettagli del prodotto:', error);
    }
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
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
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
              placeholder={t.searchPlaceholder}
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
          <p>{t.noProducts} "{searchQuery}"</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={openModalWithProduct}
                translations={translations}
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
        translations={translations}
      />
    </div>
  );
};

export default Shop;
