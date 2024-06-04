'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import NavigationHeader from "../../components/NavigationHeader";
import Footer from "../../components/Footer";
import SwiperCards from "../../components/SwiperCards";
import ServicesSection from '../../components/Services';
import { FaTag, FaEuroSign } from "react-icons/fa";
import Cookies from 'js-cookie';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import CryptoJS from 'crypto-js';

const secretKey = "1234567890abcdef";

const decryptId = (encryptedId) => {
  const base64 = encryptedId.replace(/-/g, '+').replace(/_/g, '/');
  const bytes = CryptoJS.AES.decrypt(base64, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const ServiceDetailPage = () => {
    const pathname = usePathname();
    const encryptedId = pathname.split('/')[2];
    const serviceId = decryptId(encryptedId);
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const translations = {
        it: {
            loading: 'Caricamento...',
            serviceNotFound: 'Servizio non trovato.',
            cost: 'Costo',
            category: 'Categoria',
            relatedServices: 'Servizi Correlati',
            inHotel: 'In Struttura'
        },
        en: {
            loading: 'Loading...',
            serviceNotFound: 'Service not found.',
            cost: 'Cost',
            category: 'Category',
            relatedServices: 'Related Services',
            inHotel: 'In structure'
        },
        fr: {
            loading: 'Chargement...',
            serviceNotFound: 'Service non trouvé.',
            cost: 'Coût',
            category: 'Catégorie',
            relatedServices: 'Services Connexes',
            inHotel: 'En structure'
        },
        de: {
            loading: 'Wird geladen...',
            serviceNotFound: 'Dienst nicht gefunden.',
            cost: 'Kosten',
            category: 'Kategorie',
            relatedServices: 'Verwandte Dienste',
            inHotel: 'Im Struktur'
        },
        es: {
            loading: 'Cargando...',
            serviceNotFound: 'Servicio no encontrado.',
            cost: 'Costo',
            category: 'Categoría',
            relatedServices: 'Servicios Relacionados',
            inHotel: 'En estructura'
        }
    };

    const lang = Cookies.get('lang') || 'en'; // Recupera la lingua dai cookie, predefinita a 'en'
    const t = translations[lang];

    useEffect(() => {
        const userId = Cookies.get('user_id');
        if (!userId) {
            console.error("No user ID found in cookies.");
            setIsLoading(false);
            return;
        }

        if (serviceId) {
            let apiUrl = `https://hunt4taste.it/api/services/${serviceId}`;
            if (lang) {
                apiUrl += `?lang=${lang}`;
            }
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (parseInt(data.user_id) === parseInt(userId)) {
                        const cleanDescription = DOMPurify.sanitize(data.description);
                        data.description = cleanDescription; // Pulizia della descrizione
                        setService(data);
                    } else {
                        setService(null);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Errore nella chiamata API:", error);
                    setIsLoading(false);
                });
        }
    }, [serviceId, lang]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">{t.loading}</div>;
    }

    if (!service) {
        return <div className="flex justify-center items-center h-screen">{t.serviceNotFound}</div>;
    }

    return (
        <div className="bg-white text-gray-800 font-sans min-h-screen flex flex-col">
            <NavigationHeader />

            <div className="container mx-auto my-8 p-4 lg:p-8 max-w-screen-xl">
                <div className="rounded-lg overflow-hidden shadow-lg">
                    <div className="relative w-full h-64 md:h-96 lg:h-[40rem]">
                        <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" className="w-full" />
                    </div>
                    <div className="p-6 lg:p-8 space-y-4">
                        <h2 className="text-3xl lg:text-4xl text-blue-800 font-semibold">{service.title}</h2>
                        <p className="text-gray-600 text-lg lg:text-xl" dangerouslySetInnerHTML={{ __html: service.description }}></p>

                        {service.cost && (
                            <div className="flex items-center text-lg lg:text-xl text-gray-600">
                                <FaEuroSign className="mr-2" />
                                <p>{t.cost}: €{service.cost}</p>
                            </div>
                        )}
                        {service.category && (
                            <div className="flex items-center text-lg lg:text-xl text-gray-600">
                                <FaTag className="mr-2" />
                                <p>{t.category}: {service.category}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl lg:text-3xl text-gray-700 font-semibold mb-4">{t.relatedServices}</h3>
                    <ServicesSection />
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl lg:text-3xl text-gray-700 font-semibold mb-4">{t.inHotel}</h3>
                    <SwiperCards />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ServiceDetailPage;
