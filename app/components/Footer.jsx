"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Snackbar,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { FaShoppingBag } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Footer = () => {
  const router = useRouter();
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [showiOSInstructions, setShowiOSInstructions] = useState(false);
  const [userId, setUserId] = useState(null);

  const lang = Cookies.get('lang') || 'en'; // Recupera la lingua dai cookie, predefinita a 'en'

  const translations = {
    it: {
      experiences: "Esperienze",
      shop: "Shop",
      installNow: "Installa ora",
      iosInstallInstructions: "Per installare: tocca icona di condivisione poi 'Aggiungi a schermata Home'"
    },
    en: {
      experiences: "Experiences",
      shop: "Shop",
      installNow: "Install now",
      iosInstallInstructions: "To install: tap share icon then 'Add to Home Screen'"
    },
    fr: {
      experiences: "Expériences",
      shop: "Boutique",
      installNow: "Installer maintenant",
      iosInstallInstructions: "Pour installer : touchez l'icône de partage puis 'Ajouter à l'écran d'accueil'"
    },
    de: {
      experiences: "Erfahrungen",
      shop: "Geschäft",
      installNow: "Jetzt installieren",
      iosInstallInstructions: "Zum Installieren: Tippen Sie auf das Symbol zum Teilen und dann auf 'Zum Home-Bildschirm hinzufügen'"
    },
    es: {
      experiences: "Experiencias",
      shop: "Tienda",
      installNow: "Instalar ahora",
      iosInstallInstructions: "Para instalar: toca el icono de compartir y luego 'Agregar a la pantalla de inicio'"
    }
  };

  const t = translations[lang];

  useEffect(() => {
    // Controlla se l'app è in modalità standalone (cioè se è stata installata)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://");
    setIsPWAInstalled(isStandalone);

    setUserId(Cookies.get('user_id'));

    // Controllo per dispositivi iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

    // Ascolta l'evento beforeinstallprompt
    window.addEventListener("beforeinstallprompt", (e) => {
      // Impedisci al browser di mostrare il prompt di installazione
      e.preventDefault();
      // Salva l'evento per poterlo attivare più tardi solo se l'app non è già installata
      if (!isStandalone) {
        setInstallPrompt(e);
      }
    });
  }, []);

  const handleInstallClick = () => {
    if (isIOS) {
      // Mostra il banner con le istruzioni per iOS
      setShowiOSInstructions(true);
    } else {
      // Se c'è un evento di installazione salvato e non siamo su iOS, mostralo
      if (installPrompt) {
        installPrompt.prompt();
        installPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("L'utente ha accettato l'installazione della PWA");
            setIsPWAInstalled(true); // Aggiorna lo stato una volta che l'app è installata
          } else {
            console.log("L'utente ha rifiutato l'installazione della PWA");
          }
          // Dopo aver gestito l'evento, imposta installPrompt a null
          setInstallPrompt(null);
        });
      }
    }
  };

  const iOSInstructions = (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showiOSInstructions}
      autoHideDuration={6000}
      onClose={() => setShowiOSInstructions(false)}
      message={t.iosInstallInstructions}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setShowiOSInstructions(false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      sx={{
        "& .MuiSnackbar-content": {
          backgroundColor: "#333",
          color: "#fff",
        },
      }}
    />
  );

  return (
    <footer className="sticky bottom-0 z-10">
      <BottomNavigation
        showLabels
        className="mt-20 flex justify-between sticky bottom-0"
      >
        <Link href={`/`}>
          <Fab
            size="secondary"
            aria-label="home"
            style={{
              backgroundColor: "#485d8b",
              marginLeft: "10px",
              marginBottom: "10px",
            }}
          >
            <HomeOutlinedIcon style={{ color: "white" }} />
          </Fab>
        </Link>
        <BottomNavigationAction
          label={t.experiences}
          icon={<EventOutlinedIcon style={{ color: "#485d8b" }} />}
          className="cursor-pointer"
          onClick={() => router.push("/esperienze")}
        />
        <BottomNavigationAction
          label={t.shop}
          icon={<FaShoppingBag style={{ color: "#485d8b" }} />}
          className="cursor-pointer"
          onClick={() => router.push("/shop")}
        />
        {!isPWAInstalled && (
          <BottomNavigationAction
            label={t.installNow}
            icon={<AppsOutlinedIcon style={{ color: "#485d8b" }} />}
            className="cursor-pointer"
            onClick={handleInstallClick}
          />
        )}
      </BottomNavigation>
      {iOSInstructions}
      {isPWAInstalled && (
        <div
          style={{
            height: 'calc(env(safe-area-inset-bottom) + 15px)',
            backgroundColor: '#FFF',
          }}
        />
      )}
    </footer>
  );
};

export default Footer;
