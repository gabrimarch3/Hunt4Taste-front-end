'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import NavigationHeader from '../../components/NavigationHeader';
import Footer from '../../components/Footer';

const SectionPage = ({ params }) => {
  const { id } = params;
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const response = await axios.get(`https://hunt4taste.it/api/sections/${id}`);
        const sectionData = response.data;

        if (sectionData) {
          const cleanContent = DOMPurify.sanitize(sectionData.content);
          sectionData.content = cleanContent;
          setSection(sectionData);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  }

  if (error) {
    return <div>Sezione non trovata</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavigationHeader />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          {section.image && (
            <img
              src={section.image}
              alt={section.title}
              className="w-full h-80 object-cover"
            />
          )}
          <div className="p-8">
            <h1 className="text-3xl text-blue-800 font-bold mb-4 text-center">{section.title.toUpperCase()}</h1>
            <div className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SectionPage;
