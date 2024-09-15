import { GetAllProducts, GetProductById } from "@/actions/product";
import ProductOverview from "@/components/ProductOverview";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: any) {
  const product = await GetProductById(params.id);

  const products = await GetAllProducts();

  console.log(product);
  if (!product) {
    // console.log("error");
    notFound();
  }

  return (
    <>
      <ProductOverview product={product} products={products} />
    </>
  );
}
