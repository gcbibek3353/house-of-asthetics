"use client";
import Image from "next/image";
import HeroPage from "@/components/HeroPage";
import Navbar from "@/components/Navbar";
import FeaturedProducts from "@/components/FeatureProducts";
export default function Home() {
  return (
    <div suppressHydrationWarning>
      <Navbar />

      <HeroPage />

      <FeaturedProducts />
    </div>
  );
}
