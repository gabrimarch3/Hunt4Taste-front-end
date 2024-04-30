'use client';
import React, { useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationHeader";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

const Esperienze = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://hunt4taste.it/api/experiences")
      .then((response) => response.json())
      .then((data) => {
        const filteredExperiences = data.filter(experience => experience.user_id === 7);
        setExperiences(filteredExperiences);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Errore nella chiamata API:", error);
        setIsLoading(false);
      });
  }, []);

  const truncateDescription = (desc) => {
    return desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationHeader />
      <div className="flex-grow">
        <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
            <div
              className="flex flex-col bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              key={experience.id}
            >
              <div className="relative w-full h-60">
                <Image src={experience.image_url} alt={experience.title} layout="fill" objectFit="cover" className="rounded-t-xl" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#485d8b] mb-3">
                  {experience.title}
                </h3>
                <p className="text-base text-gray-700 flex-1">
                  {truncateDescription(experience.description)}
                </p>
                <div className="mt-6 flex justify-end">
                  <Link legacyBehavior href={`/esperienze/${experience.id}`}>
                    <a className="text-white bg-[#485d8b] hover:bg-[#485d8b] rounded-full py-2 px-4 transition-colors duration-300 ease-out font-semibold text-sm">
                      {experience.buttonText || 'Scopri'}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Esperienze;
