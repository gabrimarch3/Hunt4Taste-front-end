import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import HamburgerMenu from "./HamburgerMenu";
import Cookies from 'js-cookie';
import '../slideshow.css';

const Header = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [logo, setLogo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      let userId = parseInt(queryParams.get('user_id'), 10);

      if (!userId) {
        userId = parseInt(Cookies.get('user_id'), 10);
      }

      if (!userId) {
        console.error('User ID not found in URL or cookies');
        return;
      }

      try {
        const response = await fetch(`https://hunt4taste.it/api/header-images`);
        const data = await response.json();
        const userData = data.find(item => item.user_id === userId);
        if (userData) {
          setImages([userData.image_one, userData.image_two, userData.image_three]);
          setLogo(userData.logo); // Set logo URL from the fetched data
        } else {
          console.error('No images or logo found for this user');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [images]); // Depend on images state to ensure the interval starts after images are loaded

  if (images.length === 0) {
    return <div className="h-[30vh]"></div>; // Placeholder for loading state
  }

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

      <div className="absolute inset-0 z-10">
        <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: "65%" }}>
          <img
            src={logo} // Using dynamic logo URL
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
