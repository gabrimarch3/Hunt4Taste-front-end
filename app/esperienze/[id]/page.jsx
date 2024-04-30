'use client';
import React, { useState, useEffect } from 'react';
import NavigationHeader from "../../components/NavigationHeader";
import Footer from "../../components/Footer";
import { usePathname } from 'next/navigation';
import axios from "axios";
import { FaMapLocationDot, FaRegClock, FaEuroSign } from "react-icons/fa6";
import Image from "next/image";

const PrenotaEsperienza = () => {
  const pathname = usePathname();
  const esperienzaId = pathname.split('/')[2];
  const [esperienza, setEsperienza] = useState(null);

  useEffect(() => {
    if (esperienzaId) {
      fetchEsperienzaDetails(esperienzaId);
    }
  }, [esperienzaId]);

  const fetchEsperienzaDetails = async (id) => {
    try {
      const response = await axios.get(`https://hunt4taste.it/api/experiences/${id}`);
      setEsperienza(response.data);
    } catch (error) {
      console.error('Errore nel recupero dei dettagli dell\'esperienza:', error);
    }
  };

  const handleBook = async () => {
    try {
      const cartItems = [
        {
          name: esperienza.title,
          price: esperienza.cost,
          quantity: 1, 
        },
      ];
      const response = await axios.post('/api', { cartItems });
      const { url } = response.data; 
      window.location = url;
    } catch (error) {
      console.error('Error during Stripe Checkout:', error);
    }
  };

  if (!esperienza) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg flex-grow">
        <div className="mb-4">
          <Image
            src={esperienza.image_url}
            alt={esperienza.title}
            width={600}
            height={400}
            objectFit="cover"
            className="rounded-lg"
          />
          {/* Icons and details */}
          <div className="h-10 flex justify-start items-center gap-10">
            <div className="flex justify-center items-center">
              <FaMapLocationDot className="text-[#707070]" />
              <p className="font-sm text-[#707070] ml-2">{esperienza.location}</p>
            </div>
            <div className="flex justify-center items-center">
              <FaRegClock className="text-[#707070]" />
              <p className="font-sm text-[#707070] ml-2">{esperienza.duration} Minuti</p>
            </div>
            <div className="flex justify-center items-center">
              <FaEuroSign className="text-[#707070]" />
              <p className="font-sm text-[#707070] ml-2">{esperienza.cost}</p>
            </div>
          </div>
          <h1 className="text-md text-[#485d8b] font-bold mb-4 mt-4">{esperienza.title}</h1>
        </div>
        <p className="text-gray-700 mb-4">{esperienza.description}</p>
        <div className="flex justify-center mt-4">
          <button onClick={handleBook} className="bg-[#485d8b] w-[200px] mt-20 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300">
            Prenota
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrenotaEsperienza;
