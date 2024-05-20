import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Lottie from 'react-lottie';
import * as successAnimation from '../animation/Animation - 1716194372761.json';

export default function SubscriptionForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const animationDuration = 5000; // Assume the animation duration is 5000ms (5 seconds)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = Cookies.get('user_id');
    if (!userId) {
      setMessage('User ID non trovato nei cookie');
      return;
    }

    try {
      const response = await fetch(`https://hunt4taste.it/api/utenti/${userId}`);
      const data = await response.json();
      const companyEmail = data.user.company_email;

      if (!companyEmail) {
        setMessage('Company email non trovata');
        return;
      }

      const emailResponse = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyEmail, formData }),
      });

      const result = await emailResponse.json();

      setMessage(result.message);
      if (emailResponse.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Errore durante l\'invio dell\'email:', error);
      setMessage('Errore durante l\'invio dell\'email');
    }
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '' });
        setMessage('');
      }, animationDuration);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className="form-container flex flex-col p-3 mt-auto">
      <h2 className="text-gray-500 font-bold text-xl pb-3">RIMANI IN CONTATTO</h2>
      <div className="w-full min-h-[200px] p-7 bg-white flex flex-col justify-center shadow-lg rounded-xl">
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="h-15 w-full">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b border-b-[#5D5D5D] bg-transparent text-gray-600 mb-10 font-thin"
              placeholder="Nome e Cognome"
              required
            />
            <div className="flex flex-col xl:flex-row md:ml-0">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-b-[#5D5D5D] bg-transparent text-gray-600 font-thin"
                placeholder="Email"
                required
              />
              <button
                type="submit"
                className="xl:ml-20 mt-9 xl:mt-0 text-center font-light bg-[#485d8b] w-full rounded-xl text-white h-10"
              >
                Iscriviti
              </button>
            </div>
          </form>
        ) : (
          <div className="success-animation">
            <Lottie options={defaultOptions} height={200} width={200} />
          </div>
        )}
        {message && !isSuccess && <p>{message}</p>}
      </div>
    </div>
  );
}
