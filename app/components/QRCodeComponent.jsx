import React from "react";
import Cookies from "js-cookie";
import { QRCodeSVG } from "qrcode.react";

const QRCodeComponent = () => {
  const userId = Cookies.get("user_id");
  
  if (!userId) {
    console.log("User ID not found in cookies.");
    return <div>User ID is required to generate the QR Code.</div>;
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
        Scarica la Nostra App
      </h3>
      <QRCodeSVG value={fullUrl} size={256} className="mx-auto" />
      <p className="text-gray-600 mt-3">
        Scansiona il codice QR per scaricare l'app direttamente sul tuo dispositivo!
      </p>
    </div>
  );
};

export default QRCodeComponent;
