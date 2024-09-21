import Image from "next/image";
import HeroPage from "@/components/HeroPage";
import Navbar from "@/components/Navbar";
import FeaturedProducts from "@/components/FeatureProducts";
import { GetAllProducts } from "@/actions/product";
export default async function Home() {
  const products: any = await GetAllProducts();

  return (
    <div suppressHydrationWarning>
      <Navbar products={products} />

      <HeroPage />

      <FeaturedProducts />
    </div>
  );
}
