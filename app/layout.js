import { Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContex";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Savoia Hotel Rimini",
  description: "Il tuo Hotel preferito, a portata di TAP!",
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </CartProvider>
  );
}
