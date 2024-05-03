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
      <IconButton onClick={toggleDrawer(true)}>
        <GiHamburgerMenu size={24} fill='white'/>
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} className='h-full'>
      <Box
  role="presentation"
  onClick={toggleDrawer(false)}
  onKeyDown={toggleDrawer(false)}
  className="w-80 flex flex-col h-full" 
>
<div className="flex items-center justify-between p-4 bg-[#485d8b] text-white" style={{ position: 'relative', height: '64px' }}>
  <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    <img src={logo} alt="Hunt for Taste Logo" style={{ maxHeight: '100px', maxWidth: '100px' }} className='rounded-xl' />
  </div>
  <IconButton onClick={toggleDrawer(false)} className="text-white">
    <IoMdClose size={24} />
  </IconButton>
</div>
  <List className='mt-[50px] text-bold'>
  {menuItems.map((item, index) => (
    <ListItem key={index} disablePadding className='w-full'>
      <Link href={item.href} passHref className='w-full'>
        <ListItemButton
          style={{
            borderRadius: '8px',
            padding: '10px',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          className='w-full'
        >
          <ListItemIcon style={{ color: '#485d8b', minWidth: '35px' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} style={{ fontWeight: 'bold' }} />
        </ListItemButton>
      </Link>
    </ListItem>
  ))}
  </List>
  <hr />
  <List>
          {sections.map((section, index) => (
            <ListItem key={section.id} disablePadding>
              <Link href={`/sections/${section.slug}`} passHref>
                <ListItemButton>
                  {/* Use `dangerouslySetInnerHTML` to render the icon */}
                  <i className={section.icon} dangerouslySetInnerHTML={{ __html: '' }} />
                  <ListItemText primary={section.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
  {/* Footer Section */}
  <div className="mt-auto w-full h-10 self-end bg-[#485d8b] text-white p-4">
   
  </div>
</Box>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
