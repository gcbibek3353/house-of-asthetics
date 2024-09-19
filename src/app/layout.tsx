import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RecoilRoot } from "recoil";
import { Provider } from "./provider";
import "react-toastify/dist/ReactToastify.css";
import Cart from "@/components/Cart";

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
          <Cart />
          {children}

          <Footer />
        </body>
      </Provider>
    </html>
  );
}
