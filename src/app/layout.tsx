import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RecoilRoot } from "recoil";
import { Provider } from "./provider";
import "react-toastify/dist/ReactToastify.css";
import Cart from "@/components/Cart";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "House of asthetics",
  description: "Store for your asthetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Provider>
        <body className=" overflow-x-hidden" suppressHydrationWarning>
        <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
   />
          <Analytics/>
          <NextTopLoader />
          <Cart />
          {children}

          <Footer />
        </body>
      </Provider>
    </html>
  );
}
