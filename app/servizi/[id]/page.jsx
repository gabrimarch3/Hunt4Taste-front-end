'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import NavigationHeader from "../../components/NavigationHeader";
import Footer from "../../components/Footer";
import SwiperCards from "../../components/SwiperCards";
import ServicesSection from '../../components/Services';
import { FaTag , FaEuroSign } from "react-icons/fa";
import Cookies from 'js-cookie';
import Image from 'next/image';
import DOMPurify from 'dompurify';


const ServiceDetailPage = () => {
    const pathname = usePathname();
    const serviceId = pathname.split('/')[2];
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const userId = Cookies.get('user_id');
      if (!userId) {
        console.error("No user ID found in cookies.");
        setIsLoading(false);
        return;
      }
    
      if (serviceId) {
        fetch(`https://hunt4taste.it/api/services/${serviceId}`)
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
    }, [serviceId]);
    
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Caricamento...</div>;
    }
    
    if (!service) {
        return <div className="flex justify-center items-center h-screen">Servizio non trovato.</div>;
    }
    
    return (
        <div className="bg-white text-gray-800 font-sans min-h-screen flex flex-col">
          <NavigationHeader />
    
          <div className="container mx-auto my-8 p-4">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image src={service.image} alt={service.title} layout="responsive" width={500} height={300} objectFit="cover" className="w-full" />
              <div className="p-6 space-y-4">
                <h2 className="text-3xl text-blue-800 font-semibold">{service.title}</h2>
                <p className="text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: service.description }}></p>

                {service.cost && (
                  <div className="flex items-center text-lg text-gray-600">
                    <FaEuroSign className="mr-2" />
                    <p>Costo: €{service.cost}</p>
                  </div>
                )}
                {service.category && (
                  <div className="flex items-center text-lg text-gray-600">
                    <FaTag className="mr-2" />
                    <p>Categoria: {service.category}</p>
                  </div>
                )}
              </div>
            </div>
    
            <div className="mt-8">
              <h3 className="text-2xl text-gray-700 font-semibold mb-4">Servizi Correlati</h3>
              <ServicesSection />
            </div>
    
            <div className="mt-8">
              <h3 className="text-2xl text-gray-700 font-semibold mb-4">In Hotel</h3>
              <SwiperCards />
            </div>
          </div>
    
          <Footer />
        </div>
    );
};
    
export default ServiceDetailPage;
