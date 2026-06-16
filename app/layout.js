import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/component/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function RootLayout({ children }) {
  return (
      <html lang="en" className={inter.className}>
        <head>
          <title>WrkrBnC - Hire Professionals</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          {children}
          <Toaster/>
        </body>
      </html>
  );
}
