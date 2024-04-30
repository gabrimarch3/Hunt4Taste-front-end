"use client";
import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import HamburgerMenu from "./HamburgerMenu";
import '../slideshow.css'

const Header = () => {
  const images = [
    "https://www.marchesedelgrillo.com/images/hotel-fabriano-gallery/ristorante/chef-ristorante003.jpeg",
    "https://www.marchesedelgrillo.com/images/hotel-fabriano-gallery/ristorante/ristorante-fabriano-037.jpg",
    "https://www.marchesedelgrillo.com/images/hotel-fabriano-gallery/ristorante/chef-ristorante006.jpeg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (currentImageIndex) => (currentImageIndex + 1) % images.length
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="relative h-[30vh]">
      <TransitionGroup>
        <CSSTransition
          key={images[currentImageIndex]}
          timeout={500}
          classNames={{
            enter: 'fade-enter',
            enterActive: 'fade-enter-active',
            exit: 'fade-exit',
            exitActive: 'fade-exit-active'
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
            style={{
              backgroundImage: `url(${images[currentImageIndex]})`,
            }}
          ></div>
        </CSSTransition>
      </TransitionGroup>

      {/* Contenuto del header (incluso il logo) sopra il background */}
      <div className="absolute inset-0 z-10">
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ top: "75%" }}
        >
          <img
            src="https://login.spottywifi.app/users/7007/images/logo.png?RFO"
            alt="Logo"
            className="w-[120px] h-[120px] rounded-lg z-10"
          />
        </div>

        <div className="relative z-10">
          <nav className="flex justify-between items-center p-4 w-full">
            <HamburgerMenu />
            <div></div>
          </nav>
          <div className="text-center py-20">
            <h1 className="text-white text-4xl uppercase tracking-widest"></h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
