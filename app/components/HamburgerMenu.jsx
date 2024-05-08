import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home'; // Importa le icone che ti servono
import ServicesIcon from '@mui/icons-material/BuildCircle'; // Icona esemplificativa per i Servizi
import ExperienceIcon from '@mui/icons-material/Explore'; // Icona esemplificativa per le Esperienze
import ShopIcon from '@mui/icons-material/Store'; // Icona esemplificativa per lo Shop
import ContactIcon from '@mui/icons-material/Email'; // Icona esemplificativa per i Contatti
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io'; // Icona per chiudere il menu
import WineBarIcon from '@mui/icons-material/WineBar';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaShoppingBag } from 'react-icons/fa';
import Cookies from 'js-cookie';


const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [logo, setLogo] = useState(''); // Stato per il logo
  const [userId, setUserId] = useState(null);

 


  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      let userId = parseInt(queryParams.get('user_id'), 10);

      if (!userId) {
        userId = parseInt(Cookies.get('user_id'), 10);
      }

      if (!userId) {
        console.error('User ID not found in URL or cookies');
        return;
      }

      try {
        const response = await fetch(`https://hunt4taste.it/api/header-images`);
        const data = await response.json();
        const userData = data.find(item => item.user_id === userId);
        if (userData) {
          setLogo(userData.logo); // Set logo URL from the fetched data
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
    const fetchSections = async () => {

    setUserId(Cookies.get('user_id'));
      try {
        // Fetch all sections from the API
        const response = await axios.get('https://hunt4taste.it/api/sections');

        // Get the user_id from the URL query parameters
        const queryParams = new URLSearchParams(window.location.search);
        const userId = parseInt(queryParams.get('user_id'));

        // Filter the sections based on the user_id extracted from the URL
        const filteredSections = response.data.filter(section => section.user_id === userId);
        setSections(filteredSections);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []); // Dependency array remains empty as the URL and user ID should not change during the lifecycle of this component
  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };


  const menuItems = [
    { text: 'Home', href: `/`, icon: <HomeIcon /> },
    { text: 'Esperienze', href: '/esperienze', icon: <ExperienceIcon /> },
    { text: 'Shop', href: '/shop', icon: <FaShoppingBag /> },
  ];

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} className="text-white">
        <GiHamburgerMenu size={24} />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform"
        aria-label="Sidebar"
        BackdropProps={{ invisible: true }}  // This makes the backdrop invisible
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          className="px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 h-full relative"
        >
          <ul className="space-y-2 mt-10">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href} passHref>
                  <ListItemButton
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                  >
                    <ListItemIcon className="text-gray-900 dark:text-white">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} className="ml-3" />
                  </ListItemButton>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 mt-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <Link href={`/sections/${section.slug}`} passHref>
                  <ListItemButton
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                  >
                    <i className={section.icon + " fas fa-fw"} dangerouslySetInnerHTML={{ __html: '' }} />
                    <ListItemText primary={section.title} className="ml-3" />
                  </ListItemButton>
                </Link>
              </li>
            ))}
          </ul>
          {/* Footer Section */}
          <div className="absolute bottom-0 right-0 pb-3 pr-3 mb-10">
            <p className="text-gray-400 dark:text-gray-400">v. 1.0.0</p>
          </div>
        </Box>
      </Drawer>
    </>
  );
  
  
};

export default HamburgerMenu;
