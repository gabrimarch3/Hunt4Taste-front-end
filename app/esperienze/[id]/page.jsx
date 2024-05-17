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
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: '',
    message: ''
  });

  useEffect(() => {
    if (esperienzaId) {
      fetchEsperienzaDetails(esperienzaId);
    }
  }, [esperienzaId]);

  const fetchEsperienzaDetails = async (id) => {
    try {
      const response = await axios.get(`https://hunt4taste.it/api/experiences/${id}`);
      const cleanDescription = DOMPurify.sanitize(response.data.description);
      response.data.description = cleanDescription;
      setEsperienza(response.data);
    } catch (error) {
      console.error('Errore nel recupero dei dettagli dell\'esperienza:', error);
    }
  };

  const handleBook = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/sendBookingEmail', { ...formData, experienceTitle: esperienza.title, esperienzaId });
      setShowModal(false);
      alert('Prenotazione inviata con successo!');
    } catch (error) {
      console.error('Errore durante l\'invio della prenotazione:', error);
      alert('Errore durante l\'invio della prenotazione');
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Prenota {esperienza.title}</h2>
              <button onClick={closeModal} className="text-gray-500 text-lg font-bold">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Inserisci il tuo nome completo" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Inserisci la tua email" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefono</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Inserisci il tuo numero di telefono" required />
              </div>
              <div>
                <label htmlFor="participants" className="block text-sm font-medium text-gray-700">Numero di Partecipanti</label>
                <input type="number" id="participants" name="participants" value={formData.participants} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Inserisci il numero di partecipanti" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Messaggio</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Inserisci un messaggio" rows="4"></textarea>
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
