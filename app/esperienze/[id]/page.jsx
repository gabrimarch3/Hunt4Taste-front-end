'use client';
import React, { useState, useEffect } from 'react';
import NavigationHeader from "../../components/NavigationHeader";
import Footer from "../../components/Footer";
import { usePathname } from 'next/navigation';
import axios from "axios";
import { FaMapLocationDot, FaRegClock, FaEuroSign } from "react-icons/fa6";
import Image from "next/image";
import DOMPurify from 'dompurify';


const PrenotaEsperienza = () => {
  const pathname = usePathname();
  const esperienzaId = pathname.split('/')[2];
  const [esperienza, setEsperienza] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal display

  useEffect(() => {
    if (esperienzaId) {
      fetchEsperienzaDetails(esperienzaId);
    }
  }, [esperienzaId]);

  const fetchEsperienzaDetails = async (id) => {
    try {
      const response = await axios.get(`https://hunt4taste.it/api/experiences/${id}`);
      const cleanDescription = DOMPurify.sanitize(response.data.description); // Pulisci la descrizione
      response.data.description = cleanDescription; // Aggiorna la descrizione con quella pulita
      setEsperienza(response.data);
    } catch (error) {
      console.error('Errore nel recupero dei dettagli dell\'esperienza:', error);
    }
  };
  

  const handleBook = () => {
    if (!esperienza.is_paid) {
      setShowModal(true); // Show modal for free booking
    } else {
      processStripePayment(); // Handle paid booking
    }
  };

  const processStripePayment = async () => {
    try {
      const cartItems = [{
        name: esperienza.title,
        price: esperienza.cost,
        quantity: 1,
      }];
      const response = await axios.post('/api', { cartItems });
      const { url } = response.data;
      window.location = url;
    } catch (error) {
      console.error('Error during Stripe Checkout:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
          <div className="flex space-x-10 mt-4">
            <div className="flex items-center">
              <FaMapLocationDot className="text-gray-500" />
              <p className="ml-2 text-sm text-gray-500">{esperienza.location}</p>
            </div>
            <div className="flex items-center">
              <FaRegClock className="text-gray-500" />
              <p className="ml-2 text-sm text-gray-500">{esperienza.duration} Minuti</p>
            </div>
            <div className="flex items-center">
              <FaEuroSign className="text-gray-500" />
              <p className="ml-2 text-sm text-gray-500">{esperienza.cost}</p>
            </div>
          </div>
          <h1 className="text-lg text-blue-800 font-bold my-4">{esperienza.title}</h1>
          <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: esperienza.description }}></p>
          <button onClick={handleBook} className="bg-blue-800 w-52 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
            {esperienza.is_paid ? 'Prenota' : 'Richiedi Informazioni'}
          </button>
        </div>
      </div>
      <Footer />

      {/* Modal for booking information */}
      {showModal && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Prenota {esperienza.title}</h2>
        <button onClick={closeModal} className="text-gray-500 text-lg font-bold">&times;</button>
      </div>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Inserisci il tuo nome completo" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Inserisci la tua email" />
        </div>
        <button type="submit" className="bg-blue-800 w-full text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Invia Prenotazione
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default PrenotaEsperienza;