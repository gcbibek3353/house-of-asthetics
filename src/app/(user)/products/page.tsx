import { GetAllProducts } from "@/actions/product";
import ProductsList from "@/components/ProductsList";

export default async function ProductsPage() {
  const products = await GetAllProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductsList products={products} />
    </div>
  );
}
