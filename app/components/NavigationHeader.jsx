'use client';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import HamburgerMenu from './HamburgerMenu';

const NavigationHeader = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Assuming you are using window.location to get the path
    const urlPath = window.location.pathname.split('/')[1];
    const formattedTitle = urlPath ? urlPath.replace(/-/g, ' ').toUpperCase() : '';
    setTitle(formattedTitle);
  }, []);

  const goBack = () => {
    window.history.back(); // Use window.history.back() to go to the previous page
  };

  return (
    <div className='w-full h-[89.45px] bg-[#485d8b] rounded-b-3xl flex justify-between items-center p-10'>
        <HamburgerMenu />
        <h2 className='text-white font-light text-xl self-center'>{title}</h2>
        <FaArrowLeft className='w-6 h-6 text-white' onClick={goBack} /> {/* Attach goBack function to onClick */}
    </div>
  )
}

export default NavigationHeader;
