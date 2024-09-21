import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GetAllProducts } from "@/actions/product";

export const metadata: Metadata = {
  title: "House of asthetics",
  description: "Store for your asthetics",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products: any = await GetAllProducts();
  return (
    <>
      <Navbar products={products} />
      {children}
    </>
  );
}
