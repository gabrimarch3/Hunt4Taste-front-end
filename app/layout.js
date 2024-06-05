import { Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContex";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"





const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Hunt4Taste",
  description: "Hunt4Taste è la tua cantina a portata di TAP!",
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={roboto.className}>
          {children}
          <SpeedInsights />
          <Analytics debug={false}/>
          <script data-host="https://phpanalytics.lunatio.com" data-dnt="false" src="https://phpanalytics.lunatio.com/js/script.js" id="ZwSg9rf6GA" async defer></script>
        </body>
      </html>
    </CartProvider>
  );
}
