"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Services from "./components/Services";
import SwiperCards from "./components/SwiperCards";
import SubscriptionForm from "./components/SubscriptionForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="pt-10 bg-transparent">
        <h3 className="ml-3 pl-3 pb-3 font-bold text-[#7B7C7C]">IN HOTEL</h3>
        <div className="pl-3 overflow-hidden max-w-full">
          <SwiperCards />
        </div>
      </div>
      <div className="pt-10 bg-transparent">
        <h3 className="ml-3 pl-3 pb-3 font-bold text-[#7B7C7C]">SERVIZI</h3>
        <div className="pl-3 overflow-hidden max-w-full">
      <Services />
        </div>
      </div>
      <SubscriptionForm />
      <Footer />
    </>
  );
}
