'use client'
import React from 'react'
import NavigationHeader from '../components/NavigationHeader'
import Footer from '../components/Footer'
import { useRouter } from 'next/navigation';

const CancelPayment = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push("/");
      };
      

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader title="Pagamento annullato" />

      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-[#485d8b]">
          Pagamento annullato
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Il tuo pagamento è stato annullato. Per favore riprova o contattaci
          per assistenza.
        </p>

        <button onClick={handleGoHome} className="mt-8 px-4 py-2 bg-[#485d8b] text-white rounded-md hover:bg-[#485d8b]">
          Torna alla home
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default CancelPayment