'use client'
import React, { useEffect } from "react";
import Cookies from 'js-cookie'; // Import js-cookie
import Header from "./components/Header";
import Services from "./components/Services";
import SwiperCards from "./components/SwiperCards";
import SubscriptionForm from "./components/SubscriptionForm";
import Footer from "./components/Footer";

export default function Home() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const encodedUserId = queryParams.get('user_id');
  
    if (encodedUserId) {
      try {
        // Decodifica da base64 e converte i caratteri URL-encodati in normali caratteri
        const decodedUserId = decodeURIComponent(window.atob(encodedUserId).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
  
        // Salva il userId decodificato nei cookie con una scadenza di 10 giorni
        Cookies.set('user_id', decodedUserId, { expires: 10 });
  
      } catch (error) {
        console.error('Error decoding user ID:', error);
      }
    }
  }, []);

  
  const userId = Cookies.get('user_id');

  return (
    <>
      <Header />
      <div className="pt-10 bg-transparent">
        <h3 className="ml-3 pl-3 pb-3 font-bold text-[#7B7C7C]">IN HOTEL</h3>
        <div className="pl-3 overflow-hidden max-w-full">
          <SwiperCards userId={userId} />
        </div>
      </div>
      <div className="pt-10 bg-transparent">
        <h3 className="ml-3 pl-3 pb-3 font-bold text-[#7B7C7C]">SERVIZI</h3>
        <div className="pl-3 overflow-hidden max-w-full">
          <Services userId={userId} />
        </div>
      </div>
      <SubscriptionForm userId={userId} />
      <Footer />
    </>
  );
}
