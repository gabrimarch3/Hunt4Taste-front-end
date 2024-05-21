'use client';
import React, { useState, useEffect } from 'react';
import NavigationHeader from "../../components/NavigationHeader";
import Footer from "../../components/Footer";
import { usePathname } from 'next/navigation';
import axios from "axios";
import { FaMapLocationDot, FaRegClock, FaEuroSign } from "react-icons/fa6";
import Image from "next/image";
import DOMPurify from 'dompurify';
import Cookies from 'js-cookie';

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

  const translations = {
    it: {
      loading: 'Caricamento...',
      book: 'Prenota',
      requestInfo: 'Richiedi Informazioni',
      bookExperience: 'Prenota',
      fullName: 'Nome Completo',
      enterFullName: 'Inserisci il tuo nome completo',
      email: 'Email',
      enterEmail: 'Inserisci la tua email',
      phone: 'Telefono',
      enterPhone: 'Inserisci il tuo numero di telefono',
      participants: 'Numero di Partecipanti',
      enterParticipants: 'Inserisci il numero di partecipanti',
      message: 'Messaggio',
      enterMessage: 'Inserisci un messaggio',
      sendBooking: 'Invia Prenotazione',
      bookingSent: 'Prenotazione inviata con successo!',
      bookingError: 'Errore durante l\'invio della prenotazione'
    },
    en: {
      loading: 'Loading...',
      book: 'Book',
      requestInfo: 'Request Information',
      bookExperience: 'Book',
      fullName: 'Full Name',
      enterFullName: 'Enter your full name',
      email: 'Email',
      enterEmail: 'Enter your email',
      phone: 'Phone',
      enterPhone: 'Enter your phone number',
      participants: 'Number of Participants',
      enterParticipants: 'Enter number of participants',
      message: 'Message',
      enterMessage: 'Enter a message',
      sendBooking: 'Send Booking',
      bookingSent: 'Booking sent successfully!',
      bookingError: 'Error sending booking'
    },
    fr: {
      loading: 'Chargement...',
      book: 'Réserver',
      requestInfo: 'Demander des informations',
      bookExperience: 'Réserver',
      fullName: 'Nom Complet',
      enterFullName: 'Entrez votre nom complet',
      email: 'Email',
      enterEmail: 'Entrez votre email',
      phone: 'Téléphone',
      enterPhone: 'Entrez votre numéro de téléphone',
      participants: 'Nombre de Participants',
      enterParticipants: 'Entrez le nombre de participants',
      message: 'Message',
      enterMessage: 'Entrez un message',
      sendBooking: 'Envoyer la réservation',
      bookingSent: 'Réservation envoyée avec succès!',
      bookingError: 'Erreur lors de l\'envoi de la réservation'
    },
    de: {
      loading: 'Laden...',
      book: 'Buchen',
      requestInfo: 'Informationen anfordern',
      bookExperience: 'Buchen',
      fullName: 'Vollständiger Name',
      enterFullName: 'Geben Sie Ihren vollständigen Namen ein',
      email: 'Email',
      enterEmail: 'Geben Sie Ihre E-Mail-Adresse ein',
      phone: 'Telefon',
      enterPhone: 'Geben Sie Ihre Telefonnummer ein',
      participants: 'Anzahl der Teilnehmer',
      enterParticipants: 'Geben Sie die Anzahl der Teilnehmer ein',
      message: 'Nachricht',
      enterMessage: 'Geben Sie eine Nachricht ein',
      sendBooking: 'Buchung senden',
      bookingSent: 'Buchung erfolgreich gesendet!',
      bookingError: 'Fehler beim Senden der Buchung'
    },
    es: {
      loading: 'Cargando...',
      book: 'Reservar',
      requestInfo: 'Solicitar información',
      bookExperience: 'Reservar',
      fullName: 'Nombre Completo',
      enterFullName: 'Ingrese su nombre completo',
      email: 'Email',
      enterEmail: 'Ingrese su correo electrónico',
      phone: 'Teléfono',
      enterPhone: 'Ingrese su número de teléfono',
      participants: 'Número de Participantes',
      enterParticipants: 'Ingrese el número de participantes',
      message: 'Mensaje',
      enterMessage: 'Ingrese un mensaje',
      sendBooking: 'Enviar Reserva',
      bookingSent: '¡Reserva enviada con éxito!',
      bookingError: 'Error al enviar la reserva'
    }
  };

  const lang = Cookies.get('lang') || 'en'; // Ottieni la lingua dal cookie o usa 'en' come predefinita
  const t = translations[lang];

  useEffect(() => {
    if (esperienzaId) {
      fetchEsperienzaDetails(esperienzaId);
    }
  }, [esperienzaId]);

  const fetchEsperienzaDetails = async (id) => {
    try {
      const response = await axios.get(`https://hunt4taste.it/api/experiences/${id}?lang=${lang}`);
      const cleanDescription = DOMPurify.sanitize(response.data.description);
      response.data.description = cleanDescription;
      setEsperienza(response.data);
    } catch (error) {
      console.error('Errore nel recupero dei dettagli dell\'esperienza:', error);
    }
  };

  const formatDuration = (duration) => {
    if (duration > 60) {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}h ${minutes}min`;
    }
    return `${duration} Minuti`;
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
      alert(t.bookingSent);
    } catch (error) {
      console.error('Errore durante l\'invio della prenotazione:', error);
      alert(t.bookingError);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!esperienza) {
    return <div>{t.loading}</div>;
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
              <p className="ml-2 text-sm text-gray-500">{formatDuration(esperienza.duration)}</p>
            </div>
            <div className="flex items-center">
              <FaEuroSign className="text-gray-500" />
              <p className="ml-2 text-sm text-gray-500">{esperienza.cost}</p>
            </div>
          </div>
          <h1 className="text-lg text-blue-800 font-bold my-4">{esperienza.title}</h1>
          <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: esperienza.description }}></p>
          <button onClick={handleBook} className="bg-blue-800 w-52 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
            {esperienza.is_paid ? t.book : t.requestInfo}
          </button>
        </div>
      </div>
      <Footer />

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{t.bookExperience} {esperienza.title}</h2>
              <button onClick={closeModal} className="text-gray-500 text-lg font-bold">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t.fullName}</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder={t.enterFullName} required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t.email}</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder={t.enterEmail} required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t.phone}</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder={t.enterPhone} required />
              </div>
              <div>
                <label htmlFor="participants" className="block text-sm font-medium text-gray-700">{t.participants}</label>
                <input type="number" id="participants" name="participants" value={formData.participants} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder={t.enterParticipants} required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t.message}</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder={t.enterMessage} rows="4"></textarea>
              </div>
              <button type="submit" className="bg-blue-800 w-full text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                {t.sendBooking}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrenotaEsperienza;
