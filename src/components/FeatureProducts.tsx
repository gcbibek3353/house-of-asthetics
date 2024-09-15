"use client";
import { GetAllProducts } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cartItemState, cartState } from "@/recoil/atom";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function FeaturedProducts() {
  const [isCartOpen, setIsCartOpen] = useRecoilState(cartState);
  const [cartItems, setCartItems] = useRecoilState<any>(cartItemState);
  const [featuredProducts, setfeaturedProducts] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const products = await GetAllProducts();
      setfeaturedProducts(products);
    };
    fetch();
  }, []);

  // Handle add to cart button
  const handleAddToCart = (product: any) => {
    const existingProduct = cartItems.find(
      (item: any) => item.id === product.id
    );
    if (existingProduct) {
      // If the product is already in the cart, just increase its quantity
      setCartItems(
        cartItems.map((item: any) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Otherwise, add the product to the cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.slice(0, 4).map((product: any) => (
            <Card
              key={product.id}
              className="flex flex-col justify-between transition-transform duration-300 hover:scale-105"
            >
              <CardContent className="p-4">
                <div className="relative h-48 mb-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="rounded-md object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
