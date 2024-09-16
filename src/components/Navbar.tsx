"use client";
import Link from "next/link";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import image from "@/images/logo.jpg";
import { useRecoilState } from "recoil";
import { cartItemState, cartState } from "@/recoil/atom";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useRecoilState(cartState);
  const [cartItems, setCartItems] = useRecoilState<any>(cartItemState);

  const totalItems = cartItems.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );

  return (
    <nav className="bg-white shadow-md" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={image}
                alt="logo"
                width={40}
                height={40}
                className="relative rounded-lg shadow-2xl animate-float"
              />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <form className="mr-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-64 pl-10"
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </form>
              <Button
                onClick={() => {
                  setIsCartOpen(true);
                }}
                variant="outline"
                size="icon"
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User account</span>
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <Button variant="ghost" size="icon" className="mr-4">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Shopping cart</span>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
              <span className="sr-only">User account</span>
            </Button>
          </div>
          <div className="mt-3 px-2">
            <form>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-10"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
