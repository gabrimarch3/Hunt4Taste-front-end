'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ExperienceIcon from '@mui/icons-material/Explore';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaShoppingBag } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Select from 'react-select';
import Backdrop from '@mui/material/Backdrop';

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [logo, setLogo] = useState('');
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang] = useState(Cookies.get('lang') || 'en'); // Default to 'en' if no cookie is present
  const router = useRouter();

  const translations = {
    it: {
      home: 'Home',
      experiences: 'Esperienze',
      shop: 'Shop',
      version: 'v. 1.0.0'
    },
    en: {
      home: 'Home',
      experiences: 'Experiences',
      shop: 'Shop',
      version: 'v. 1.0.0'
    },
    fr: {
      home: 'Accueil',
      experiences: 'Expériences',
      shop: 'Boutique',
      version: 'v. 1.0.0'
    },
    de: {
      home: 'Startseite',
      experiences: 'Erfahrungen',
      shop: 'Geschäft',
      version: 'v. 1.0.0'
    },
    es: {
      home: 'Inicio',
      experiences: 'Experiencias',
      shop: 'Tienda',
      version: 'v. 1.0.0'
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const userId = Cookies.get('user_id'); // Retrieve the user_id from cookies
    if (!userId) {
      console.error("No user ID found in cookies.");
      setIsLoading(false);
      return;
    }

    setUserId(userId);

    const fetchData = async () => {
      try {
        const response = await fetch(`https://hunt4taste.it/api/header-images`);
        const data = await response.json();
        const userData = data.find(item => item.user_id === parseInt(userId));
        if (userData) {
          setLogo(userData.logo);
        } else {
          console.error('No images or logo found for this user');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchSections = async () => {
      try {
        const response = await axios.get('https://hunt4taste.it/api/sections');
        const filteredSections = response.data.filter(section => section.user_id === parseInt(userId));
        setSections(filteredSections);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching sections:', error);
        setIsLoading(false);
      }
    };

    fetchSections();
  }, [userId]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const handleSectionClick = (id) => {
    router.push(`/sections/${id}`);
  };

  const handleLanguageChange = (selectedOption) => {
    const selectedLang = selectedOption.value;
    setLang(selectedLang);
    Cookies.set('lang', selectedLang);
    window.location.reload(); // Reload the page to apply the language change
  };

  const menuItems = [
    { text: t.home, href: `/`, icon: <HomeIcon /> },
    { text: t.experiences, href: '/esperienze', icon: <ExperienceIcon /> },
    { text: t.shop, href: '/shop', icon: <FaShoppingBag /> },
  ];

  const languageOptions = [
    { value: 'it', label: 'Italiano' },
    { value: 'en', label: 'Inglese' },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} className="text-white">
        <GiHamburgerMenu size={24} />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        className="fixed top-0 left-0 z-40 w-full h-screen transition-transform transform"
        aria-label="Sidebar"
        BackdropProps={{ invisible: false, style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
      >
        <Box
          role="presentation"
          className="px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 h-full relative"
        >
          <Box className="flex justify-between items-center mb-4">
            <Select
              value={languageOptions.find(option => option.value === lang)}
              onChange={handleLanguageChange}
              options={languageOptions}
              styles={{
                control: (provided) => ({
                  ...provided,
                  minWidth: 150,
                  borderRadius: '8px',
                  borderColor: '#e2e8f0',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: '#cbd5e0',
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: '8px',
                  borderColor: '#e2e8f0',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? '#485d8b' : state.isFocused ? '#e2e8f0' : undefined,
                  color: state.isSelected ? 'white' : 'black',
                  '&:hover': {
                    backgroundColor: '#cbd5e0',
                  },
                }),
              }}
            />
          </Box>
          <ul className="space-y-2 mt-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>
                  <ListItemButton
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                  >
                    <ListItemIcon className="text-gray-900 dark:text-white">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} className="ml-3" />
                  </ListItemButton>
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 mt-2">
            {sections.map((section) => (
              <li key={section.id}>
                <ListItemButton
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                  onClick={() => handleSectionClick(section.id)}
                >
                  <ListItemIcon className="text-gray-900 dark:text-white">
                    <i className={`${section.icon} fas fa-fw`} />
                  </ListItemIcon>
                  <ListItemText primary={section.title} className="ml-3" />
                </ListItemButton>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 right-0 pb-3 pr-3 mb-10">
            <p className="text-gray-400 dark:text-gray-400">{t.version}</p>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
