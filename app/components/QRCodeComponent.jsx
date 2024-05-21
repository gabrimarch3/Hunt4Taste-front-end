import React from "react";
import Cookies from "js-cookie";
import { QRCodeSVG } from "qrcode.react";

const QRCodeComponent = () => {
  const userId = Cookies.get("user_id");
  const lang = Cookies.get('lang') || 'en'; // Recupera la lingua dai cookie, predefinita a 'en'

  const translations = {
    it: {
      downloadApp: "Scarica la Nostra App",
      scanQRCode: "Scansiona il codice QR per scaricare l'app direttamente sul tuo dispositivo!",
      userIdRequired: "User ID è necessario per generare il QR Code."
    },
    en: {
      downloadApp: "Download Our App",
      scanQRCode: "Scan the QR code to download the app directly to your device!",
      userIdRequired: "User ID is required to generate the QR Code."
    },
    fr: {
      downloadApp: "Téléchargez Notre Application",
      scanQRCode: "Scannez le code QR pour télécharger l'application directement sur votre appareil!",
      userIdRequired: "L'ID utilisateur est nécessaire pour générer le code QR."
    },
    de: {
      downloadApp: "Laden Sie Unsere App Herunter",
      scanQRCode: "Scannen Sie den QR-Code, um die App direkt auf Ihr Gerät herunterzuladen!",
      userIdRequired: "Benutzer-ID ist erforderlich, um den QR-Code zu generieren."
    },
    es: {
      downloadApp: "Descarga Nuestra Aplicación",
      scanQRCode: "¡Escanee el código QR para descargar la aplicación directamente a su dispositivo!",
      userIdRequired: "Se requiere ID de usuario para generar el código QR."
    }
  };

  const t = translations[lang];

  if (!userId) {
    console.log("User ID not found in cookies.");
    return <div>{t.userIdRequired}</div>;
  }

  console.log(userId);  // Log the found user ID.

  // Codifica il user_id in base64
  const base64UserId = btoa(
    encodeURIComponent(userId).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode("0x" + p1)
    )
  );

  console.log(base64UserId);  // Log the encoded base64 user ID.
  const baseUrl = "https://app.hunt4taste.it/";
  const fullUrl = `${baseUrl}?user_id=${base64UserId}`;

  return (
    <div className="qr-code-section bg-gray-100 rounded-lg p-6 text-center mt-10">
      <h3 className="font-bold text-gray-700 text-lg mb-4">
        {t.downloadApp}
      </h3>
      <QRCodeSVG value={fullUrl} size={256} className="mx-auto" />
      <p className="text-gray-600 mt-3">
        {t.scanQRCode}
      </p>
    </div>
  );
};

export default QRCodeComponent;
